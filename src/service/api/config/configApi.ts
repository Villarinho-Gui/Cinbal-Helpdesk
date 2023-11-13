import axios from 'axios'

export default axios.create({
  baseURL: 'http://10.152.7.151:3545',
  // baseURL: 'http://localhost:8181',
})
