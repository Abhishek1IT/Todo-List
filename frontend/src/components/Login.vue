<template>
    <div class="login-container">
        <h2>Login Page</h2>

        <form @submit.prevent="handleLogin">
            <input type="email" v-model="form.email" placeholder="Email.." required />

            <input type="password" v-model="form.password" placeholder="Password.." required />

            <button type="submit">Login</button>
        </form>

        <p>
            Don't have an account?
            <router-link to="/register">Register</router-link>
        </p>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const form = reactive({
    email: "",
    password: "",
});

const handleLogin = async () => {
    try {
        const res = await axios.post("http://localhost:5000/api/user/login", {
            email: form.email,
            password: form.password,
        });

        localStorage.setItem("token", res.data.token);

        alert("Login successful");
        router.push("/todoApp");
    } catch (error) {
        alert(error.response?.data?.message || "Invalid credentials");
    }
};
</script>

<style scoped>
* {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}

.login-container {
    max-width: 400px;
    margin: 12% auto;
    padding: 20px;
    background: rgb(238, 168, 168);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #101010;
}

form {
    display: flex;
    flex-direction: column;
}

input {
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
}

button {
    border-radius: 50px;
    width: 100%;
    padding: 8px;
    background: #4759fa;
    color: rgb(18, 18, 18);
    border: 1px solid #52a0fa;
}

p {
    text-shadow: rgb(245, 74, 176) 0px 0px 1px;
    text-align: center;
    margin-top: 10px;
}
</style>