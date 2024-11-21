<template>
  <div class="register-container">
    <div class="register-box">
      <h2>Register</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" v-model="username" id="username" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" v-model="password" id="password" required />
        </div>
        <div class="form-group">
          <label for="role">Role</label>
          <select v-model="role" id="role">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" class="btn-register">Register</button>
      </form>
    </div>
  </div>
</template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        username: "",
        password: "",
        role: "user",
      };
    },
    methods: {
      async handleRegister() {
        try {
          const response = await axios.post("http://localhost:3000/api/auth/register", {
            username: this.username,
            password: this.password,
            role: this.role,
          });
          this.$router.push("/login"); // Redirect to login page
        } catch (error) {
          // Check if the error has a response from the backend
          if (error.response) {
            alert("Error registering: " + error.response.data.message); // Access the error message from backend
          } else {
            alert("Error registering: " + error.message); // Fallback to generic error message
          }
        }
      }
    }
  };
  </script>
<style scoped>
/* Overall container styling */

/* Register box styling */
.register-box {
  background: #ffffff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 320px;
}

/* Form group styling */
.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

input, select {
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: all 0.3s ease;
}

input:focus, select:focus {
  border-color: #ff7e5f;
  box-shadow: 0px 0px 5px rgba(255, 126, 95, 0.5);
  outline: none;
}

/* Button styling */
.btn-register {
  background: #ff7e5f;
  color: #fff;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-register:hover {
  background:  #fb7349;
}
</style>