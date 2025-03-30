// config/database.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('moviesdb', 'root', 'Dam2021', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
});

try {
  await sequelize.authenticate();
  console.log('Conexión a la base de datos exitosa.');
} catch (error) {
  console.error('Error de conexión: ', error);
}

export default sequelize;
