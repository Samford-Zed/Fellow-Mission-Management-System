import mongoose from "mongoose";

 const ConnectMB=async ()=>{
    try {
       await mongoose.connect(process.env.MONGODB_URI);
       
       console.log("The DataBase Connected Successfully")
    } catch (error) {
        console.log(error.message);
    }
}

export default ConnectMB;