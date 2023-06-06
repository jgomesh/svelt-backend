const express = require('express');
const upload = require('../../config/multerConfig');
const fs = require('fs');
const path = require('path');
const imagePath = path.join(__dirname, '..', '..', '..', 'images');

const router = express.Router();

router.post('/add_image', upload.single('imagem'), (req, res) => {
  const filePath = req.file.path;
  const newPath = `${imagePath}/${req.file.filename}`;

  fs.rename(filePath, newPath, function (err) {
    if (err) {
      res.status(500).send('Erro ao mover o arquivo');
    } else {
      res.status(200).send({ message: 'Imagem adicionada com sucesso!', url: req.file.filename });
    }
  });
});

module.exports = router;
