import { Request, Response } from "express";
import * as bcrypt from 'bcrypt';
import User from '../models/user';

class UserController {
  async getAll(_req: Request, res: Response) {
    const users = await User.findAll();

    if(!users) {
      res.sendStatus(404)
    }

    res.status(201).json({ users })
  }

  async getAllSellers(_req: Request, res: Response) {
    const sellers = await User.findAll({ where: { role: "seller" }, attributes: { exclude: ['password', 'email'] }});

    if(!sellers) {
      res.sendStatus(404)
    }

    res.status(201).json({ sellers })
  }

  async index(req: Request | any, res: Response) {
    const userExists = await User.findOne({
      where: { id: req.userId }
    })

    if(!userExists) {
      return res.sendStatus(409)
    }

    return res.send( {  userId: req.userId, name: userExists.name, role: userExists.role  });
  }

  async store(req: Request, res: Response) {
    const { email, password, name} =  req.body;

    const userExists = await User.findOne({
      where: { email }
    })

    if(userExists) {
      return res.sendStatus(409)
    }

    const saltRounds = 10

    const hash: any = await bcrypt
    .genSalt(saltRounds)
    .then(salt => {
      return bcrypt.hash(password, salt)
    })
    .then(hash => {
      return hash;
    })
    .catch(err => console.error(err.message));

    const user = await User.create({ email, password: hash, name, role: "user"});
    return res.json({id: user.id, status: 'success'});
  }

  async createSeller(req: Request, res: Response) {
    const { email, password, name} =  req.body;

    const userExists = await User.findOne({
      where: { email }
    })

    if(userExists) {
      return res.sendStatus(409)
    }

    const saltRounds = 10

    const hash: any = await bcrypt
    .genSalt(saltRounds)
    .then(salt => {
      return bcrypt.hash(password, salt)
    })
    .then(hash => {
      return hash;
    })
    .catch(err => console.error(err.message));

    const user = await User.create({ email, password: hash, name, role: "seller"});
    return res.json({id: user.id, status: 'success'});
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params
      const user = await User.destroy({where: { id }});
      res.status(201).json({user});
    } catch (error: any) {
      res.status(401).json({message: error.message})
    }
  }

  async getSellerName(req: Request, res: Response) {
    const { id } = req.params
      const seller = await User.findByPk(id , { attributes: { exclude: ['password'] } } );
      if(!seller) {
        res.status(404).json({error: "Seller not found"});
      }
      res.status(201).json({seller});
  }
}

export default new UserController;
