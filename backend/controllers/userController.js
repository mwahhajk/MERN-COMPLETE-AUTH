import { catchAsyncError } from "../middleware/catchAsyncError.js"

export const register=catchAsyncError(async(req,res,next)=>{
    console.log("Register Route calling");
    
})