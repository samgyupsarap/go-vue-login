<template>
  <!-- Handles the redirect of backend -->
</template>

<script setup lang="ts">
import axios from 'axios'
import type { AxiosResponse } from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const error = null

if (error) {
 alert('An error occurred. Please try again later.')
  router.push('/')
} else {
  axios
    .get(`/get_cookie`, {
      withCredentials: true,
    })
    .then((response: AxiosResponse) => {
      const token = response.data
      if (token) {
        localStorage.setItem('isAuthorized', '1')
        router.push('/home')
      } else {
        console.error('No token found. Please log in again.')
        router.push('/')
      }
    })
    .catch((error) => {
      if (error.response?.status === 401) {
        console.error('Unauthorized access. Please log in again.')
        sessionStorage.setItem('authError', 'Unauthorized access. Please log in again.')
        router.push('/')
      }
      // sessionStorage.removeItem('isLoggedIn')
      router.push('/')
    })
}
</script>