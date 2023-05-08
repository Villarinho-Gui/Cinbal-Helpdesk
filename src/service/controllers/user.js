import ClientRepository from '../models/UserModel.js'

async function findAll(req, res) {
  const user = await ClientRepository.findAll()
  res.json(user)
}

export default { findAll }
