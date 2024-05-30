import config from "../config/config.js";
import { Sequelize } from "sequelize";
import User from "../models/index.js";

const connection = () => {
  const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
      host: config.development.host,
      dialect: config.development.dialect,
    }
  );
  sequelize
    .authenticate()
    .then(async () => {
      let user = null;
      console.log("connect successfully database");
      user = User.User;
      await user.sync({ force: true });
      console.log("table created successfully ");
    })
    .catch((err) => {
      console.log(`error in connecting database ${err}`);
    });
};

export default connection;
