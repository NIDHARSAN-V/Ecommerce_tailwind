require('dotenv').config();  // Load environment variables from .env file
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const auth_router = require('./Routes/Auth/AuthRoute');
const Admin_Product_Router = require('./Routes/Admin/ProductsRoutes');
const Shop_Product_Router = require('./Routes/Shop/Product_routes');
const Cart_Router = require('./Routes/Shop/Cart_Router');
const Address_Router = require("./Routes/Shop/Address_Router")

// Connect to MongoDB using the URI stored in the .env file
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;  

app.use(
  cors({
    origin: "http://localhost:5173",  
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);



app.use(cookieParser());
app.use(express.json());




app.use('/api/auth' , auth_router);
app.use('/api/admin/products' , Admin_Product_Router);
app.use('/api/shop/products' , Shop_Product_Router);
app.use('/api/shop/cart' , Cart_Router)
app.use('/api/shop/address' ,Address_Router );


app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
