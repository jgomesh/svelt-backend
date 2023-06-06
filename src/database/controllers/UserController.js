const { Request, Response } = require("express");
const bcrypt = require('bcrypt');
const User = require('../models/user');

class UserController {
  async getAll(_req, res) {
    const users = await User.findAll();

    if (!users) {
      res.sendStatus(404);
    }

    res.status(201).json({ users });
  }

  async getAllSellers(_req, res) {
    const sellers = await User.findAll({ where: { role: "seller" }, attributes: { exclude: ['password', 'email'] } });

    if (!sellers) {
      res.sendStatus(404);
    }

    res.status(201).json({ sellers });
  }

  async index(req, res) {
    const userExists = await User.findOne({
      where: { id: req.userId }
    })

    if (!userExists) {
      return res.sendStatus(409);
    }

    return res.send({ userId: req.userId, name: userExists.name, role: userExists.role });
  }

  async store(req, res) {
    const { email, password, name } = req.body;

    const userExists = await User.findOne({
      where: { email }
    })

    if (userExists) {
      return res.sendStatus(409);
    }

    const saltRounds = 10

    const hash = await bcrypt
      .genSalt(saltRounds)
      .then(salt => {
        return bcrypt.hash(password, salt)
      })
      .then(hash => {
        return hash;
      })
      .catch(err => console.error(err.message));

    const user = await User.create({ email, password: hash, name, role: "user" });
    return res.json({ id: user.id, status: 'success' });
  }

  async createSeller(req, res) {
    const { email, password, name } = req.body;

    const userExists = await User.findOne({
      where: { email }
    })

    if (userExists) {
      return res.sendStatus(409);
    }

    const saltRounds = 10

    const hash = await bcrypt
      .genSalt(saltRounds)
      .then(salt => {
        return bcrypt.hash(password, salt)
      })
      .then(hash => {
        return hash;
      })
      .catch(err => console.error(err.message));

    const user = await User.create({ email, password: hash, name, role: "seller" });
    return res.json({ id: user.id, status: 'success' });
  }

  async delete(req, res) {
    try {
      const { id } = req.params
      const user = await User.destroy({ where: { id } });
      res.status(201).json({ user });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  async getSellerName(req, res) {
    const { id } = req.params
    const seller = await User.findByPk(id, { attributes: { exclude: ['password'] } });
    if (!seller) {
      res.status(404).json({ error: "Seller not found" });
    }
    res.status(201).json({ seller });
  }
}

module.exports = new UserController();
