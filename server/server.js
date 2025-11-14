import express from "express"
import { connectDB } from "./database/mongodb.js";
import cookieparser from "cookie-parser"
import cors from "cors";



import authRoutes from "./routes/auth.js";
import todoRoutes from "./routes/todo.js";

const app = express();
const PORT = process.env.PORT || 8000;


connectDB();

// middlewares

app.use(express.json());
app.use(cookieparser());
app.use(cors({
  origin: ["http://localhost:5173",
         "https://full-stack-todo-app-ten-omega.vercel.app",   
], // your React URL
  credentials: true
}));

// routes

app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);

app.listen(PORT , () => console.log(`Server is running on ${PORT}`))