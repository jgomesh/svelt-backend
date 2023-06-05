import joi from 'joi';
import { Request, Response, NextFunction } from "express";

const productValidation = joi.object({
  name: joi.string().trim(true).min(3).max(25).required(),
  price: joi.number().precision(2).required(),
  url_image: joi.string().min(6).required()
});

const validateProduct = (req: Request | any, res: Response, next: NextFunction) => {
  const product = req.body;
  const validate = productValidation.validate(product);

  if(validate.error) {
    return res.status(400).json({error: validate.error})
  }

  if(req.role === 'user') {
    return res.status(409).json({error: 'You need to be a seller to register products'})
  }

  next();
}

export default validateProduct;