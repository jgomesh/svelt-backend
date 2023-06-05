import { Request, Response, NextFunction } from "express";
import Products from "../models/products";

const validateSellerDelete = async (req: Request| any, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const ProductExists = await Products.findByPk(id);

  if(!ProductExists) {
    return res.sendStatus(409);
  }
  if(req.userId !== ProductExists.dataValues.seller_id) {
    res.status(409).json({message: "You cant dellet someone else`s product"})
  }
  next();
}

export default validateSellerDelete;
