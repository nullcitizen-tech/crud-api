import mongoose from "mongoose";
import User from "../models/userModel.js";

// Create new user
const createUser = async (req, res) => {
  const { firstName, lastName, email } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered." });
    }

    const user = await User.create({ firstName, lastName, email });

    return res.status(201).json({
      message: "User successfully created",
      user,
    });
  } catch (error) {
    console.error("Failed to create user:", error);
    res.status(500).json({
      message: "Failed to create user",
      error: error.message,
    });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({
      message: "Users retrieved successfully.",
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Failed to retrieve users:", error);
    res.status(500).json({
      message: "Failed to retrieve users.",
      error: error.message,
    });
  }
};

// Get user by id
const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid user ID format." });
  }
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res
      .status(200)
      .json({ message: "User retrieved successfully.", user });
  } catch (error) {
    console.error("Failed to get user:", error);
    res
      .status(500)
      .json({ message: "Failed to get user.", error: error.message });
  }
};

// Update user by id
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid user ID format." });
  }

  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid user ID format." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, email },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    return res
      .status(200)
      .json({ message: "User updated successfully.", updatedUser });
  } catch (error) {
    console.error("Failed to update user:", error);
    res
      .status(500)
      .json({ message: "Failed to update user.", error: error.message });
  }
};

// Delete user by id
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid user ID format." });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Failed to delete the user:", error);
    res
      .status(500)
      .json({ message: "Failed to delete the user.", error: error.message });
  }
};

export { createUser, getUsers, getUser, updateUser, deleteUser };
