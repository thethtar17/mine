<template>
  <div>
    <h1>Welcome, {{ userName }}!</h1>
    <button @click="goToToDoList">Go to To-Do List</button>
    <button @click="goToProfile">Go to Profile</button>
    <button @click="goToSettings">Go to Settings</button>
    <button @click="goToOther">Go to Other</button>
    <button @click="goToMoney">Go to Money</button>
  </div>
  <div>
    <button @click="handleLogout">Logout</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'; // Import ref and onMounted
import { getUserName } from '../services/userService'; // Import the user service
import { useRouter } from 'vue-router';
import axios from 'axios';
export default {
  setup() {
    const router = useRouter(); // Use the router
    const userName = ref(''); // Create a reactive variable for the user's name

    // Fetch the logged-in user's name
    const fetchUserName = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get("http://localhost:3000/api/auth/user", {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
          },
        });

        userName.value = response.data.username; // Update the username
      } catch (error) {
        console.error('Error fetching user name:', error);
        userName.value = 'Guest'; // Fallback value
      }
    };

    // Call fetchUserName when the component is mounted
    onMounted(() => {
      fetchUserName();
    });
    
     // Handle Logout: clear localStorage and redirect to login page
     const handleLogout = () => {
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      localStorage.removeItem('token'); // If token is stored

      router.push('/login');
    };

    // Routing methods
    const goToToDoList = () => {
      router.push('/todo');
    };
    const goToProfile = () => {
      router.push('/profile');
    };
    const goToSettings = () => {
      router.push('/settings');
    };
    const goToOther = () => {
      router.push('/other');
    };
    const goToMoney = () => {
      router.push('/money');
    };

    return {
      userName, // Return userName so it can be used in the template
      handleLogout,
      goToToDoList,
      goToProfile,
      goToSettings,
      goToOther,
      goToMoney,
    };
  },
};
</script>

<style scoped>
/* Optional styling */
button {
  margin: 10px;
}
</style>
