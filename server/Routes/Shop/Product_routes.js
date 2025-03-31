const express = require('express');
const { getFilterProducts, getProductDetails } = require('../../Controllers/Auth/Shop/ProductsController');



const Shop_Product_Router = express.Router();


Shop_Product_Router.get("/get", getFilterProducts)
Shop_Product_Router.get("/get/:id", getProductDetails)

module.exports = Shop_Product_Router