import express from "express";

//controllers
import {
  register,
  login,
  logout,
  currentUser,
  forgotPassword,
  resetPassword,
  verifyemail,
  page1,
  resendOtp,
} from "../controllers/auth";
import { requireSignin } from "../middleware/auth";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/current-user", requireSignin, currentUser);
router.get("/page1", requireSignin, page1);
router.patch("/forgotpassword", forgotPassword);
router.patch("/resetpassword", resetPassword);
router.post("/verifyemail", verifyemail);
router.post("/resendotp", resendOtp);

module.exports = router;
