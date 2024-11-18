import mongoose from 'mongoose';

const uri = "mongodb+srv://ronakpatel0447:hl7qkWNPKvqGntrX@classroom-assignment-ap.igams.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      tlsInsecure: true, 
    });
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Failed to connect to MongoDB Atlas:", error);
    process.exit(1);
  }
};

export default connectDB;

