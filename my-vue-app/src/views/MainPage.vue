<template>
  <div>
    <h1>Welcome, {{ userName }}!</h1>
    <button @click="goToToDoList">Go to To-Do List</button>
    <button @click="goToProfile">Go to Profile</button>
    <button @click="goToSettings">Go to Settings</button>
    <button @click="goToOther">Go to Other</button>
    <button @click="goToMoney">Go to Money</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'; // Import ref and onMounted
import { getUserName } from '../services/userService'; // Import the user service
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter(); // Use the router
    const userName = ref(''); // Create a reactive variable for the user's name

    // Fetch the logged-in user's name
    const fetchUserName = async () => {
      try {
        // Check if username is already in localStorage
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
          userName.value = storedUsername;
        } else {
          // Fetch username from the API service if not found in localStorage
          userName.value = await getUserName(); 
        }
      } catch (error) {
        console.error('Error fetching user name:', error);
        userName.value = 'Guest'; // Set a fallback value if there's an error
      }
    };

    // Call fetchUserName when the component is mounted
    onMounted(() => {
      fetchUserName();
    });

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
