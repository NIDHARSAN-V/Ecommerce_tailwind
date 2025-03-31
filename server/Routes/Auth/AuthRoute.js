const express = require("express");
const { registerUser, loginUser, logoutUser, authMiddleware } = require("../../Controllers/Auth/Auth_Controller");


const auth_router = express.Router();

auth_router.post("/register", registerUser);
auth_router.post("/login",loginUser );
auth_router.get("/logout"  , logoutUser);
auth_router.get('/check-auth' , authMiddleware , function(req,res)
{
    const user = req.user;
    res.status(200).json({
        success:true,
        message:"User is Authenticated",
        user
    })

})
module.exports = auth_router;