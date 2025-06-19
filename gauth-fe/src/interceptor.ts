import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
axios.defaults.withCredentials = true

export const getToken = async () => {
  try {
    const response = await axios.get('/get_cookie')
    const token = response.data.token
    console.log('Token fetched:', token)
    

if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${String(token)}`
}
console.log('Token:', token, typeof token)

  } catch (error) {
    console.error('Error fetching token:', error)
  }
  
}

if (window.location.pathname !== '/') {
  getToken()
}
