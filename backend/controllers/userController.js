import { catchAsyncError } from "../middleware/catchAsyncError.js"
import ErrorHandler from "../middleware/error.js";
import { User } from "../models/userModel.js";

export const register=catchAsyncError(async(req,res,next)=>{
    console.log("Register Route calling");

    const{name,email,phone,password,verificationMethod}=req.body
    if(!name ||!email ||!phone||!password||!verificationMethod)
    {
        return next(new ErrorHandler("All fields are required", 400))
    }

    // checking phone format

    function validatePhoneNumber(phone) {
    const phoneRegex = /^\+923\d{9}$/;
    return phoneRegex.test(phone);
    }
    if(!validatePhoneNumber(phone))
    {
        return next(new ErrorHandler("Provide phone number in correct format",400))
    }
    const existingUser=await User.findOne({
        $or:[
            {
                email,
                accountVerified:true
            },
            {
                phone,
                accountVerified:true
            }
        ]
    })
    if(existingUser)
    {
        return next(new ErrorHandler("User already Exist",400))
    }
    const multipleAttemptsByUser=await User.find({
        $or:[
        { phone, accountVerified: false },
        { email, accountVerified: false },          
        ]
    })
    // let user;
    if(multipleAttemptsByUser.length>3)
    {
       return next(new ErrorHandler("Contact through via email",400))

    }
    const userData={
        name,
        email,
        password,
        verificationMethod
    }
    const user=await User.create(userData)
    const code=user.generateVerificationCode()

    return res.json({
        success:true,
        message:"user created successfully",
        user,code
    })
    
})