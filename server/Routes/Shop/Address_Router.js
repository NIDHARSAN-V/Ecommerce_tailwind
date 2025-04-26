const express = require('express');
const { addAddress, editAddress, deleteAddress, fetchAllAddress } = require('../../Controllers/Auth/Shop/AddressController');





const Address_Router = express.Router();


Address_Router.post("/add" , addAddress);
Address_Router.get('/get/:userId' , fetchAllAddress);
Address_Router.delete('/delete/:userId/:addressId' , deleteAddress);
Address_Router.put('/update/:userId/:addressId' , editAddress);



module.exports = Address_Router