import express from "express";
import { getUserforsidebar } from "./../controllers/user.controller.js";
import protectRoute from "./../middleware/protectedroutes.js";

const router = express.Router();

// router.get("/users",protectRoute,getUserforsidebar); // The path from router.get(): /users Resulting full path: /users + /users = /users/users

router.get("/",protectRoute,getUserforsidebar); // path = /users/

export default router;