///global reducer ewhere we use the all the slicxess

const { configureStore } = require("@reduxjs/toolkit");
import authReducer from "./AuthSlice/index.js"

const store = configureStore({
    reducer:{
        auth  : authReducer
    }
})

export default store;