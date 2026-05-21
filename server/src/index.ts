import express from "express";
import { ENV } from "./config/env";
import {clerkMiddleware} from "@clerk/express"
import cors from "cors"
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

app.get("/", (req, res) => {
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
app.listen(ENV.PORT, () => {
  console.log(`Server is running on: ${ENV.PORT}`);
});
