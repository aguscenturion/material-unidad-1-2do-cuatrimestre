import { validationResult } from "express-validator";

export const validator = (req, res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.json({ errors: result.mapped() });
  }

  next();
};
