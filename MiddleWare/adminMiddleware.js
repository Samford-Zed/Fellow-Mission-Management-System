import UserModel from "../Models/User.js";

export const isAdmin = async (req, res, next) => {
  try {
    // FIXED
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "User ID missing in token" });
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found in database" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Admins only" });
    }

    // Optional attach
    req.user = user;

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
