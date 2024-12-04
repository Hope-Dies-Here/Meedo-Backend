import jwt from "jsonwebtoken"
import send from "../util/customResponse.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.authToken || "sfndb"
  if (!token) {
    return send.unauthorized(res, { error: 'No token provided, access denied!' });
  }

  const verifiedToken = jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
    if (err) {
      return send.badRequest(res, new Error("Invalid or expired token!"))
      // return send.status(403).json({ error: 'No token provided, access denied!' });
    }
    
    next()
  })
}