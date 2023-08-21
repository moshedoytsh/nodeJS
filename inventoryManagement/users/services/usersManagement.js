const crypto =  require('crypto');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const accessUsers = require('../DAL/users');

const saltRounds = 10;

const TOKEN_LENGTH = 30;

const randomToken = () => {
    return crypto.randomBytes(TOKEN_LENGTH).toString('hex');
}

const getUserByEmail = async (email) => {
    const all = await accessUsers.getAllUsers();
    return all.find(el => el.email === email);
}

const login = async (email, password) => {
    // find the user
    const user = await getUserByEmail(email);
    if (!user) throw new Error('Email not exist');
    // check the password
    const passwordCorrect = bcrypt.compareSync(password, user.hash);
    if (!passwordCorrect) throw new Error('Incurrent password');
    const key = randomToken();
    await accessUsers.addAuthentication(user.id, key);
    return [user, key];
}

const signup = async (user) => {
    // create new user
    const newUser = { email: user.email };
    // check if the email already exist
    const all = await accessUsers.getAllUsers();
    const exist = all.find(el => el.email === newUser.email);
    if (!!exist) throw new Error('Email exist');
    // add random ID
    newUser.id = uuidv4();
    // default is not admin
    newUser.isAdmin = false;
    // encrypt the password
    newUser.hash = bcrypt.hashSync(user.password, saltRounds);
    // add the new user to the DB
    const createdUser = await accessUsers.addUser(newUser);
    // log the user in
    const [_, key] = await login(createdUser.email, user.password);
    return [createdUser, key];
}

const verifyUser = async (id, auth) => {
    const authentications = await accessUsers.getAuthenticationById(id);
    if (authentications.includes(auth)) return true;
    else return false;
}

module.exports = {
    login,
    signup,
    verifyUser
}