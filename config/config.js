require("dotenv").config();

module.exports = {

  "development": {
    use_env_variable: "DB_URL",
    dialect: "postgres",
    pool: { maxConnections: 5, maxIdleTime: 30},
  },

  "test": {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    database: "keeper_test",
    dialect: "postgres"
  },

  "production": {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    maxConcurrentQueries: 100,
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
    },
    pool: { maxConnections: 5, maxIdleTime: 30},
  }
};
