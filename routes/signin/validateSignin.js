//express-validator
import {body,validationResult } from "express-validator";
const validateSignin = [
    body("data.email")
        .trim()
        .isEmail()
        .withMessage("Please enter a valid email address."),

    body("data.password")
        .trim()
        .isLength({ min: 3, max: 50 })
        .withMessage("Password must be between 3 and 50 characters long."),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const validationError = errors.array()[0].msg
        return res.status(400).json({ error: validationError });
      }
      next();
    }
];

export { validateSignin };
