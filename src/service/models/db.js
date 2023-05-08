/* eslint-disable no-unused-vars */
import { Sequelize } from 'sequelize' // importar o sequelize
const sequelize = new Sequelize('users', 'root', 'q!Oih6XX', {
  host: 'localhost',
  dialect: 'mysql',
})

sequelize
  .authenticate()
  .then(function () {
    console.log('conexão com o banco de dados foi realizada com sucesso')
  })
  .catch(function () {
    console.log('A conexão com o banco de dados falhou')
  })

export default sequelize // exportar
