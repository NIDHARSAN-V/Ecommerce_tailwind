
const AddtoCart = async function(req,res)
{
       try {
        
       } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Eroor in Add to Cart"
        })
       }

}




const FetchCartItems = async function(req,res)
{
       try {
        
       } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Eroor in Add to Cart"
        })
       }

}





const UpdateCartItemsQuantity = async function(req,res)
{
       try {
        
       } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Eroor in Add to Cart"
        })
       }

}






const DeleteCartItem = async function(req,res)
{
       try {
        
       } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Eroor in Add to Cart"
        })
       }

}


module.exports = {AddtoCart,FetchCartItems , UpdateCartItemsQuantity , DeleteCartItem}