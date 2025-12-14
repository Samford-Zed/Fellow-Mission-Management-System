console.log("🔥 UserDataRouter Loaded!");
import express from "express";
import CollectedData from "../Models/CollectedData.js";
import UserModel from "../Models/User.js";
import authUser from "../middleware/MiddleWare.js";

const router = express.Router();

// GET USER SUBMISSIONS
router.get("/submissions/:id", authUser, async (req, res) => {
  try {
    const submissions = await CollectedData.find({
      collectedBy: req.params.id,
    }).sort({ createdAt: -1 });

    return res.json({ success: true, submissions });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
});

// GET USER GROUP
router.get("/group/:id", authUser, async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).populate("groupId");

    if (!user) return res.json({ success: false, message: "User not found" });

    return res.json({ success: true, group: user.groupId || null });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
});

export default router;
