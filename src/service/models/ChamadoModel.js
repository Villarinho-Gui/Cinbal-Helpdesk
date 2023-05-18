import { DataTypes, Sequelize } from 'sequelize'
import db from '../db/db.js'

export const Chamado = db.define('chamado', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  autor: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  titulo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  categoria: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.JSON, // Usar o tipo de dados JSON para permitir vários arquivos
    allowNull: true,
  },
  responsavel: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: true,
  },
})

Chamado.sync().then(() => {
  // O modelo foi sincronizado, agora você pode realizar outras operações
})
