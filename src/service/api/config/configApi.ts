import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:3535',
  // baseURL: 'http://localhost:8181',
})
