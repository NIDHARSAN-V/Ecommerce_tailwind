const Products = require("../../../Models/Products");

const getFilterProducts = async function (req, res) {
    console.log("Filtered products called");

    try {
        const { category = "", brand = "", sortBy = "price-lowtohigh" } = req.query;
        console.log(req.query);

        let filters = {};

        if (category) {
            filters.category = { $in: category.split(",") };
        }

        if (brand) {  // ✅ Fixed condition
            filters.brand = { $in: brand.split(",") };  // ✅ Fixed incorrect assignment
        }

        let sort = {};
        switch (sortBy) {
            case "price-lowtohigh":
                sort.price = 1;
                break;
            case "price-hightolow":
                sort.price = -1;
                break;
            case "title-atoz":
                sort.title = 1;
                break;
            case "title-ztoa":  
                sort.title = -1;
                break;
            default:
                sort.price = 1;
        }

        const products = await Products.find(filters).sort(sort);
        console.log(products);

        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Some error in shop products backend"
        });
    }
};






const getProductDetails = async function(req,res)
{
    try {
        
        const {id} = req.params

        const product = await Products.findById(id);

        if(!product)
        {
            return res.status(404).json({
                success:false,
                message:"Product not found"
            })
        }
        res.status(200).json({
            success:true,
            data : product
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Some error in shop products backend"
        });
    }
}

module.exports = { getFilterProducts  , getProductDetails};
