import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice/index.js";

import adminProductSlice from "./Admin/ProductSlice/index.js"

import shopProductSlice from "./Shop/ProductsSlice/index.js"

import shopCartSlice from "./Shop/CartSlice/index.js"

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminproducts : adminProductSlice,
        shopproducts : shopProductSlice,
        shopcart : shopCartSlice
        
    },
});

export default store;
