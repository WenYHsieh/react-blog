import axios from 'axios'
import { getAuthToken } from './utils'

const apiHost = 'https://student-json-api.lidemy.me'
const jwtToken = getAuthToken()

const instance = axios.create({
  baseURL: `${apiHost}`,
})
const getMeRequest = axios.create({
  baseURL: `${apiHost}`,
  headers: {
    authorization: `Bearer ${jwtToken}`,
  },
})
const userPostRequest = axios.create({
  baseURL: `${apiHost}`,
  headers: {
    'content-type': 'application/json',
  },
})

export const getPosts = (id, params) => instance.get('/posts/' + id + params)
export const register = (data) => userPostRequest.post('/register', data)
export const login = (data) => userPostRequest.post('/login', data)
export const getMe = () => getMeRequest.get('/me')
