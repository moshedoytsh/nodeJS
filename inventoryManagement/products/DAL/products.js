const jsonfile = require('jsonfile');

const PRODUCTS_PATH = '././data/products.json';

const VALID_PROPERTIES = [
    'title', 'price', 'description', 'category',
    'image', 'rating', 'quantity'
    ];

const replaceEmptyArrayItems = (key, value) => {
    if (typeof value === 'undefined') return undefined;
    return value;
}

const validateProperties = (properties) => {
    Object.keys(properties).forEach((value, index) => {
        if (!VALID_PROPERTIES.includes(value)) {
            throw new Error('invalid entry');
        };
    });
}

const readAll = async () => {
    // get json of all products
    try {
        const all = await jsonfile.readFile(PRODUCTS_PATH);
        return Promise.resolve(all);
    } catch (error) {
        return Promise.reject(error);
    }
}

const writeAll = async (all) => {
    // rewrite the json of all product
    try {
        await jsonfile.writeFile(PRODUCTS_PATH, all, { spaces: 4, replacer: replaceEmptyArrayItems });
        return Promise.resolve(all);   
    } catch (error) {
        return Promise.reject(error)
    }
}

const initialProducts = async (products) => {
    // API for initializing the data
    try {
        const initializedProducts = await writeAll(products);
        return Promise.resolve(initializedProducts);
    } catch (error) {
        return Promise.reject(error);
    }
}

const getAllProducts = async () => {
    try {
        const all = await readAll();
        return Promise.resolve(all);
    } catch (error) {
        return Promise.reject(error);
    }
}

const getProductById = async (id) => {
    try {
        const all = await getAllProducts();
        const product = all.find(product => product.id === id);
        if (typeof product === 'undefined') throw new Error('Id not exist');
        return Promise.resolve(product);
    } catch (error) {
        return Promise.reject(error);
    }
}

const updateProduct = async (id, properties) => {
    try {
        // validate the entries is the update
        validateProperties(properties);
        const all = await getAllProducts();
        const product = all.find(el => el.id === id);
        if (typeof product === 'undefined') {
            throw new Error('Id not exist');
        }
        // merge the product with the new properties
        Object.assign(product, properties);
        // rewrite the products json
        await writeAll(all);
        // return the updated product
        return Promise.resolve(product);
    } catch (error) {
        return Promise.reject(error)
    }
}

const updateQuantity = async (id, n) => {
    try {
        const product = await getProductById(id);
        // check if a product found
        if (typeof product === 'undefined') {
            throw new Error('Id not exist');
        }
        const quantity = product.quantity + n;
        // make sure the quantity is not under zero
        if (quantity < 0) {
            throw new Error('Quantity under zero');
        }
        const updatedProduct = await updateProduct(id, { quantity });
        return Promise.resolve(updatedProduct);
    } catch (error) {
        return Promise.reject(error);
    }
}

const appendProduct = async (product) => {
    try {
        // validate the entries is the update
        validateProperties(product);
        // get all product, add the new one and rewrite them
        const all = await getAllProducts();
        all.push(product);
        await writeAll(all);
        return Promise.resolve(product);
    } catch (error) {
        return Promise.reject(error);
    }
}

const deleteProduct = async (id) => {
    try {
        let all = await getAllProducts(id);
        all = all.filter(el => el.id !== id)
        await writeAll(all);
        return Promise.resolve(id);
    } catch (error) {
        return Promise.reject(error);
    }
}

const deleteAll = async () => {
    try {
        await writeAll([]);
        return Promise.resolve();   
    } catch (error) {
        return Promise.reject(error);
    }
}

module.exports = {
    initialProducts,
    getAllProducts,
    getProductById,
    updateQuantity,
    updateProduct,
    appendProduct,
    deleteProduct,
    deleteAll
}
