const Products = require("../models/products");
const Sales = require("../models/sales");
const User = require("../models/user");
const SalesProducts = require("../models/salesProducts");
const { Sequelize } = require("sequelize");

class SalesController {
  async getAll(_req, res) {
    const sales = await Sales.findAll();

    if (!sales.length) {
      return res.sendStatus(409);
    }

    return res.status(201).json({ sales });
  }

  async getSellerSales(req, res) {
    const sales = await Sales.findAll({ where: { seller_id: req.userId } });

    if (!sales.length) {
      return res.sendStatus(409);
    }

    return res.status(201).json({ sales });
  }

  async getById(req, res) {
    const sales = await Sales.findAll({ where: { user_id: req.userId } });

    if (!sales.length) {
      return res.sendStatus(404);
    }

    return res.status(201).json({ sales });
  }

  async getSalesProducts(_req, res) {
    const salesProducts = await SalesProducts.findAll();

    if (!salesProducts.length) {
      return res.sendStatus(409);
    }

    return res.status(201).json({ salesProducts });
  }

  async getSalesProductsId(req, res) {
    const { id } = req.params;
    const sale = await Sales.findByPk(id);

    if (!sale && id !== req.userId) {
      return res.sendStatus(409);
    }

    const salesProducts = await SalesProducts.findAll({ where: { sale_id: id } });

    return res.status(201).json({ salesProducts, sale });
  }

  async create(req, res) {
    const sale = req.body;
    const { sales_products } = sale;
    const userExists = await User.findOne({
      where: { id: req.userId }
    })
    if (!userExists) {
      return res.sendStatus(404);
    }
    
    const newSale = await Sales.create({ ...sale, sale_date: new Date().toLocaleDateString(), user_id: req.userId, status: "em espera" });
    console.log("OIIIIIIIIIIIII")
    console.log("HERE?", newSale.id)
    const newSalesProducts = await Promise.all(sales_products.map(async (saleProduct) => {
      await SalesProducts.create({ sale_id: newSale.id, ...saleProduct });
      console.log("OU AQUI", saleProduct.id)
      const product = await Products.findByPk(saleProduct.id);

      return {
        ...product?.dataValues,
        quantity: saleProduct.quantity,
      }
    }));

    if (!newSalesProducts) {
      return res.sendStatus(404);
    };

    return res.status(200).json({ ...newSale.dataValues, salesProducts: newSalesProducts });
  }

  async updateStatus(req, res) {
    const { id } = req.params;
    const sale = await Sales.findByPk(id);
    const options = ['em espera', 'em preparo', 'a caminho', 'entregue'];

    if (!sale) {
      return res.status(409).json({ message: "Sale not found!!" });
    }
    const nextStatus = Number(options.indexOf(sale?.dataValues.status)) + 1;
    const saleUpdated = await Sales.update({ status: options[nextStatus] }, { where: { id } });
    return res.status(200).json({ saleUpdated, status: options[nextStatus] });
  }

  async canceledStatus(req, res) {
    const { id } = req.params;
    const sale = await Sales.findByPk(id);

    if (!sale) {
      return res.status(409).json({ message: "Sale not found!!" });
    }
    const saleUpdated = await Sales.update({ status: 'canceled' }, { where: { id } });
    return res.status(200).json({ saleUpdated, status: 'canceled' });
  }
  async getTopSellers(_req, res) {
    const sellers = await Sales.findAll({
      attributes: [
        'seller_id',
        [Sequelize.fn('COUNT', Sequelize.col('seller_id')), 'total_sales'],
      ],
      group: ['seller_id', 'seller.id', 'seller.name'], // Adiciona os campos na cláusula GROUP BY
      order: [[Sequelize.literal('total_sales'), 'DESC']],
      limit: 5,
      include: [
        {
          model: User,
          as: 'seller',
          attributes: ['id', 'name', 'role'],
          where: {
            role: ['seller', 'admin']
          }
        },
      ],
    });

    const topSellers = sellers.map((seller) => ({
      id: seller.seller.id,
      name: seller.seller.name,
      total_sales: seller.get('total_sales'),
    }));

    return res.json(topSellers);
  }

  async getTopProducts(req, res) {
    const topProducts = await SalesProducts.findAll({
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('quantity')), 'total_sales'],
        'product_id',
      ],
      group: ['product.id', 'product.name', 'SaleProduct.product_id'],
      order: [[Sequelize.literal('total_sales'), 'DESC']],
      limit: 5,
      include: [
        {
          model: Products,
          as: 'product',
          attributes: ['id', 'name'],
        },
      ],
    });
  
    const result = topProducts.map((product) => ({
      id: product.product.id,
      name: product.product.name,
      total_sales: product.get('total_sales'),
    }));
  
    res.json(result);
  }
  

  async getTopSellersWithSales(_req, res) {
    const sellers = await Sales.findAll({
      attributes: [
        'seller_id',
        [Sequelize.fn('SUM', Sequelize.col('sales_products.total_price')), 'total_sales'],
      ],
      group: ['seller.id', 'seller.name'],
      order: [[Sequelize.literal('total_sales'), 'DESC']],
      limit: 5,
      include: [
        {
          model: User,
          as: 'seller',
          attributes: ['id', 'name', 'role'],
          where: {
            role: ['seller', 'admin']
          }
        },
        {
          model: SalesProducts,
          as: 'sales_products',
          attributes: [
            [Sequelize.fn('SUM', Sequelize.col('sales_products.price * sales_products.quantity')), 'total_price'],
          ],
          include: [
            {
              model: Products,
              as: 'product',
              attributes: ['id', 'name', 'price'],
            },
          ]
        }
      ],
    });

    const topSellers = sellers.map((seller) => ({
      id: seller.seller.id,
      name: seller.seller.name,
      total_sales: seller.get('total_sales'),
    }));

    return res.json(topSellers);
  }
}

module.exports = new SalesController();
