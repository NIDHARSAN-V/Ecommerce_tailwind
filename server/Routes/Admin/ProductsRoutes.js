const express = require('express')
const { handleImageUpload } = require('../../Controllers/Auth/Admin/ProductsController')
const { upload } = require('../../Helpers/cloudinay')


const Admin_Product_Router = express.Router();


Admin_Product_Router.post("/upload_image" , upload.single('my_file') , handleImageUpload)




module.exports = Admin_Product_Router