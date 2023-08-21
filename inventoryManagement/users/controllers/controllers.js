const services = require('../services/usersManagement');

const login = async (req, res) => {
    const { email, password } = req.body;
    let user, key;
    try {
        [user, key] = await services.login(email, password);        
    } catch (error) {
        if (error.message === 'Incurrent password') return res.status(401).send('Incurrent email or password');
        if (error.message === 'Email not exist') return res.status(401).send('Incurrent email or password');
        else throw error;
    }
    res.send({ key, isAdmin: user.isAdmin });
}

const signup = async (req, res) => {
    const { email, password } = req.body;
    let user, key;
    try {
        [user, key] = await services.signup({ email, password });
    } catch (error) {
        if (error.message === 'Email exist') return res.status(409).send('Email already exist');
        else throw error;
    }
    res.send({ key, isAdmin: user.isAdmin });
}

module.exports = {
    login,
    signup
}