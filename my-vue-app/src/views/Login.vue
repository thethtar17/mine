<template>
    <div class="login-container">
      <div class="login-box">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" v-model="username" id="username" required />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" v-model="password" id="password" required />
          </div>
          <button type="submit" class="btn-login">Login</button>
        </form>
        <div class="register-link">
          <button @click="goToRegister" class="btn-register">Go to Register</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { useRouter } from "vue-router";
  
  export default {
    setup() {
      const router = useRouter();
      const goToRegister = () => {
        router.push('/register');
      };
      return {
        goToRegister
            
          };
    
    
    },

    data() {
      return {
        username: "",
        password: "",
      };
    },
    methods: {
      async handleLogin() {
        try {
          const response = await axios.post("http://localhost:3000/api/auth/login", {
            username: this.username,
            password: this.password,
          });
  
          // Store the token in localStorage for future requests
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("username", this.username); // Save the username

          // Optionally store it in Vuex or redirect user after login
          this.$router.push("/"); // Redirect to homepage or dashboard after login
        } catch (error) {
          if (error.response) {
            alert("Error logging in: " + error.response.data.message);
          } else {
            alert("Error logging in: " + error.message);
          }
        }
      },
    },
  };
  </script>
<style scoped>
/* Overall container styling */


/* Login box styling */
.login-box {
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

input {
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: all 0.3s ease;
}

input:focus {
  border-color: #ff7e5f;
  box-shadow: 0px 0px 5px rgba(255, 126, 95, 0.5);
  outline: none;
}

/* Button styling */
.btn-login {
  background: #ff7e5f;
  color: #fff;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-login:hover {
  background:  #fb7349;
}
</style>
