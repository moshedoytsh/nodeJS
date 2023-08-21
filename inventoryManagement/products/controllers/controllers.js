const axios = require('axios');
const services = require('../services/inventoryManagementService');
const handleError = require('../../error-handling/handleError');

const getAllProducts = async (req, res) => {
    // try & catch
    try {
        const all = await services.getAllProducts();
        res.send(all);        
    } catch (error) {
        handleError(res, error);
    }
}

const getProductById = async (req, res) => {
    try {
        const id = +req.params.id;
        const product = await services.getProductById(id);
        res.send(product);
    } catch (error) {
        //  עשיתי "!==" בשבילך דוד
        if (error.message !== 'Id not exist') {
            return handleError(res, error);
        }
        res.status(404).send(`product with id "${req.params.id}" not found.`);
    }
}

const updateProduct = async (req, res) => {
    try {
        const id = +req.params.id;
        const properties = req.body;
        const product = await services.updateProduct(id, properties);
        res.send(product);
    } catch (error) {
        if (error.message === 'Id not exist') {
            return handleError(res, error, 404, `product with id "${req.params.id}" not found.`);
        }
        if (error.message === 'invalid entry') {
            return handleError(res, error, 404, `The request contain invalid entry.
            The only entries allowed are: 
            title, price, description, category, image, rating, quantity`);
        }
        handleError(res, error);
    }
}

const updateQuantity = async (req, res) => {
    try {
        const id = +req.params.id;
        const n = req.body.n;
        const product = await services.updateQuantity(id, n);
        res.send(product);
    } catch (error) {
        if (error.message === 'Id not exist') {
            return handleError(res, error, 404, `product with id "${req.params.id}" not found.`);
        }
        if (error.message === 'Quantity under zero') {
            return handleError(res, error, 422, 'Quantity cant be under zero')
        }
        handleError(res, error);
    }
}

const appendProduct = async (req, res) => {
    try {
        const properties = req.body;
        const product = await services.appendProduct(properties);
        res.send(product);
    } catch (error) {
        handleError(res, error);
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = +req.params.id;
        await services.deleteProduct(id);
        res.send('product deleted.');
    } catch (error) {
        handleError(error);
    }
}

const deleteAll = async (req, res) => {
    try {
        await services.deleteAll();
        res.send('all products deleted.');
    } catch (error) {
        handleError(res, error);
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    updateProduct,
    updateQuantity,
    appendProduct,
    deleteProduct,
    deleteAll
}