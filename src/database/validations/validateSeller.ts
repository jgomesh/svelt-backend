import { Request, Response, NextFunction } from "express";

const validateSeller = async (req: Request| any, res: Response, next: NextFunction) => {
  if(req.role !== "seller") {
    req.status(409).json({ message: "YOU ARE NOT A SELLER"});
  };
  next();
}

export default validateSeller;
