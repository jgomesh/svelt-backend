import { Request, Response, NextFunction } from "express";
import Sales from "../models/sales";

const validateStatusOwner = async (req: Request| any, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const SaleExist = await Sales.findByPk(id);

  if(!SaleExist?.dataValues) {
    return res.status(404).json({message: "Sale not found"});
  };

  if(SaleExist?.dataValues.status === 'em espera' && Number(SaleExist.dataValues.user_id) !== req.userId) {
    if(Number(SaleExist.dataValues.seller_id) === Number(req.userId)) {
      next();
    };
  };

  if(SaleExist?.dataValues.status === 'em preparo' && Number(SaleExist.dataValues.user_id) !== req.userId) {
    if(Number(SaleExist.dataValues.seller_id) === Number(req.userId)) {
      next();
    };
  };
  
    if(SaleExist?.dataValues.status === 'a caminho') {
      if(Number(SaleExist.dataValues.seller_id) === Number(req.userId) && Number(SaleExist.dataValues.user_id) !== req.userId) {
        return res.status(409).json({message: "Seller cant confirm the deliver"})
      };
    };

  if(SaleExist?.dataValues.status === 'a caminho') {
    if(Number(SaleExist.dataValues.user_id) === Number(req.userId) && Number(SaleExist.dataValues.seller_id) !== req.userId) {
      next();
    };
  };


  if(SaleExist?.dataValues.status === 'cancelado') {
    return res.status(404).json({message: "You cant change a canceled buy"});
  };

  if(SaleExist?.dataValues.status === 'entregue') {
    return res.status(409).json({message: "You cant change a delivered sell"});
  };
}

export default validateStatusOwner;
