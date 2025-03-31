const express = require('express')
const { handleImageUpload, addProduct, editProduct, deleteProduct, fetchAllProduct } = require('../../Controllers/Auth/Admin/ProductsController')
const { upload } = require('../../Helpers/cloudinay')


const Admin_Product_Router = express.Router();


Admin_Product_Router.post("/upload_image" , upload.single('my_file') , handleImageUpload)

Admin_Product_Router.post("/add" , addProduct);

Admin_Product_Router.put("/edit/:id" , editProduct);

Admin_Product_Router.delete("/delete/:id" , deleteProduct);

Admin_Product_Router.get("/get" , fetchAllProduct);

module.exports = Admin_Product_Router