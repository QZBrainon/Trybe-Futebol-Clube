import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

export default class Teams extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

Teams.init({
  id: {
    primaryKey: true,
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
  },
  teamsName: {
    type: STRING,
    allowNull: false,
  },
}, {

  sequelize: db,

  modelName: 'teams',

  timestamps: false,

  underscored: true,

});
