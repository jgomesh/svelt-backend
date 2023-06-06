const multer = require('multer');
const path = require('path');
const imagePath = path.join(__dirname, '..', '..', 'images');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, imagePath);
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
