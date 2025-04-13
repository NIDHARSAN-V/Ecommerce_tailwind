const express = require('express');
const { AddtoCart, FetchCartItems, UpdateCartItemsQuantity } = require('../../Controllers/Auth/Shop/CartController');




const Cart_Router = express.Router();

Cart_Router.post("/add" ,AddtoCart );
Cart_Router.get("/get/:userId" , FetchCartItems);
Cart_Router.put("/update-cart" , UpdateCartItemsQuantity);
Cart_Router.delete('/:userId/:productId');


module.exports = Cart_Router