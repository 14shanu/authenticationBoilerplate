import { hashPassword, comparePassword } from "../utils/auth";
import jwt from "jsonwebtoken";
import pool from "../database/db";
const mailer = require("../misc/mailer");
const addYears = require("date-fns/addYears");
const differenceInMinutes = require("date-fns/differenceInMinutes");

import {
  addUser,
  checkEmailExists,
  getusersByEmail,
  updatePassword,
  updateUserAsActive,
  updateNewPassword,
  updateUserWhileResendOtp,
} from "../queries/queries";

import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors/";
import { generateOtp } from "../utils/generateOtp";

export const register = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    throw new BadRequestError("Please provide all the details..!");
  }

  const valid_from = new Date();
  const valid_to = addYears(valid_from, 1);

  //check if email exists
  const result = await pool.query(checkEmailExists, [email]);
  if (result.rows.length) {
    // return res.json({ message: "Email is Taken already" });
    throw new BadRequestError("Email Already Exists..!");
  }

  var otp = await generateOtp();
  console.log(otp);

  const otp_updated_at = new Date();

  const hashedPassword = await hashPassword(password);
  const user = await pool.query(addUser, [
    first_name,
    last_name,
    email,
    hashedPassword,
    otp,
    otp_updated_at,
    valid_from,
    valid_to,
  ]);

  const html = `Hi there,
      <br/>
      Thank you for registering!
      <br/><br/>
      Otp Will be valid for 10 mins
      <br/>
      Please verify your email :
      <br/>
      Otp: <b>${otp}</b>
      <br/>
      On the following page:
      <a href="http://localhost:3002/user/emailverification?email=${email}">Verify your email</a>
      <br/><br/>
      Have a pleasant day.`;

  // Send email

  await mailer.sendEmail(
    "subhaschandra.bodakiyavar@veneratesolutions.com",
    email,
    "Verify Your Email!",
    html
  );
  // console.log(user);
  return res.json({
    message: "Registered Succesfully. Please Verify your email",
    success: true,
  });
};

export const resendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new BadRequestError("email  is missing..!");
  }

  // check if our db has user with that email
  const user = await pool.query(getusersByEmail, [email]);

  if (!user.rows.length) {
    throw new UnauthenticatedError("No user found with that email..!");
  }

  if (user.rows[0].active) {
    throw new BadRequestError("Email already verified..!");
  }

  const otp = await generateOtp();
  console.log(otp);

  const otp_updated_at = new Date();

  await pool.query(updateUserWhileResendOtp, [otp, otp_updated_at, email]);

  const html = `Hi there,
  <br/>
 
  <br/><br/>
  Otp Will be valid for 10 mins
  <br/>
  Please verify your email :
  <br/>
  Otp: <b>${otp}</b>
  <br/>
  On the following page:
  <a href="http://localhost:3002/user/emailverification?email=${email}">Verify your email</a>
  <br/><br/>
  Have a pleasant day.`;

  await mailer.sendEmail(
    "subhaschandra.bodakiyavar@veneratesolutions.com",
    email,
    "Verify Your Email!",
    html
  );

  return res.json({
    message: "Otp has been resent to Your Email",
    success: true,
  });
};

