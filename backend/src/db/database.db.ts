import mongoose from "mongoose"

export const connectDB=async()=>{
    try{
        const dbinstance=await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log("connected to the database successfully")
    }catch(err){
        console.log("error connectin to the database");
        process.exit(1)
    }

}
