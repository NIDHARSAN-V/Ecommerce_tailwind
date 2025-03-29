const User = require("../../Models/User");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
//register
const registerUser  = async function(req , res)
{
    console.log(req.body)
    const {userName , email , password} = req.body;

    try{
        const checkUser = await User.findOne({email});

        if(checkUser)
        {
            return res.json({
                success:false,
                message : "User Already exists with the same email ! Please Try Again",
            });
        }

        const hashPassword = await bcrypt.hash(password , 12);

        const newUser = new User({
            userName,
            email,
            password : hashPassword
        })

        await newUser.save();


        res.status(200).json({
            success:true,
            message:"Registration Successful"
        })


    }
    catch(error)
    {
       console.log(error)

       res.status(500).json({
        success:false,
        message:"Some error occured in register"
       })
    }
}

//login

const loginUser = async function(req,res)
{
    const{email , password} = req.body
    try {

        //check user already exist 

        const   checkUser = await User.findOne({email})


        if(!checkUser)
        {
            return res.json({
                success:false,
                message:"User DoestNot Exist ! Please regsiter first"
            })
        }

        const checkPassword = await bcrypt.compare(password  , checkUser.password)

        if(!checkPassword)
        {
            return res.json({
                success:false,
                message:"UserName or Password is incorrect"
            })
        }


        const token = jwt.sign({
            id : checkUser._id,
            role:checkUser.role,
            email:checkUser.email
        } , 'CLIENT_SEC_KEY' , {expiresIn : '1d'})


        res.cookie('token' , token , {httpOnly  :true , secure:false}).json({
            success:true,
            mesage:"Logged in success",
            user:{
                id:checkUser._id,
                email:checkUser.email,
                role:checkUser.role
            }
        })
  
    } catch (error) {
    console.log(error)
    res.status(500).json({
        success:false,
        message:"Some error Occured in login"
    })
    }
}

//logout

const logoutUser  = async function(req,res)
{
    res.clearCookie('token').json({
        success:true,
        message:"Logged out successfully"
    })
}


//auth middle ware
const authMiddleware  = async function(req , res , next)
{
    const token  = req.cookies.token;

    if(!token)
    {
        return res.status(401).json({
            success:false,
            message:'Unauthorized user'
        })
    }
    try {
        const decode = jwt.verify(token , 'CLIENT_SEC_KEY');
        req.user = decode;
        next();
    } catch (error) {
        res.status(401).json({
            success:false,
            message:"Unauth User"
        })
    }
}


module.exports = {registerUser , loginUser , logoutUser , authMiddleware }