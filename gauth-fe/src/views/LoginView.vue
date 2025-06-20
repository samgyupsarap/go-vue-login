<template>
  <div
    class="flex justify-center items-center h-screen ma-0 w-screen"
    style="
      background-image: url('/bg.jpg');
      background-size: cover;
      background-position: center;
    "
  >
    <div>
      <div class="login-container" style="padding: 35px">
        <div class="flex justify-start items-center mb-6">
          <img
            src="/Logo.png"
            alt="Philippine Statistics Authority Logo"
            class="w-20 h-20"/>
          <h1 class="font-bold text-4xl">Philippine Statistics Authority</h1>
        </div>
        <pre class="text-justify text-wrap" style="font-family: roboto, sans-serif; line-height: 26px;">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas aliquet, risus tempor tincidunt efficitur, diam tortor luctus ipsum, eget varius sapien tortor quis erat. Donec tempor in turpis sit amet luctus. Suspendisse et erat vulputate enim tempus lacinia. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et nisl libero. Vivamus tristique est at neque facilisis molestie. Integer sagittis dictum turpis, a dictum tellus venenatis nec. Pellentesque egestas pharetra metus. Nam in mattis ex. Mauris diam urna, fringilla vitae mi in, iaculis facilisis turpis.
        </pre>
        <p class="flex justify-center items-center my-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong> Aliquam eu.</strong></p>
        <button
          type="button"
          class="google-login-button d-flex align-center"
          elevation="6"
          style="
            width: 100%;
            justify-content: center;
            align-items: center;
            border-radius: 20px;
            border: 1px solid transparent;
            font-family: 'Roboto', sans-serif;
          "
          @click="loginWithGoogle"
          color="blue"
        >
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
            "
          >
            <img
              src="/google.png"
              alt="Google icon"
              class="google-icon"
              style="height: 45px; width: auto; margin-right: 10px"
            />
            <span style="font-size: 25px; font-weight: 500; line-height: 45px">
              Sign in with Google
            </span>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import axios from "axios";
import { onMounted } from "vue";
import { toast } from "vue3-toastify";

const loginWithGoogle = async () => {
  localStorage.removeItem("isAuthorized");
  axios
    .post(`/delete_cookie`, {}, { withCredentials: true })
    .then(() => {
      window.location.href = `${import.meta.env.VITE_BACKEND_URL}/login`;
    })
    .catch((error) => console.error("Error deleting cookies:", error));
};

const showErrorFromSession = () => {
  const params = new URLSearchParams(window.location.search);
  const errorMessage = params.get("error");

  if (errorMessage) {
    sessionStorage.setItem("errorMessage", errorMessage);

    const newUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, newUrl);
  }

  // Check for authentication error from CallbackResponse.vue
  const authError = sessionStorage.getItem("authError");
  if (authError) {
    toast.error(authError.charAt(0).toUpperCase() + authError.slice(1), {
      position: "top-right",
      autoClose: 5000,
      closeButton: true,
      theme: "colored",
      style: {
        fontSize: "22px",
        lineHeight: "1.5",
      },
    });
    sessionStorage.removeItem("authError");
  }

  // Check for other error messages
  const storedError = sessionStorage.getItem("errorMessage");
  if (storedError) {
    toast.error(storedError.charAt(0).toUpperCase() + storedError.slice(1), {
      position: "top-right",
      autoClose: 5000,
      closeButton: true,
      theme: "colored",
      style: {
        fontSize: "22px",
        lineHeight: "1.5",
      },
    });

    sessionStorage.removeItem("errorMessage");
  }
};

// Called when the component is mounted
onMounted(() => {
  showErrorFromSession();
});
</script>
<style scoped>
.login-container {
  background: rgba(218, 218, 218, 0.1);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  border: 1px solid rgba(228, 228, 228, 0.3);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 50vw;
  height: 50vh;
}

@media (max-width: 1700px) {
  .login-container {
    height: 60vh;
  }
}

@media (max-width: 1100px) {
  .login-container {
    height: 70vh;
  }
}

.google-login-button {
  width: 100%;
  padding: 10px;
  color: black;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  font-family: "Roboto", monospace;
  transition: all 0.3s ease;
}

.google-login-button:hover {
  background: rgba(83, 188, 248, 0.35);
  box-shadow: 0 4px 16px rgba(31, 38, 135, 0.12);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.7);
  transform: translateY(-2px);
}

/* Apply custom styles globally */
.Toastify__toast--error {
  border-radius: 10px !important;
  background-color: rgb(248, 140, 140) !important;
  min-height: 120px !important;
  padding: 20px !important;
}

.Toastify__toast--error p {
  font-size: 18px !important; /* Ensure font size is applied */
  margin-top: 5px !important; /* Adjust margin */
}
/* Responsive styling */
@media (max-width: 1024px) {
  .overall {
    flex-direction: column;
    height: auto;
    padding: 20px;
  }

  .login-container {
    max-width: 90vw;
    padding: 20px;
  }
}

@media (max-width: 768px) {
  .overall {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 1rem;
  }

  .google-login-button {
    font-size: 0.9rem;
    padding: 10px;
  }
}
</style>
<!-- TEST -->
