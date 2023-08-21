const accessProducts = require('../DAL/products');

const getAllProducts = async () => {
    try {
        const all = await accessProducts.getAllProducts();
        return Promise.resolve(all);
    } catch (error) {
        return Promise.reject(error);
    }
};

const getProductById = async (id) => {
    try {
        const product = await accessProducts.getProductById(id);
        return Promise.resolve(product);
    } catch (error) {
        return Promise.reject(error);
    }
};

const updateProduct = async (id, properties) => {
    try {
        const product = await accessProducts.updateProduct(id, properties);
        return Promise.resolve(product);
    } catch (error) {
        return Promise.reject(error);
    }
};

const updateQuantity = async (id, n) => {
    try {
        const product = await accessProducts.updateQuantity(id, n);
        return Promise.resolve(product);
    } catch (error) {
        return Promise.reject(error);
    }
};

const appendProduct = async (product) => {
    try {
        const productAppended = await accessProducts.appendProduct(product);
        return Promise.resolve(productAppended);
    } catch (error) {
        return Promise.reject(error);
    }
};

const deleteProduct = async (id) => {
    try {
        await accessProducts.deleteProduct(id);
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
};

const deleteAll = async () => {
    try {
        await accessProducts.deleteAll();
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    updateProduct,
    updateQuantity,
    appendProduct,
    deleteProduct,
    deleteAll
};
