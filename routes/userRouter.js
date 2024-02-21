import express from "express";
const router = express.Router();
import { addUser, signin } from "../controllers/userController.js";

router.post("/adduser", addUser);
router.post("/signin", signin);
export default router;
