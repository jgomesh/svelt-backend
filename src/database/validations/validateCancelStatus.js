const Sales = require("../models/sales");

const validateCancelStatus = async (req, res, next) => {
  const { id } = req.params;
  const saleExist = await Sales.findByPk(id);

  if (
    saleExist &&
    (saleExist.status === "entregue" ||
      saleExist.status === "a caminho" ||
      saleExist.status === "em preparo")
  ) {
    return res
      .status(409)
      .json({ message: "You can't cancel a confirmed sale" });
  }

  if (
    saleExist &&
    saleExist.status === "em espera" &&
    saleExist.seller_id === req.userId
  ) {
    next();
  } else {
    return res.status(409).json({
      message: "You can't cancel a confirmed sale or you are not the seller",
    });
  }
};

module.exports = validateCancelStatus;
