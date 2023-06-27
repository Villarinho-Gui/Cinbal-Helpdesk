import axios from 'axios'

export default axios.create({
  baseURL: 'http://10.152.6.107:3000',
  // baseURL: 'http://localhost:8181',
})
