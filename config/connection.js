// config/connection.js

const Sequelize = require('sequelize');

let sequelize;

if (process.env.JAWSDB_URL) {
  // If running on Heroku (production), use the JAWSDB_URL environment variable
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // If running locally or in any other environment, use the local MySQL database
  sequelize = new Sequelize(
    process.env.DB_NAME || 'blog_db',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || 'your_password',
    {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'mysql',
      port: process.env.DB_PORT || 3306
    }
  );
}

module.exports = sequelize;