import mongoose  from "mongoose";

export const connectDB=async()=>{
    mongoose.connect(process.env.MONGO_URI,{dbName:"MERN_STACK_AUTH"})
    .then(()=>{
        console.log("DB Connected successfully")
    })
    .catch(err=>{console.log(err);
    })
}