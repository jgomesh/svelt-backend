const validateSeller = async (req, res, next) => {
  if (req.role !== "seller") {
    return res.status(409).json({ message: "YOU ARE NOT A SELLER" });
  }
  next();
};

module.exports = validateSeller;
