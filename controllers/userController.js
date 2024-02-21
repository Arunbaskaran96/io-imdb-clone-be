import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import usermodel from "../models/userModal.js";
import { errorHandler } from "../utils/errorHandler.js";
const JWT_SCT = "iofactory";

export const addUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const findUser = await usermodel.findOne({ email });
    if (findUser) {
      next(errorHandler(400, "src ytdt"));
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new usermodel({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await usermodel.findOne({ email });
    if (user) {
      const verifyPassword = await bcrypt.compare(password, user.password);
      if (verifyPassword) {
        const token = jwt.sign({ _id: user._id }, JWT_SCT, {
          expiresIn: "30d",
        });
        const { password, ...rest } = user._doc;
        res.status(200).json({ ...rest, token });
      } else {
        next(errorHandler(400, "Incorrect email/password"));
      }
    } else {
      next(errorHandler(400, "User not found"));
    }
  } catch (error) {
    next(error);
  }
};
