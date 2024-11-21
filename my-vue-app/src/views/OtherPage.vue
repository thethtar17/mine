<template>
    <div>
      <h1>Other Page</h1>
      <button @click="goBack">Go Back</button>
    </div>
  </template>
  
  <script>
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const router = useRouter();
      const goBack = () => {
        router.push('/');
      };
  
      return { goBack };
    },
  };
  </script>
  