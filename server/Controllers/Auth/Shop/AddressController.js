const Address = require("../../../Models/Address");







const addAddress = async function(req,res)
{
     try {

        const {userId , address , city , pincode , phone , notes} = req.body;


        if(!userId || !address || !city || !pincode || !notes)
        {
            res.status(400).json({
                 success:false,
                 message : "Invalid Data"
            })
        }

         const newAddress = new Address({userId , address  , city , pincode , phone , notes});

         await newAddress.save();


         res.status(200).json({
            success:true,
            message : "Address Added Successfully"
       })

        
     } catch (error) {
          console.log(e)
          res.status(500).json({
            success :false,
            message:"Error in Address"
          })
     }
}







const fetchAllAddress = async function(req,res)
{
     try {

        const {userId} = req.params;

        if(!userId)
        {
            res.status(400).json({
                success:false,
                message : "UserId required"
           })
        }


        const address = await Address.find({userId})


        res.status(200).json({
            success:true,
            message : "Fetched  Successfully",
            data : address
       })




        
     } catch (error) {
          console.log(e)
          res.status(500).json({
            success :false,
            message:"Error in Address"
          })
     }
}




const editAddress = async function(req,res)
{
     try {
          console.log("In edit Address")


        const {userId , addressId} = req.params;
        const formData = req.body;
        console.log(formData)

      

        if(!userId || !addressId)
        {
            res.status(400).json({
                success:false,
                message : "UserId and AddressId is required"
           })

        }


        const address = await Address.findOneAndUpdate({_id:addressId , userId} , formData , {new:true});

        if(!address)
        {
            res.status(404).json({
                success:false,
                message : "Address Not found"
           })

        }


        console.log(address)


        res.status(200).json({
            success:true,
            message : "Edited  Successfully",
            data : address
       })




        
     } catch (error) {
          console.log(e)
          res.status(500).json({
            success :false,
            message:"Error in Address"
          })
     }
}





const deleteAddress = async function(req,res)
{
     try {

        const {userId , addressId} = req.params;
        if(!userId || !addressId)
            {
                res.status(400).json({
                    success:false,
                    message : "UserId and AddressId is required"
               })
    
            }


           const address  =await Address.findOneAndDelete({_id : addressId , userId})



           if(!address)
            {
                res.status(404).json({
                    success:false,
                    message : "Address Not found"
               })
    
            }



            res.status(200).json({
                success:true,
                message : "Deleted  Successfully",
                
           })
    




        
     } catch (error) {
          console.log(e)
          res.status(500).json({
            success :false,
            data : newAddress,
            message:"Error in Address"
          })
     }
}




module.exports = {addAddress , editAddress  ,fetchAllAddress ,deleteAddress}
