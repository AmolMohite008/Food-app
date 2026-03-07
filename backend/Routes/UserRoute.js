import express from "express";
import { protect, Login, signUp ,Logout , getMe} from "../Controllers/UserController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", Login);
router.post("/logout", Logout);

router.get("/me",protect , getMe)


export default router;
