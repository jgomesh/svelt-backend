import { Request, Response } from "express";
import * as bcrypt from 'bcrypt';
import User from '../models/user'
import { sign } from 'jsonwebtoken';

class AuthController {
  async authenticate(req: Request, res: Response) {
    const { email, password} =  req.body;

    const data:any = await User.findOne({ where: { email }});
    if(!data) {
      return res.sendStatus(401);
    }
    const user = data.dataValues
    if(!user) {
      return res.sendStatus(401);
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);

    if(!isValidPassword) {
      return res.sendStatus(401);
    }

    const token = sign({ id: user.id, role: user.role }, 'secret', { expiresIn: '1d'});

    return res.status(201).json({
      id: user.id,
      role: user.role,
      token,
      status: 'ok',
    });

  }
}

export default new AuthController;