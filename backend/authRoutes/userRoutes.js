import express from "express";
import { getUserforsidebar } from "./../controllers/user.controller.js";
import protectRoute from "./../middleware/protectedroutes.js";

const router = express.Router();

router.get("/users",protectRoute,getUserforsidebar);

export default router;