const jsonfile = require('jsonfile');

const USERS_PATH = '././data/users.json';
const AUTHENTICATION_PATH = '././data/authentication.json';

const readAllUsers = async () => {
    try {
        const all = await jsonfile.readFile(USERS_PATH);
        return Promise.resolve(all);
    } catch (error) {
        return Promise.reject(error);
    }
}

const writeAllUsers = async (all) => {
    try {
        await jsonfile.writeFile(USERS_PATH, all, { spaces: 4 });
        return Promise.resolve(all);
    } catch (error) {
        return Promise.reject(error);
    }
}

const readAllAuthentication = async () => {
    try {
        const all = await jsonfile.readFile(AUTHENTICATION_PATH);
        return Promise.resolve(all);
    } catch (error) {
        return Promise.reject(error);
    }
}

const writeAllAuthentication = async (all) => {
    try {
        await jsonfile.writeFile(AUTHENTICATION_PATH, all, { spaces: 4 });
        return Promise.resolve(all);
    } catch (error) {
        return Promise.reject(error);
    }
}

const getAllUsers = async () => {
    try {
        const all = await readAllUsers();
        return Promise.resolve(all);
    } catch (error) {
        return Promise.reject(error);
    }
}

const getUser = async (id) => {
    try {
        const all = await getAllUsers();
        const user = all.filter(user => user.id === id);
        if (!user.length) throw new Error(`no user found with id "${id}"`);
        return Promise.resolve(user);
    } catch (error) {
        return Promise.reject(error);
    }
}

const addUser = async (user) => {
    try {
        const all = await getAllUsers();
        const exist = all.filter(el => el.id === user.id);
        if (!!exist.length) throw new Error(`id "${user.id}" is already exist`);
        all.push(user);
        await writeAllUsers(all);
        return Promise.resolve(user);
    } catch (error) {
        return Promise.reject(error);
    }
}

const deleteUser = async (id) => {
    try {
        let all = await getAllUsers();
        all = all.filter(el => el.id !== id);
        await writeAllUsers(all);
        return Promise.resolve(id);
    } catch (error) {
        return Promise.reject(error);
    }
}

const addAuthentication = async (id, auth) => {
    try {
        const all = await readAllAuthentication();
        if (Object.keys(all).includes(id)) all[id].push(auth);
        else all[id] = [auth];
        await writeAllAuthentication(all);
        return Promise.resolve({ id: auth });
    } catch (error) {
        return Promise.reject(error);
    }
}

const getAuthenticationById = async (id) => {
    try {
        const all = await readAllAuthentication();
        if (Object.keys(all).includes(id)) return Promise.resolve(all[id]);
        else return Promise.resolve([]);
    } catch (error) {
        return Promise.reject(error);
    }
}

const deleteAuthentication = async (id, auth) => {
    try {
        let all = await readAllAuthentication();
        all[id] = all[id].filter(el => el !== auth);
        await writeAllAuthentication(all);
        return Promise.resolve(all);
    } catch (error) {
        return Promise.reject(error);
    }
}

module.exports = {
    getAllUsers,
    getUser,
    addUser,
    deleteUser,
    addAuthentication,
    getAuthenticationById,
    deleteAuthentication
}
