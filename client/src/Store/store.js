import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice/index.js";

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;
