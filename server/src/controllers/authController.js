import User from "../models/User.js";
import { setAuthCookie, signToken } from "../utils/token.js";

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  notificationSettings: user.notificationSettings,
  createdAt: user.createdAt,
});

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Name, email, and password are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409);
      throw new Error("An account with this email already exists");
    }

    const user = await User.create({ name, email, password });
    const token = signToken(user._id);
    setAuthCookie(res, token);

    res.status(201).json({ user: sanitizeUser(user) });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Email and password are required");
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.matchPassword(password))) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    const token = signToken(user._id);
    setAuthCookie(res, token);

    res.json({ user: sanitizeUser(user) });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res.json({ message: "Logged out successfully" });
};

export const getProfile = (req, res) => {
  res.json({ user: sanitizeUser(req.user) });
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, email, currentPassword, newPassword, notificationSettings } = req.body;
    const user = await User.findById(req.user._id).select("+password");

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(409);
        throw new Error("Email is already in use");
      }
      user.email = email;
    }

    if (name) user.name = name;

    if (notificationSettings) {
      user.notificationSettings = {
        ...user.notificationSettings.toObject(),
        ...notificationSettings,
      };
    }

    if (newPassword) {
      if (!currentPassword) {
        res.status(400);
        throw new Error("Current password is required");
      }
      if (!(await user.matchPassword(currentPassword))) {
        res.status(401);
        throw new Error("Current password is incorrect");
      }
      user.password = newPassword;
    }

    await user.save();
    res.json({ user: sanitizeUser(user), message: "Profile updated" });
  } catch (error) {
    next(error);
  }
};
