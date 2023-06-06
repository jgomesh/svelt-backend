const addAllPrices = ("./addAllPrices");
const Products = ("../models/products");


const priceValidation = async (req, res, next) => {
  const sale = req.body;
  const { total_price, seller_id } = sale;
  const products = sale.sales_products.map((product) => ({ product_id: product.product_id, quantity: product.quantity }));

  const prices = await Promise.all(products.map(async (product) => {
    const productExist = await Products.findByPk(product.product_id);
    if (productExist) {
      if (productExist.dataValues.seller_id !== seller_id) {
        return undefined;
      }
      return productExist.dataValues;
    }
    return undefined;
  }));

  if (prices.some((price) => price === undefined)) {
    return res.status(400).json({ error: "Product or price not matched" });
  }

  const productsDatabasePrices = products
    .map((product, index) => ({ ...product, price: prices[index].price }))
    .map((prices) => Number(prices.price) * Number(prices.quantity));

  const totalPriceDatabase = addAllPrices(productsDatabasePrices);

  const isPriceDifferentFromDatabase = total_price !== totalPriceDatabase;

  if (isPriceDifferentFromDatabase) {
    return res.status(400).json({ error: "Price is WRONG" });
  }
  next();
};

module.exports = priceValidation;
