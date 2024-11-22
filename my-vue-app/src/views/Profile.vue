<template>
  <div>
    <h1>Profile Page</h1>
    <h2>Welcome, {{ userName }}!</h2>
    <p><strong>Role:</strong> {{ userRole }}</p>

    <p><strong>User ID:</strong> {{ userId }}</p> <!-- Display User ID -->
    <button @click="goToToDoList">Go to To-Do List</button>
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
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    const router = useRouter(); // Use the router
    const userName = ref(''); // Create a reactive variable for the user's name
    const userRole = ref(''); // Create a reactive variable for the user's role
    const userEmail = ref(''); // Create a reactive variable for the user's email
    const userId = ref(''); // Create a reactive variable for the user's ID

    // Fetch the logged-in user's profile details
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get("http://localhost:3000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
          },
        });

        userName.value = response.data.username; // Update the username
        userRole.value = response.data.role; // Update the role
        userEmail.value = response.data.email; // Update the email
        userId.value = response.data.id; // Update the user ID
      } catch (error) {
        console.error('Error fetching profile:', error);
        userName.value = 'Guest'; // Fallback value
        userRole.value = 'Unknown';
        userEmail.value = 'Not available';
        userId.value = 'N/A'; // Fallback value for user ID
      }
    };

    // Call fetchUserProfile when the component is mounted
    onMounted(() => {
      fetchUserProfile();
    });

    // Handle Logout: clear localStorage and redirect to login page
    const handleLogout = () => {
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      localStorage.removeItem('token'); // If token is stored

      router.push('/login');
    };

    // Routing methods for navigation
    const goToToDoList = () => {
      router.push('/todo');
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
      userRole,
      userEmail,
      userId, // Return userId so it can be used in the template
      handleLogout,
      goToToDoList,
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
