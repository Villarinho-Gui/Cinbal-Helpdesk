import axios from 'axios'

export default axios.create({
  baseURL: 'http://192.168.56.1:3545',
  // baseURL: 'http://localhost:8181',
})
