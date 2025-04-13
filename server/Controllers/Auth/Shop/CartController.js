const Cart = require("../../../Models/Cart")
const Product = require("../../../Models/Products")

const AddtoCart = async function (req, res) {
  try {

    //adding cart add controller 
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: " Invalid Data Provided!"
      })
    }

    const product = await Product.findById(productId);


    if (!product) {
      return res.status(404).json({
        success: false,
        message: " Product Not found!"
      })
    }


    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] })

    }

    //pass the item 


    const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId)

    if (findCurrentProductIndex === -1) {
      cart.items.push({ productId, quantity })
    }
    else {
      cart.items[findCurrentProductIndex].quantity += quantity
    }

    await cart.save();


    return res.status(200).json({
      success: true,
      data: cart,

    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Eroor in Add to Cart"
    })
  }

}



const FetchCartItems = async function (req, res) {
  try {

    const { userId } = req.params;
    console.log(userId)

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User Id is required"
      })
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: 'items.productId',
      select: 'image title price salePrice'
    })
    

    if (!cart) {
      return res.status(400).json({
        success: false,
        message: "Cart is not present "
      })
    }


    /////important  validate the cart
    const validateItems = cart.items.filter(productItem => productItem.productId)

    if (validateItems.length < cart.items.length) {
      cart.items = validateItems
      await cart.save();
    }



    const populateCartItems = validateItems.map(item => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salesPrice: item.productId.salePrice,
      quantity: item.quantity
    }))

    return res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems
      }

    })




  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Eroor in Add to Cart"
    })
  }

}





const UpdateCartItemsQuantity = async function (req, res) {
  try {

    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: " Invalid Data Provided!"
      })
    }

    const cart = Cart.findOne({ userId })

    if (!cart) {
      return res.status(400).json({
        success: false,
        message: "Cart is not present "
      })
    }

    const findCurrentProduct = cart.items.findIndex(item => item.productId.toString() === productId)

    if (findCurrentProduct === -1) {

      return res.status(404).json({
        success: false,
        message: "Cart item is not present"
      })

    }


    cart.items[findCurrentProduct].quantity = quantity

    await cart.save();

    await cart.populate({
      path: 'items.productId',
      select: "image title price salePrice"
    })




    const populateCartItems = cart.items.map(item => ({
      productId: item.productId ? item.productId._id : null,
      image: item.image ? item.productId.image : null,
      title: item.title ? item.productId.title : null,
      price: item.price ? item.productId.price : null,
      salePrice: item.salePrice ? item.productId.salePrice : null,
      quantity: item.quantity
    }));


    return res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems
      }

    })


  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Eroor in Update to Cart"
    })
  }

}






const DeleteCartItem = async function (req, res) {
  try {


    const { userId, productId } = req.params

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: " Invalid Data Provided!"
      })
    }


    const cart = Cart.findOne({ userId }).populate({
      path: 'items.productId',
      select: "image title price salePrice"
    })
    if (!cart) {
      return res.status(400).json({
        success: false,
        message: "Cart is not present "
      })
    }


    cart.items = cart.items.filter(item => item.productId._id.toString() === productId)


    await cart.save();


    await Cart.populate({
      path: 'items.productId',
      select: "image title price salePrice"
    })


    const populateCartItems = cart.items.map(item => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : null,
      price: item.productId ? item.productId.price : null,
      salesPrice: item.productId ? item.productId.salePrice : null,
      quantity: item.quantity
    }));


    return res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems
      }

    })



  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Eroor in Add to Cart"
    })
  }

}


module.exports = { AddtoCart, FetchCartItems, UpdateCartItemsQuantity, DeleteCartItem }