<template>
  <div class="register-container">
    <h2>Create Account</h2>

    <form @submit.prevent="handleRegister">
      <input
        type="text"
        v-model="form.name"
        placeholder="Full Name"
        autocomplete="name"
        required
      />

      <input
        type="email"
        v-model="form.email"
        placeholder="Email"
        autocomplete="email"
        required
      />

      <input
        type="password"
        v-model="form.password"
        placeholder="Password"
        autocomplete="new-password"
        required
      />

      <input
        type="password"
        v-model="form.confirmPassword"
        placeholder="Confirm Password"
        autocomplete="new-password"
        required
      />

      <button type="submit">Register</button>
    </form>

    <p>
      Already have an account?
      <router-link to="/login">Login</router-link>
    </p>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import api from "@/api/api";

const router = useRouter();
const form = reactive({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
});

const handleRegister = async () => {
    if (form.password !== form.confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    try {
        const res = await api.post("/user/register", {
            name: form.name,
            email: form.email,
            password: form.password,
        });

        alert("Registration successful");
        console.log(res.data);
        router.push("/login");
    } catch (error) {
        alert(error.response?.data?.message || "Registration failed");
    }
};
</script>

<style scoped>
* {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
}

.register-container {
    background: #0fd9e0;
    width: 350px;
    margin: 80px auto;
    padding: 20px;
    box-shadow: 0 10px 25px rgba(21, 19, 19, 0.3);
    border-radius: 8px;
}

h2 {

    text-align: center;
    margin-bottom: 20px;
}

input {
    border-radius: 15px;
    width: 100%;
    padding: 10px;
    margin-bottom: 12px;
}

button {
    border-radius: 50px;
    width: 100%;
    padding: 8px;
    background: #4759fa;
    color: rgb(18, 18, 18);
    border: 1px solid #52a0fa;
}

button:hover {
    background: #3899f9;
}

p {
    text-shadow: rgb(245, 74, 176) 0px 0px 1px;
    text-align: center;
    margin-top: 10px;
}
</style>
