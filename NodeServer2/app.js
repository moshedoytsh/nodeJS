const fs = require('fs');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jsonfile = require('jsonfile');
const axios = require('axios');

const saltRounds = 10;
const PASSWORD_REQUIREMENTS = 'Password must contain at least 8 characters and include at least one uppercase and lowercase letters';

const readFile = (path) => {
    return new Promise((res, rej) => {
        jsonfile.readFile(path, (err, data) => {
            if (err) rej(err);
            res(data);
        });
    });
}

const writeFile = (path, data) => {
    return new Promise((res, rej) => {
        jsonfile.writeFile(path, data, {spaces: 4}, (err) => {
            if (err) rej(err);
            res(path);
        });
    });
}

const readUsers = async () => {
    try {
        const dataJson = await readFile('./data/users.json', 'utf8');
        const users = dataJson.users;
        return users;
    } catch (error) {
        // if there was an error try to create the directory and file,
        // finally return an empty array
        console.error(error);
        console.log('Trying to create data/users.json');
        try {
            const emptyJSON = JSON.stringify({users: []}, null, 4);
            if (!fs.existsSync('./data')) fs.mkdirSync('./data');
            await writeFile('./data/users.json', emptyJSON);
            console.log('data/users.json successfully created.');
        } catch (error) {
            console.error(error);
        } finally {
            return [];
        }
    }
}

const writeUsers = async (users) => {
    const usersObj = {users};
    try {
        await writeFile('./data/users.json', usersObj);
    } catch (error) {
        console.error(error);
    }
}

const getUser = async (id) => {
    const users = await readUsers();
    const user = users.find((element) => element.id === id);
    return user;
}

const updateUser = async ({id, email, password}) => {
    let user = await getUser(id);
    if (!user) throw new Error('Not existing user.');
    // update the user
    if (email) user.email = email;
    if (password) {
        const hash = bcrypt.hashSync(password, saltRounds);
        user.hash = hash;
    }
    // get the rest of the users
    let users = await readUsers();
    users = users.filter((element) => element.id !== id);
    // add the updated user
    users.push(user);
    // save the updated array
    await writeUsers(users);
    return user;
}

const addUser = async ({email, password}) => {
    const id = uuidv4();
    const hash = bcrypt.hashSync(password, saltRounds);
    const newUser = {id, email, hash};
    const users = await readUsers();
    users.push(newUser);
    await writeUsers(users);
    return newUser;
}

const deleteUser = async (id) => {
    const user = await getUser(id);
    // save only the rest of the users
    let users = await readUsers();
    users = users.filter((element) => element.id !== id);
    await writeUsers(users);
    return user;
}

const login = async (email, password) => {
    const users = await readUsers();
    const user = users.find(element => element.email === email);
    if (!user) throw new Error('Email does not exist email.');
    const passwordMatched = bcrypt.compareSync(password, user.hash);
    if (!passwordMatched) throw new Error('Incorrect password.');
    return user;
}

const emailExist = async (email) => {
    const users = await readUsers();
    return !!users.find(element => element.email === email);
}

const validateEmail = (email) => {
    return email
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const validatePassword = (password) => {
    return (
        typeof password === 'string' &&
        password.length >= 8 &&
        password.match(/[a-z]/) &&
        password.match(/[A-Z]/)
    );
}

const getRandomProduct = async () => {
    const n = Math.trunc(Math.random() * 100 + 1);
    const randomProduct = await axios.get(`https://dummyjson.com/products/${n}`);
    return randomProduct.data;
}

// set the server
const app = express();

const invalidEmail = (email, res) => {
    res.status(400).send(`Invalid email format "${email}"`);
}

const invalidPassword = (res) => {
    res.status(400).send(PASSWORD_REQUIREMENTS);
}

// pars the request
app.use(express.json());
// get all users
app.get('/', async (req, res) => {
    const users = await readUsers();
    res.send(users);
});
// get user by ID
app.get('/:id', async (req, res) => {
    const id = req.params.id;
    const user = await getUser(id);
    if (user) {
        res.send(user);
    } else {
        res.status(404).send(`No user found with id "${id}"`);
    }
});
// update user
app.put('/:id', async (req, res) => {
    const id = req.params.id;
    const {email, password} = req.body;
    // response with error if an email was given and is invalid
    if (typeof email !== 'undefined' && !validateEmail(email)) {
        invalidEmail(email, res);
        return;
    }
    // response with error if the email is already exist in another user
    const users = await readUsers();
    if (email && users.find(element => element.id !== id && element.email === email)) {
        res.status(400).send('Email already exist');
        return;
    }
    // response with error if a password was given and isn't secure
    if (typeof password !== 'undefined' && !validatePassword(password)) {
        invalidPassword(res);
        return;
    }
    try {
        const user = await updateUser({id, email, password});
        res.send(user);
    } catch (error) {
        res.status(404).send(`No user found with id "${id}"`);
    }
});

app.post('/', async (req, res) => {
    const {email, password} = req.body;
    // response with error if the email is invalid
    if (typeof email === 'undefined') {
        invalidEmail('', res);
        return;
    }
    if (typeof password === 'undefined') {
        invalidEmail('', res);
        return;
    }
    if (!validateEmail(email)) {
        invalidEmail(email, res);
        return;
    }
    // response with error if the email already exist
    if (await emailExist(email)) {
        res.status(400).send('Email already exist');
        return;
    }
    // response with error if the password isn't secure
    if (!validatePassword(password)) {
        invalidPassword(res);
        return;
    }
    const newUser = await addUser({email, password});
    res.send(newUser);
});

app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    // response with error if the email is invalid
    if (!validateEmail(email)) {
        invalidEmail(email. res);
        return;
    }
    try {
        await login(email, password);
        res.send('Login Success.');
    } catch (error) {
        res.status(401).send('Incorrect email or password');
    }
});

app.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await deleteUser(id);
        res.send(user);
    } catch (error) {
        console.error(error);
        res.status(404).send(`No user found with id "${id}"`);
    }
});

app.post('/:id/do-some-stupid-operation', async (req, res) => {
    const id = req.params.id;
    const user = await getUser(id);
    if (user) {
        let randomProduct;
        try {
            randomProduct = await getRandomProduct();          
        } catch (error) {
            res.status(500).send("couldn't get product from products server");
            return;
        }
        user.product = randomProduct;
        const post = {email: user.email, password: user.password, product: user.product};
        try {
            const response = await axios.post("https://jsonplaceholder.typicode.com/users", post);
            if (!response.id === 11) throw new Error('error :(');
        } catch (error) {
            res.status(500).send("cannot post the user with the product in the users server");
            return;
        }
        res.send(post);
    } else {
        res.status(404).send(`No user found with id "${id}"`);
    }
});
// listen to requests
app.listen(8080, () => console.log('listening...'));