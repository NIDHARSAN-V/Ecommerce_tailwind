const { ImageUpload } = require("../../../Helpers/cloudinay");


const handleImageUpload = async function(req,res)
{
    
    console.log(req.file)
    console.log("Cloudinary backend reach")
    try
    {

    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const url  = "data:" + req.file.mimetype + ";base64,"+b64;

    const result = await ImageUpload(url);

    res.json({
        success:true,
        result
    })
   

    }
    catch(error)
    {
        res.json({
            success:false,
            message:error
        })
    }
}

module.exports = {handleImageUpload}