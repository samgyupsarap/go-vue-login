<template>
  <header class="header-app-bar">
    <div class="row-container" style="width: 100%">
      <div @click="router.push('/home')" style="cursor: pointer" class="flex items-center gap-2">
        <img
          src="/Logo.png"
          alt="Philippine Statistics Authority Logo"
          class="w-20 h-20"
        />
        <span class="font-bold text-2xl">PHILIPPINE STATISTICS AUTHORITY</span>
      </div>
      <div>
        <nav class="nav-tabs">
           <button
            class="px-4 py-2 text-base mr-2.5 text-gray-700 rounded transition-colors hover:bg-gray-100"
            :class="{ 'border-b-2 border-blue-600 text-black': activeTab === '/home' }"
            @click="navigateTo('/home')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="inline-block w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke="currentColor" stroke-width="2" d="M3 12l9-8 9 8M4 10v10a1 1 0 001 1h5a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h5a1 1 0 001-1V10"/>
            </svg>
          </button>
          <button
            class="px-4 py-2 text-base mr-2.5 text-gray-700 rounded transition-colors hover:bg-gray-100"
            :class="{ 'border-b-2 border-blue-600 text-black': activeTab === '/user' }"
            @click="navigateTo('/user')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="inline-block w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2" fill="none"/>
              <path stroke="currentColor" stroke-width="2" d="M4 20c0-4 4-6 8-6s8 2 8 6"/>
            </svg>
          </button>
        </nav>
        <button
          class="ml-auto max-w-[120px] px-4 py-2 font-medium rounded transition-colors hover:bg-gray-400 hover:text-white"
          @click="showLogoutConfirmation = true"
        >
          Logout
        </button>
      </div>
    </div>
  </header>

  <!-- Logout Confirmation Dialog -->
  <div 
    v-if="showLogoutConfirmation" 
    class="fixed inset-0 flex items-center justify-center z-100"
    style="background: rgba(30,30,30,0.7); backdrop-filter: blur(4px);"
  >
    <div class="bg-white rounded-lg p-6 w-[25vw] h-[25vh] shadow-md flex flex-col justify-center items-center">
      <h3 class="mb-5 text-lg font-medium text-center">Are you sure you want to logout?</h3>
      <div class="flex justify-center gap-4">
        <button 
          class="px-4 py-2.5 bg-gray-200 text-gray-700 font-medium rounded transition-colors hover:bg-gray-300"
          @click="showLogoutConfirmation = false"
        >
          No, I want to stay
        </button>
        <button 
          class="px-4 py-2.5 bg-blue-600 text-white font-medium rounded transition-colors hover:bg-blue-700"
          @click="confirmLogout"
        >
          Yes, log me out
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import { ref, watch } from "vue";

const router = useRouter();
const route = useRoute();

const name = sessionStorage.getItem("user_name");
const role = sessionStorage.getItem("role_id");
const user = sessionStorage.getItem("user");
const profilePicture = sessionStorage.getItem("profile_picture");

const activeTab = ref(route.path);
const showLogoutConfirmation = ref(false);

function navigateTo(routePath: string) {
  router.push(routePath);
}

const confirmLogout = () => {
  showLogoutConfirmation.value = false;
  handleLogout();
};

const handleLogout = () => {
  axios
    .post("/logout", null, {
      withCredentials: true,
    })
    .then((response) => {
      if (response.status === 200) {
        console.log("Logged out successfully");
        sessionStorage.removeItem("homePageVisited");
        window.location.href = "/";
      } else {
        window.location.href = "/";
        console.error(
          "An error occurred while logging out:",
          response.statusText
        );
      }
    })
    .catch((error) => {
      console.error(
        "Error logging out:",
        error.response?.data || error.message
      );
    });
};

watch(
  () => route.path,
  (newPath) => {
    if (newPath === "/history") {
      activeTab.value = "";
    } else {
      activeTab.value = newPath;
    }
  }
);
</script>

<style scoped>
.header-app-bar {
  width: 98vw;
  left: 0;
  top: 0;
  position: fixed;
  z-index: 10;
  padding: 0 !important;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
}

.row-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin: 5px 20px;
}

.nav-tabs {
  display: inline-flex;
  align-items: center;
  margin-left: 16px;
}
</style>
