const Products = require("../models/products");

const validateSellerDelete = async (req, res, next) => {
  const { id } = req.params;
  const productExists = await Products.findByPk(id);

  if (!productExists) {
    return res.sendStatus(409);
  }

  if (req.userId !== productExists.seller_id) {
    return res.status(409).json({ message: "You can't delete someone else's product" });
  }

  next();
};

module.exports = validateSellerDelete;
