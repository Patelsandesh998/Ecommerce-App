import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js"; // Assuming orders are stored in this model
import JWT from "jsonwebtoken";

// Register Controller
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    if (!name || !email || !password || !phone || !address) {
      return res.status(400).send({ error: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already registered, please login",
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ success: false, message: "Error in Registration", error });
  }
};

// Login Controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid email or password" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "Email is not registered" });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res
        .status(400)
        .send({ success: false, message: "Incorrect password" });
    }

    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Error in Login", error });
  }
};

// Forgot Password Controller
export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .send({ success: false, message: "Email is required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .send({ success: true, message: "Password reset link sent to email" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ success: false, message: "Error in Forgot Password", error });
  }
};

// Update Profile Controller
export const updateProfileController = async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    const userId = req.user._id;

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { name, phone, address },
      { new: true }
    );

    res
      .status(200)
      .send({ success: true, message: "Profile updated", updatedUser });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ success: false, message: "Error updating profile", error });
  }
};

// Get Orders Controller
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel.find({ user: req.user._id });
    res.status(200).send({ success: true, orders });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ success: false, message: "Error retrieving orders", error });
  }
};

// Get All Orders Controller (Admin)
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel.find().populate("user", "name email");
    res.status(200).send({ success: true, orders });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ success: false, message: "Error retrieving all orders", error });
  }
};

// Order Status Controller (Admin)
export const orderStatusController = async (req, res) => {
  try {
    const { status } = req.body;
    const { orderId } = req.params;

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    res
      .status(200)
      .send({ success: true, message: "Order status updated", updatedOrder });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ success: false, message: "Error updating order status", error });
  }
};

// Test Controller
export const testController = (req, res) => {
  res.send("Protected route");
};
