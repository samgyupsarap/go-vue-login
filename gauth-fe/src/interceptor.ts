import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
axios.defaults.withCredentials = true

export function getCookie(name: string) {
  const regex: RegExp = new RegExp('(^| )' + name + '=([^;]+)');
  const match: RegExpExecArray | null = regex.exec(document.cookie);
  console.log('Cookie match: ', match);
  return match ? match[2] : null;
}

export function setAuthToken() {
  const token = getCookie('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log('Token set in axios headers: ', token);
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}


if (window.location.pathname !== '/') {
  setAuthToken();
}
