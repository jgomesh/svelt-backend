import { Sequelize } from 'sequelize'
import config from '../../config/config'
import 'dotenv/config';

const sequelize: any = new Sequelize(config);

sequelize.authenticate()

export default sequelize