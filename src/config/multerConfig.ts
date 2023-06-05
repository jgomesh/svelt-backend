import multer from 'multer';
import path from 'path';
const imagePath = path.join(__dirname, '..', '..', 'images');

const storage = multer.diskStorage({
  destination: (_req: any, _file: any, cb: any) => {
    cb(null,  `${imagePath}`);
  },
  filename: (_req: any, file: any, cb: any) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export default upload;