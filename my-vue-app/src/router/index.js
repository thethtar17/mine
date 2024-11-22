import { createRouter, createWebHistory } from 'vue-router';

// Lazy Loading Components
const MainPage = () => import('../views/MainPage.vue');
const ToDoList = () => import('../views/ToDoList.vue');
const Profile = () => import('../views/Profile.vue');
const Settings = () => import('../views/Settings.vue');
const OtherPage = () => import('../views/OtherPage.vue');
const Login = () => import('../views/Login.vue');
const Register = () => import('../views/Register.vue');
const MoneyManger = () => import('../views/MoneyManger.vue');

const routes = [
  { path: '/', name: 'MainPage', component: MainPage, meta: { title: 'Home' } },
  { path: '/login', component: Login, meta: { title: 'Login' } },
  { path: '/register', component: Register, meta: { title: 'Register' } },
  { path: '/todo', name: 'ToDoList', component: ToDoList, meta: { title: 'To-Do List' } },
  { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: false, title: 'Profile' } },
  { path: '/settings', name: 'Settings', component: Settings, meta: { requiresAuth: true, title: 'Settings' } },
  { path: '/other', name: 'OtherPage', component: OtherPage, meta: { title: 'Other Page' } },
  { path: '/money', name: 'MoneyManger', component: MoneyManger, meta: { requiresAuth: false, title: 'Money Manager' } },
  { path: '/:catchAll(.*)', redirect: '/' }, // Redirect undefined routes
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Add Route Guards
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Default Title'; // Set Page Title
  const isAuthenticated = localStorage.getItem('user'); // Example: Simple auth check
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ path: '/login' }); // Redirect to Login if not authenticated
  } else {
    next(); // Proceed
  }
});

export default router;
