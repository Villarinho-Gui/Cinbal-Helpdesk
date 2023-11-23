import axios from 'axios'

export default axios.create({
  baseURL: 'http://apihd.cinbal.com.br',
  // baseURL: 'http://localhost:8181',
})
