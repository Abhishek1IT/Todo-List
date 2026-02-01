import { createRouter, createWebHistory } from "vue-router";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import TodoApp from "@/components/TodoApp.vue";

const routes = [
  {
    path: "/",
    redirect: "/register",
  },
  {
    path: "/register",
    component: Register,
  },
  { path: "/login", 
    component: Login 
  },
  {
    path: '/todoApp',
    component: TodoApp,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
