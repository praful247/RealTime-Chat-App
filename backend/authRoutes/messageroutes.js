import express from "express";
import protectRoute from "./../middleware/protectedroutes.js";
import { sendmessage,getmessages } from "../controllers/message.controller.js";
const router = express.Router();
router.get("/getmessages/:id" ,protectRoute,getmessages)
router.post("/send/:id" ,protectRoute,sendmessage)
export default router;
