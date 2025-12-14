import express from "express";
import UserModel from "../Models/User.js";
import Collected_Data from "../Models/CollectedData.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import GroupModel from "../Models/Groups.js";

/* ---------------------------------------------------
     SIGNUP
--------------------------------------------------- */
export const SignUp = async (req, res) => {
  // Accept both "name" and "fullName"
  const name = req.body.name || req.body.fullName;
  const { email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    return res.status(401).json({ success: false, message: "Missing Details" });
  }

  try {
    const isUserExist = await UserModel.findOne({ email });

    if (isUserExist) {
      return res.status(401).json({
        success: false,
        message: "User Already Exist!",
      });
    }

    if (password.length < 8) {
      return res.status(401).json({
        success: false,
        message: "Password length must be more 8",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const new_user = await UserModel.create({
      name,
      email,
      password: hashPassword,
      phone,
    });

    const token = jwt.sign({ _id: new_user._id }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "User is created",
      token,
      user: {
        id: new_user._id,
        name: new_user.name,
        email: new_user.email,
        phone: new_user.phone,
        role: new_user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* ---------------------------------------------------
     LOGIN
--------------------------------------------------- */
export const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ success: false, message: "Missing Details" });
  }

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Email or PassWord is Wrong" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "PassWord is Wrong" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Logged in Successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* ---------------------------------------------------
     FILL FORM
--------------------------------------------------- */
export const Fill_Form = async (req, res) => {
  try {
    const userId = req.UserId;
    const { name, phone, address, status } = req.body;

    if (!name || !phone || !address || !status) {
      return res
        .status(401)
        .json({ success: false, message: "Missing Details" });
    }

    // Get user data
    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User does not exist" });
    }

    // groupId OPTIONAL
    const groupId = user.groupId || null;

    await Collected_Data.create({
      groupId,
      collectedBy: userId,
      name,
      phone,
      address,
      status,
    });

    return res.json({ success: true, message: "Successfully registered" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

/* ---------------------------------------------------
     ADMIN
--------------------------------------------------- */
export const Admin = async (req, res) => {
  res.json({ success: true, message: "Hi Admin" });
};

/* ---------------------------------------------------
     USERS LIST
--------------------------------------------------- */
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ---------------------------------------------------
     CREATE GROUP
--------------------------------------------------- */
export const createGroup = async (req, res) => {
  try {
    const { name, maxMembers } = req.body;
    const group = await GroupModel.create({
      name,
      members: [],
      maxMembers,
    });

    res.json({ success: true, group });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ---------------------------------------------------
     ADD USERS TO GROUP
--------------------------------------------------- */
export const addUsersToGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userIds } = req.body;

    const group = await GroupModel.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    for (const userId of userIds) {
      if (!group.members.includes(userId)) {
        group.members.push(userId);
        await UserModel.findByIdAndUpdate(userId, { groupId });
      }
    }

    await group.save();
    res.json({ success: true, group });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
