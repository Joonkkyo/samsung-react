import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
  headers: {
    'content-type': 'application/json',
    apikey: process.env.TODO_APIKEY,
    username: process.env.TODO_USERNAME
  }
})
