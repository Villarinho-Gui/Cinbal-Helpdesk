import axios from 'axios'

export default axios.create({
  baseURL: 'http://apihd.cinbal.com.br',
  headers: {
    'Content-Type': 'application/json',
  },
  // baseURL: 'http://localhost:8181',
})
