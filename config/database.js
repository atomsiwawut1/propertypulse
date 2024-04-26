import  mongoose  from "mongoose";

let connected = false;

const connectDB = async ()=>{
    mongoose.set('strictQuery',true);
    // if the database connect is already connected, dont connect again

    if (connected){
        console.log('MogoDB is already connected');
        return;
    }

    // Connect to MongoDB
    try{
        await mongoose.connect(process.env.MOGODB_URI);
        connected=true;
        console.log('MogoDB is connected')
    } catch(error){
        console.log(error)
    }

}

export default connectDB