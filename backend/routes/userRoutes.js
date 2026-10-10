import express from "express";
import {
	getAllUsers,
	userSignin,
	userSignup,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers);
// router.post("/", addUser);
router.post("/signup", userSignup);
router.post("/signin", userSignin);

export default router;
