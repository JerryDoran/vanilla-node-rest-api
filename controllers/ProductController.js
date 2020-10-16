const Product = require('../models/ProductModel');
const { getPostData } = require('../utils');

// @desc  Gets all products
// @route GET api/products
const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(products));
    res.end();
  } catch (e) {
    console.log(e.message);
  }
};

// @desc  Gets single product
// @route GET api/products/:id
const getProduct = async (req, res, id) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify({ message: 'Product Not Found!' }));
      res.end();
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(product));
      res.end();
    }
  } catch (e) {
    console.log(e.message);
  }
};

// @desc  create a products
// @route POST api/products
const createProduct = async (req, res) => {
  try {
    const body = await getPostData(req);

    const { title, description, price } = JSON.parse(body);
    const product = {
      title: title,
      description: description,
      price: price,
    };

    const newProduct = await Product.create(product);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(newProduct));
  } catch (e) {
    console.log(e.message);
  }
};

// @desc  update a products
// @route PUT api/products/:id
const updateProduct = async (req, res, id) => {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify({ message: 'Product Not Found!' }));
      res.end();
    } else {
      const body = await getPostData(req);

      const { title, description, price } = JSON.parse(body);
      const productData = {
        title: title || product.title,
        description: description || product.description,
        price: price || product.price,
      };

      const updatedProduct = await Product.update(id, productData);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(updatedProduct));
    }
  } catch (e) {
    console.log(e.message);
  }
};

// @desc  Deletes single product
// @route DELETE api/products/:id
const deleteProduct = async (req, res, id) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify({ message: 'Product Not Found!' }));
      res.end();
    } else {
      await Product.remove(id)
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify({message: `Product ${id} has been successfully deleted!`}));
      res.end();
    }
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
