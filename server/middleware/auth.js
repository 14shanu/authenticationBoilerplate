import jwt from "jsonwebtoken";
import cookie from "cookie";
import { UnauthenticatedError, UnauthorizedError } from "../errors";

export const requireSignin = (req, res, next) => {
  let { token } = cookie.parse(req.headers.cookie);

  if (!token) {
    // return res.json({ auth: false });
    throw new UnauthenticatedError("No Token found..!");
  }

  token = token.replace("token=", "");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // const decoded = jwt.verify(token, "process.env.JWT_SECRET");
    req.user = decoded;
    next();
  } catch (err) {
    throw new UnauthenticatedError("Invalid Token..!");
  }
};
