import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  // forma 1

  // const decoded = jwt.verify(token, "s3cr3t", (err, decoded) => {
  //   throw new Error("")

  //   return decoded_dentro
  // });

  // return decoded;

  // forma 2
  const decoded = jwt.verify(token, "s3cr3t");

  req.userLogged = decoded;

  next();
};