export const verifyemail = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    throw new BadRequestError("email or otp is missing..!");
  }

  // check if our db has user with that email
  const user = await pool.query(getusersByEmail, [email]);

  if (!user.rows.length) {
    throw new UnauthenticatedError("No user found with that email..!");
  }

  if (user.rows[0].active) {
    throw new BadRequestError("Email already verified..!");
  }

  // check the otp expiration time
  console.log(
    "difference: ",
    differenceInMinutes(new Date(), user.rows[0].otp_updated_at)
  );
  if (
    differenceInMinutes(new Date(), user.rows[0].otp_updated_at) >=
    process.env.OTP_EXPIRE_LIMIT
  ) {
    throw new UnauthenticatedError("Otp has been expired..!");
  }

  const { confirmation_otp } = user.rows[0];
  console.log(confirmation_otp);

  if (confirmation_otp != otp) {
    throw new BadRequestError("Invalid Otp Try Again ..!");
    // return res.json({ message: "Invalid OTP Try Again..!", verified: false });
  }

  const result = await pool.query(updateUserAsActive, [email]);
  return res.json({
    message: "Your email has been verifed You can now login",
    verified: true,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provie the email and password..!");
  }

  // check if our db has user with that email
  const user = await pool.query(getusersByEmail, [email]);

  if (!user.rows.length) {
    throw new NotFoundError("Email or Password is Incorrect..!");
  }

  // check password
  const {
    password: hashedPassword,
    id: user_id,
    role,
    first_name,
    last_name,
    active,
  } = user.rows[0];

  if (!active) {
    throw new UnauthenticatedError(
      "Email is not verified You need to verify your mail..!"
    );
  }

  const match = await comparePassword(password, hashedPassword);
  if (!match) {
    throw new UnauthenticatedError("Email or Password is Incorrect..!");
    // return res.json({ message: "Password is incorrect", auth: false });
  }

  // create signed jwt
  const token = jwt.sign(
    {
      _id: user_id,
      email: email,
      first_name: first_name,
      last_name: last_name,
      role: role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  // return user and token to client, exclude hashed password
  // send token in cookie
  res.cookie("token", token, {
    httpOnly: true,
    // secure: true, // only works on https
  });

  user.rows[0].password = undefined;
  user.rows[0].reset_password = undefined;

  // send user as json response
  res.json({
    user: user.rows[0],
    auth: true,
    message: "Logged in successfully",
  });
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  return res.json({ message: "Signout success" });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new BadRequestError("Please provide email..!");
  }

  //check if email exists
  const user = await pool.query(checkEmailExists, [email]);
  if (!user.rows.length) {
    throw new NotFoundError("Email does not exist..!");
  }

  var otp = await generateOtp();
  console.log(otp);

  const otp_updated_at = new Date();

  await pool.query(updatePassword, [email, otp, otp_updated_at]);

  const html = `Hi there,
  <br/>
  Reset Your Password!
  <br/><br/>
  Otp will be valid for 10 mins
  <br/>
  Otp to reset password: 
  <br/>
  otp: <b>${otp}</b>
  <br/>
  On the following page:
  <a href="http://localhost:3002/user/resetpassword?email=${email}"/>Reset Password</a>
  <br/><br/>
  Have a pleasant day.`;

  //send mail
  await mailer.sendEmail(
    "subhaschandra.bodakiyavar@veneratesolutions.com",
    email,
    "Reset Your Password!",
    html
  );

  return res.json({
    message: "otp has been sent to your registered email",
    status: true,
  });
};

export const resetPassword = async (req, res) => {
  const { email, otp, password } = req.body;

  if (!email || !otp || !password) {
    throw new BadRequestError("Please provide all the details ..!");
  }

  //check if email exists
  const user = await pool.query(getusersByEmail, [email]);
  if (!user.rows.length) {
    throw new NotFoundError("Email does not exist..!");
  }
  const { reset_password } = user.rows[0];

  // check the otp expiration time
  console.log(
    "difference: ",
    differenceInMinutes(new Date(), user.rows[0].otp_updated_at)
  );
  if (
    differenceInMinutes(new Date(), user.rows[0].otp_updated_at) >=
    process.env.OTP_EXPIRE_LIMIT
  ) {
    throw new UnauthenticatedError("Otp has been expired..!");
  }

  if (otp === reset_password) {
    const hashedPassword = await hashPassword(password);
    await pool.query(updateNewPassword, [email, hashedPassword]);
    return res.json({
      message: "password updated succesfully You can now login",
      isReset: true,
    });
  } else {
    throw new UnauthenticatedError("Invalid Otp, Try Again");
  }
};

export const currentUser = async (req, res) => {
  return res.json({ auth: true, user: req.user });
};

export const page1 = async (req, res) => {
  return res.json({ auth: true, user: req.user });
};
