import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import chatRoutes from "./routes/chat.route.js";

const app = express();
const port = process.env.PORT ?? 5000;

app.use(cors());

app.use(express.json());

app.use("/api/chat", chatRoutes);

await connectDB();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
