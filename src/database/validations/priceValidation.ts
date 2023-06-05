
import { Request, Response, NextFunction } from "express";
import addAllPrices from "./addAllPrices";
import Products from "../models/products";

const priceValidation = async (req: Request, res: Response, next: NextFunction) => {
  const sale = req.body;
  const { total_price, seller_id } = sale;
  const products = sale.sales_products.map((product: any) => ({ product_id: product.product_id, quantity: product.quantity }));

  const prices = await Promise.all(products.map(async (product: any) => {
    const productExist = await Products.findByPk(product.product_id);
    if(productExist) {
      if(productExist.dataValues.seller_id !== seller_id) {
        return undefined;
      }
      return productExist.dataValues;
    }
    return undefined
  }));

  if(prices.some((price: any) => price === undefined)) {
    return res.status(400).json({error: "Product or price not matched"});
  }

  const productsDatabasePrices = products
    .map((product: any, index: number) => ({...product, price: prices[index].price}))
      .map((prices: any) => Number(prices.price) * Number(prices.quantity));

  const totalPriceDatabase = addAllPrices(productsDatabasePrices);

  const isPriceDiferentFromDatabase = total_price !== totalPriceDatabase;

  if(isPriceDiferentFromDatabase) {
    return res.status(400).json({error: "Price is WRONG"});
  }
  next();
}

export default priceValidation;