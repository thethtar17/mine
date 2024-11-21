import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../views/MainPage.vue';
import ToDoList from '../views/ToDoList.vue';
import Profile from '../views/Profile.vue';
import Settings from '../views/Settings.vue';
import OtherPage from '../views/OtherPage.vue';
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
const routes = [
  { path: '/', name: 'MainPage', component: MainPage },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: '/todo', name: 'ToDoList', component: ToDoList },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/settings', name: 'Settings', component: Settings },
  {path: '/other', name:'OtherPage' , component: OtherPage},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
