import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import UserModel from "../models/userModel.js";

// Register new user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const userExists = await UserModel.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create User

  const user = await UserModel.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    console.log(user + "jekj");
    res.status(201).json({
      name: user.name,
      email: user.email,
      _id: user._id,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid user details");
  }
};
// Generate JWT
dotenv.config();
const generateToken = (id) => {
  return jwt.sign({ id }, "MERN", {
    expiresIn: "30d",
  });
};

// Login a User

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });

    if (user) {
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        res.status(400).json("Invalid credential");
      } else {
        req.session.user = user;
        res.status(200).json({
          user,
          status: true,
        });
      }
    } else {
      console.log("user does not exist");
      res.status(404).json("User doesnot exist");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
