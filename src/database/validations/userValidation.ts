import joi from 'joi';
import { Request, Response, NextFunction } from "express";

const userValidation = joi.object({
  name: joi.string().trim(true).min(3).max(25).required(),
  email: joi.string().email().trim(true).required(),
  password: joi.string().min(6).required(),
});

const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const user = req.body;
  const validate = userValidation.validate(user);

  if(validate.error) {
    return res.status(400).json({error: validate.error})
  }

  next();
}

export default validateUser;