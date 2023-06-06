const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const products = require('./database/routes/products');
const status = require('./database/routes/status');
const sells = require('./database/routes/sells');
const users = require('./database/routes/users');
const sequelize = require('./database/instances/sequelize');
const multer = require('./database/routes/multer');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(products);
app.use(sells);
app.use(users);
app.use(status);
app.use(multer);

app.use('/images', express.static('images'));
sequelize.sync(() => console.log('Banco de dados conectado:'));

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
