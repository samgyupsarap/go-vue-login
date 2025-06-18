<template>
  <div class="m-10 h-[90vh] w-[95vw] bg-gray-50 mt-24">
    <div class="bg-white shadow-lg rounded-lg p-8 w-full">
      <h1 class="text-2xl font-bold mb-4 text-start text-gray-800 pb-2 border-b-2 border-blue-500">User Details</h1>
      
      <div class="flex flex-col md:flex-row items-start mb-6 mt-10 gap-6">
        <div class="profile-image-container mb-4 md:mb-0 md:mr-8 flex-shrink-0">
          <div class="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gray-200 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 md:h-28 md:w-28 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
        
        <div class="md:w-2/3 flex flex-col items-center md:items-start w-full mt-4">
          <div class="mb-4 w-full">
            <label class="block text-gray-600 text-sm font-semibold mb-1">Name</label>
            <div class="bg-gray-100 rounded px-4 py-2 text-gray-800">{{ full_name }}</div>
          </div>
          <div class="mb-4 w-full">
            <label class="block text-gray-600 text-sm font-semibold mb-1">Email</label>
            <div class="bg-gray-100 rounded px-4 py-2 text-gray-800">{{ email }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';

const full_name = ref('')
const email = ref('');

interface UserProfile {
  full_name: string;
  email: string;
}

onMounted(async () => {
  try {
    const response = await axios.get('/user_profile');
    full_name.value = response.data.full_name;
    email.value = response.data.email;
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
});
</script>