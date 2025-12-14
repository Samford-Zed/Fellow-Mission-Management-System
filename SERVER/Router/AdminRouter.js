import express from "express";
import UserModel from "../Models/User.js";
import GroupModel from "../Models/Groups.js";
import CollectedData from "../Models/CollectedData.js";
import authUser from "../middleware/MiddleWare.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

/* ======================================
   ✔ ADMIN PROFILE
   GET /api/admin/
====================================== */
router.get("/", authUser, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Admin verified",
    adminId: req.userId,
  });
});

/* ======================================
   ✔ GET ALL USERS
   GET /api/admin/users
====================================== */
router.get("/users", authUser, isAdmin, async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/* ======================================
   ✔ GET ALL GROUPS
   GET /api/admin/groups
====================================== */
router.get("/groups", authUser, isAdmin, async (req, res) => {
  try {
    const groups = await GroupModel.find().populate(
      "members",
      "name email phone role"
    );
    res.json({ success: true, groups });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/* ======================================
   ✔ CREATE GROUP
   POST /api/admin/groups
====================================== */
router.post("/groups", authUser, isAdmin, async (req, res) => {
  try {
    const group = await GroupModel.create({
      name: req.body.name,
      members: [],
    });

    res.json({ success: true, group });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/* ======================================
   ✔ ADD USERS TO GROUP
   POST /api/admin/groups/:groupId/add-users
====================================== */
router.post(
  "/groups/:groupId/add-users",
  authUser,
  isAdmin,
  async (req, res) => {
    try {
      const { userIds } = req.body;

      const group = await GroupModel.findById(req.params.groupId);
      if (!group)
        return res.json({ success: false, message: "Group not found" });

      if (!group.members) group.members = [];

      group.members.push(...userIds);
      await group.save();

      res.json({ success: true, group });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
);

/* ======================================
   ✔ GET COLLECTED DATA
   GET /api/admin/collected
====================================== */
router.get("/collected", authUser, isAdmin, async (req, res) => {
  try {
    const data = await CollectedData.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
