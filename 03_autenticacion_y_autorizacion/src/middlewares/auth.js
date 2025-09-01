import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(token, "s3cr3t");

  req.userLogged = decoded;

  next();
};
