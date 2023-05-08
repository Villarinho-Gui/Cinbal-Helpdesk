import ClientRepository from '../models/UserModel.js'

function findAll(_, res) {
  ClientRepository.findAll().then((result) => res.json(result))
}

function findUser(req, res) {
  ClientRepository.findByPk(req.params.id).then((result) => res.json(result))
}

function addUser(req, res) {
  ClientRepository.create({
    nome: req.body.nome,
    email: req.body.email,
    ramal: req.body.ramal,
    setor: req.body.setor,
    funcao: req.body.funcao,
    filial: req.body.filial,
    password: req.body.password,
  }).then((result) => res.json(result))
}

async function updateUser(req, res) {
  await ClientRepository.update(
    {
      nome: req.body.nome,
      email: req.body.email,
      ramal: req.body.ramal,
      setor: req.body.setor,
      funcao: req.body.funcao,
      filial: req.body.filial,
      password: req.body.password,
    },
    {
      where: {
        id: req.params.id,
      },
    },
  )

  ClientRepository.findByPk(req.params.id).then((result) => res.json(result))
}

async function deleteUser(req, res) {
  await ClientRepository.destroy({
    where: {
      id: req.params.id,
    },
  })

  ClientRepository.findAll().then((result) => res.json(result))
}

export default {
  findAll,
  addClient: addUser,
  findClient: findUser,
  updateClient: updateUser,
  deleteClient: deleteUser,
}
