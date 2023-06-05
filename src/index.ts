import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import products from './database/routes/products';
import status from './database/routes/status';
import sales from './database/routes/sells';
import users from './database/routes/users';
import sequelize from './database/instances/sequelize';
import multer from './database/routes/multer';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(products);  
app.use(sales);
app.use(users);
app.use(status);
app.use(multer);

app.use('/images', express.static('images')); 
sequelize.sync(() => console.log(`Banco de dados conectado:`));

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})
