const User = require("../models/user");
const Products = require("../models/products");

class ProductsController {
  async create(req, res) {
    const product = req.body;
    const userExists = await User.findOne({
      where: { id: req.userId }
    });

    if (!userExists) {
      return res.sendStatus(409);
    }

    if (req.role === "user") {
      return res.status(400).json({ message: "Only sellers and Admins can register new products" });
    }
    const newProduct = await Products.create({ ...product, seller_id: req.userId });

    return res.status(200).json({ ...newProduct.dataValues });
  }

  async getAll(_req, res) {
    const ProductsExists = await Products.findAll({ where: { seller_id: 1 } });

    if (!ProductsExists) {
      return res.sendStatus(409);
    }
    return res.status(201).json({ products: ProductsExists });
  }

  async getAllProductsFromSeller(req, res) {
    const { id } = req.params;

    if (id === 'undefined' || !id) {
      return res.sendStatus(409);
    }

    const ProductsExists = await Products.findAll({ where: { seller_id: id } });

    if (!ProductsExists) {
      return res.sendStatus(409);
    }
    return res.status(201).json({ products: ProductsExists });
  }

  async getProductById(req, res) {
    const { id } = req.params;

    if (id === 'undefined' || !id) {
      return res.sendStatus(409);
    }

    const ProductExists = await Products.findByPk(id);

    if (!ProductExists) {
      return res.sendStatus(409);
    }
    return res.status(201).json({ product: ProductExists });
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (id === 'undefined' || !id) {
        return res.sendStatus(409);
      }

      const product = await Products.destroy({ where: { id } });
      res.status(201).json({ product });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }
}

module.exports = new ProductsController();
