import mongoose from 'mongoose';

const connectToMongoDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error in connectng to MongoBB ", error.message);
    }
}

export default connectToMongoDB;