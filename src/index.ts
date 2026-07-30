import connectDB from "./config/mongoDB.ts";
import app from "./app.ts";
import "dotenv/config";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Couldn't connect to the database! " + error);
  }
}

startServer();
