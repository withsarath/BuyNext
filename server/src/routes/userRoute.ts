import { requireAuth } from "@clerk/express";
import {Router} from "express";
import { syncUser } from "../controllers/user-controller";

const userRoute = Router();

userRoute.post("/sync", requireAuth(), syncUser)

export default userRoute