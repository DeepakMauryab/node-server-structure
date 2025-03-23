import dotenv from "dotenv";
import app from "./app";
import connectDB from "./db/connection";

dotenv.config();

const port = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`⚙️ [server]: Server is running at http://127.0.0.1:${port}`);
  });
});
