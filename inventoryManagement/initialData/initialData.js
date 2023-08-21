const axios = require('axios');
const accessProducts = require('../products/DAL/products');

const getRandomQuantity = () => {
    return Math.trunc(Math.random() * 1000);
}

const getInitialProducts = async () => {
    // get products list from the remote server
    const results = await axios.get('https://fakestoreapi.com/products');
    const products = results.data;
    // add random quantity
    for (let i = 0; i < products.length; i++) products[i].quantity = getRandomQuantity();
    return products;
}

const initialProducts = async () => {
    let products = await accessProducts.getAllProducts();
    // exit if there are already products
    if (products.length !== 0) return products;
    // if there are not products yet, then initial the DB
    products = await getInitialProducts();
    const initializedProducts = await accessProducts.initialProducts(products);
    return initializedProducts;
}

module.exports = initialProducts;