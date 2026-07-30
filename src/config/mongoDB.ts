import mongoose from 'mongoose'

async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URI as string);

    console.log("Successfully connected to the database!");
  } catch (error) {
    console.error("Connection failure! Error message: " + error);
  }
}

export default connectDB