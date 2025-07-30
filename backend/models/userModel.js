import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt"

const userSchema=new mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:true,

    },
    password:{
        type:String,
        required:true,
        minLength:[6,"6 or more characers"],
        maxLength:[34,"6 or more characers"],
        select:false
    },
    accountVerified:{
        type:Boolean,
        default:false
    },
    verificationCode:Number,
    verificationCodeExpire:Date,
    resetVerificatonCode:Number,
    resetVerificatonCodExpire:Date,
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

export const User=mongoose.model("User",userSchemas)