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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.generateVerificationCode=function () {
    const generateRandomNumber=()=>{
    const firstDigit=Math.floor(Math.random()*9)+1;
    const remainingDigit=Math.floor(Math.random()*1000).toString().padStart(4,0)
    return parseInt(firstDigit+remainingDigit)
    }
    const verificationCode=generateRandomNumber();
    this.verificationCode=verificationCode;
    this.verificationCodeExpire=Date.now()+15*60*1000
    return verificationCode

}

export const User=mongoose.model("User",userSchema)