const joi = require("joi");

const saleValidation = joi.object({
  user_id: joi.number().integer().required(),
  seller_id: joi.number().integer().required(),
  total_price: joi.number().precision(2).required(),
  delivery_address: joi.string().min(5).required(),
  delivery_number: joi.number().required(),
  sales_products: joi.array().min(1).required(),
});

const validateSale = (req, res, next) => {
  const sale = req.body;
  const validate = saleValidation.validate(sale);
  if (validate.error) {
    return res.status(404).json({ error: validate.error });
  }

  next();
};

module.exports = validateSale;
