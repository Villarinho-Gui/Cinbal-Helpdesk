import { Sequelize } from 'sequelize'
import db from '../db/db.js'

export const Colaborador = db.define('cadastro', {
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

Colaborador.sync()
