import { Sequelize } from 'sequelize'
import db from '../models/db.js'

export default db.define('user', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  ramal: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  funcao: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  setor: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})
