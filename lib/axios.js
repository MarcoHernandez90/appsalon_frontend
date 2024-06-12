import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

/* Para no repetir el código de la validación del token, utilizamos los inteceptors de axios, que son como un middleware con el que podemos sobreescribir la configuración de los request que hacemos. */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('AUTH_TOKEN')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
