import { Request, Response, NextFunction } from "express";
import Sales from "../models/sales";

const validateCancelStatus = async (req: Request| any, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const SaleExist = await Sales.findByPk(id);

  if(SaleExist?.dataValues.status === 'entregue' && SaleExist?.dataValues.status === 'a caminho' && SaleExist?.dataValues.status === 'em preparo') {
    return res.status(409).json({message: "You cant cancel a confirmed sell"});
  };
  if(SaleExist?.dataValues.status === 'em espera' && SaleExist?.dataValues.seller_id === req.userId) {
    next();
  } else {
    return res.status(409).json({message: "You cant cancel a confirmed sell or your are not the seller"});
  };
};

export default validateCancelStatus;
