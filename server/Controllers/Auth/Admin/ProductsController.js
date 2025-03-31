const { ImageUpload } = require("../../../Helpers/cloudinay");
const Products = require("../../../Models/Products");






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










///add a product
const addProduct = async function(req,res)
{
     try {

        const {image , title , description , category ,brand , price , salePrice , totalStock } = req.body;

        const newlyCreatedproduct  = new Products({

            image , title , description , category ,brand , price , salePrice , totalStock 
        })

        await newlyCreatedproduct.save();

        res.status(201).json({
            success : true,
            data : newlyCreatedproduct
        })
        
     } catch (error) {
        res.status(500).json({
            success:false,
            message : "Error from add admin product"
        })
     }
}








//fetch all product 
const fetchAllProduct = async function(req,res)
{
     try {

        const listOfProducts = await Products.find({});

        res.status(201).json({
            success : true,
            data : listOfProducts

        })
        
     } catch (error) {
        res.status(500).json({
            success:false,
            message : "Error from fetchh admin product"
        })
     }
}









//edit a  product 
const editProduct = async function(req,res)
{

    console.log("Admin Product edit function called")
     try {

          const {id} = req.params;
          const {image , title , description , category ,brand , price , salePrice , totalStock } = req.body;

          const findProduct = await Products.findById(id);

          if(!findProduct)
          {
            return res.status(404).json({
                success:false,
                message:"Product Not found"
            })
          }

          
findProduct.image = image || findProduct.image;
findProduct.title = title || findProduct.title;
findProduct.description = description || findProduct.description;
findProduct.category = category || findProduct.category;
findProduct.brand = brand || findProduct.brand;
findProduct.price = price || findProduct.price;
findProduct.salePrice = salePrice || findProduct.salePrice;
findProduct.totalStock = totalStock || findProduct.totalStock;

await findProduct.save();

res.status(200).json({
    success:true,
    data : findProduct
})

     } catch (error) {
        res.status(500).json({
            success:false,
            message : "Error from edit admin product"
        })
     }
}









//delete a product

const deleteProduct = async function(req,res)
{

    console.log("Admim Product deleted Called")
     try {
        const {id} = req.params;

        const product = await Products.findByIdAndDelete(id);



        if(!product)
        {
            return res.status(404).json({
                success:false,
                message:"No Product found in delete product admin "
            })
        }





        res.status(200).json({

            success : true , 
            message : "Product deleted Successfully  in admin Product delete" 
        })





     } catch (error) {


        res.status(500).json({
            success:false,
            message : "Error from delete admin product"
        })


     }
}


module.exports = {handleImageUpload , addProduct , fetchAllProduct , editProduct , deleteProduct};
