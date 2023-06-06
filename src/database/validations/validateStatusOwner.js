const Sales = require("../models/sales");

const validateStatusOwner = async (req, res, next) => {
  const { id } = req.params;
  const saleExist = await Sales.findByPk(id);

  if (!saleExist?.dataValues) {
    return res.status(404).json({ message: "Sale not found" });
  }

  const { status, user_id, seller_id } = saleExist.dataValues;

  if (status === 'em espera' || status === 'em preparo') {
    if (Number(user_id) !== req.userId && Number(seller_id) === req.userId) {
      return next();
    }
  }

  if (status === 'a caminho') {
    if (Number(user_id) === req.userId && Number(seller_id) !== req.userId) {
      return next();
    }
    if (Number(seller_id) === req.userId && Number(user_id) !== req.userId) {
      return res.status(409).json({ message: "Seller can't confirm the delivery" });
    }
  }

  if (status === 'cancelado') {
    return res.status(404).json({ message: "You can't change a canceled purchase" });
  }

  if (status === 'entregue') {
    return res.status(409).json({ message: "You can't change a delivered sale" });
  }

  return res.sendStatus(401);
};

module.exports = validateStatusOwner;
