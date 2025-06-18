<template>
  <div class="w-full min-h-screen pt-2">
    <!-- Assuming HeaderComponent is already included above or in App.vue -->
    <div v-if="showWelcome" class="mt-10 mx-10">
      <div
        class="backdrop-blur-md bg-blue-200/40 border border-blue-300 rounded-xl shadow-lg p-10"
      >
        <h1 class="text-3xl font-bold text-blue-900 drop-shadow">
          Welcome {{ user_name }}!
        </h1>
      </div>
    </div>

    <main class="flex-1 max-h-full w-[95vw] mt-10 mx-auto">
      <!-- Main content header -->
      <div
        class="flex flex-col items-start justify-between pb-6 space-y-4 shadow-lg px-10 lg:items-center lg:space-y-0 lg:flex-row mt-4"
      >
        <h1 class="text-2xl font-semibold whitespace-nowrap">Dashboard</h1>
        <div class="space-y-6 md:space-x-2 md:space-y-0">
          <span>as of June 2025</span>
        </div>
      </div>

      <!-- Start Content -->
      <div class="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="i in 4"
          :key="i"
          :class="`p-4 transition-shadow rounded-lg shadow-lg hover:shadow-lg ${getCardBgColor(
            i
          )}`"
        >
          <div class="flex items-start justify-between">
            <div class="flex flex-col space-y-2">
              <span class="text-gray-400">Total Users</span>
              <span class="text-lg font-semibold">100,221</span>
            </div>
            <div class="p-10 bg-white rounded-md"></div>
          </div>
          <div>
            <span
              class="inline-block px-2 text-sm text-white bg-green-300 rounded"
              >14%</span
            >
            <span>from 2025</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-5 mt-6 lg:grid-cols-2">
        <div
          v-for="i in 2"
          :key="i"
          :class="`p-4 transition-shadow rounded-lg shadow-lg hover:shadow-lg h-[40vh] flex flex-col items-center justify-center ${getCardBorderColor(i)}`"
        >
          <div class="flex flex-col items-center space-y-2">
            <span class="text-gray-400 text-2xl">Total Users</span>
            <span class="text-8xl font-bold mb-6">100,221</span>
          </div>
          <div>
            <span>from 2025</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";

const user_name = ref("Guest");
const router = useRouter();
const showWelcome = ref(true);

onMounted(async () => {
  try {
    showWelcome.value = sessionStorage.getItem("homePageVisited") !== "true";

    const response = await axios.get("/user_profile");
    user_name.value = response.data.user_name;
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
});

const markHomePageVisited = () => {
  sessionStorage.setItem("homePageVisited", "true");
};

onBeforeRouteLeave((to, from) => {
  markHomePageVisited();
  return true;
});

onBeforeUnmount(() => {
  markHomePageVisited();
});

const getCardBgColor = (index: number) => {
  switch (index) {
    case 1:
      return "bg-blue-100";
    case 2:
      return "bg-green-100";
    case 3:
      return "bg-amber-100";
    case 4:
      return "bg-purple-100";
    default:
      return "";
  }
};

const getCardBorderColor = (index: number) => {
  switch (index) {
    case 1:
      return "border-2 border-blue-300";
    case 2:
      return "border-2 border-green-300";
    default:
      return "";
  }
};
</script>
