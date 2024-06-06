import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../db/db";
import bcrypt from "bcrypt";
interface UserAttributes {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  refreshToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}
interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}
type UserTpyedModel = UserInstance;

const User = sequelize.define<UserInstance>(
  "User",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { name: "email", msg: "Email alreay exits login" },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "password cannot be null",
        },
        notEmpty: {
          msg: "password cannot be empty",
        },
      },
    },
    refreshToken: {
      type: DataTypes.TEXT,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },

  {
    timestamps: true,
    freezeTableName: true,
    paranoid: true,
    modelName: "user",
    // hooks for user create then run / before saving run
    hooks: {
      beforeCreate(user: UserTpyedModel) {
        encrptPassword(user);
      },
      beforeUpdate(user: UserTpyedModel) {
        encrptPassword(user);
      },
    },
    defaultScope: {
      attributes: { exclude: ["password"] },
    },
    scopes: {
      withPassword: {
        attributes: undefined,
      },
    },
  }
);
// for password hash
async function encrptPassword(typedUser: UserTpyedModel) {
  if (typedUser.changed("password")) {
    typedUser.password = await bcrypt.hash(typedUser.get("password"), 10);
  }
}
// User.prototype.verifyPassword = async function (password: string) {
//   return await bcrypt.compare(password, this.password);
// };
export default User;
