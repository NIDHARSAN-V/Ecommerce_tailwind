const cloudinary = require('cloudinary')

const multer  = require('multer')




cloudinary.config({
    cloud_name: 'dwqjl4gti', 
    api_key: '695167631852297', 
    api_secret: 'ZVqKIzbfRrgyDccVdRj0xQuaujI'
})

const stroage = new multer.memoryStorage();


async function ImageUpload(file)
{
    const result = await cloudinary.uploader.upload(file , {
        resource_type : 'auto'
    })
    

    console.log("Helper:" , result)

    return result
}

const upload = multer({stroage})
module.exports = {upload , ImageUpload};