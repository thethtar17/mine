<template>
    <div>
      <h1>Main Page</h1>
      <button @click="goToToDoList">Go to To-Do List</button>
      <button @click="goToProfile">Go to Profile</button>
      <button @click="goToSettings">Go to Settings</button>
      <button @click="goToOther">Go to Other</button>
      <button @click="goToMoney">Go to Money</button>
    </div>
  </template>
  
  <script>
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const router = useRouter();
      const goToToDoList = () => {
        router.push('/todo');
      };
      const goToProfile = () => {
        router.push('/profile');
      };
      const goToSettings = () => {
        router.push('/settings');
      };
      const  goToOther = () => {
        router.push('/other');
      };
      const  goToMoney = () => {
        router.push('/money');
      };
      return {
        goToToDoList,
        goToProfile,
        goToSettings,
        goToOther,
        goToMoney,
      };
    },
  };
  </script>
  