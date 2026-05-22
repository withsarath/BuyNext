import express from "express";
import { ENV } from "./config/env";
import cors from "cors"
import {clerkMiddleware} from "@clerk/express"
import path from "path"
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import commentRoute from "./routes/commentRoute";

const app = express();

app.use(cors({
    origin: ENV.FRONTEND_URL,
    credentials: true
}))
app.use(clerkMiddleware())
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get("/api/health", (req, res) => {
    res.json({
        message: "Welcome to BuyNext API",
        endpoints:{
            users: "/api/users",
            products: "api/products",
            comments: "api/comments"
        }
    })
});
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/comments", commentRoute)

if (ENV.NODE_ENV === "production") {
  const __dirname = path.resolve();

  // serve static files from frontend/dist
  app.use(express.static(path.join(__dirname, "../client/dist")));

  // handle SPA routing - send all non-API routes to index.html - react app
  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}
app.listen(ENV.PORT, () => {
  console.log(`Server is running on: ${ENV.PORT}`);
});
