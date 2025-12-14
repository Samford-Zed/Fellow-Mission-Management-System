import jwt from "jsonwebtoken";

async function authUser(req, res, next) {
  const { token } = req.cookies;

  if (!token)
    return res.status(401).json({
      success: false,
      message: "User Not Authorized: Login First",
    });

  try {
    const decode = jwt.verify(token, process.env.JWT_KEY);

    // FIX — always set req.userId (not req.UserId)
    req.userId = decode._id;

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
}

export default authUser;
