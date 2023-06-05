import { Router } from 'express';
import upload from '../../config/multerConfig';
import fs from 'fs';
const path = require('path');
const imagePath = path.join(__dirname, '..', '..', '..', 'images');

const router = Router();

router.post('/add_image', upload.single('imagem'), (req: any, res: any) => {
  const path = req.file.path;
  const newPath = `${imagePath}/${req.file.filename}`;

  fs.rename(path, newPath, function (err) {
    if (err) {
      res.status(500).send('Erro ao mover o arquivo');
    } else {
      res.status(200).send({ message: 'Imagem adicionada com sucesso!', url: req.file.filename} );
    } 
  }); 
});


export default router;