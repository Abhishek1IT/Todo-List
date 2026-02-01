<template>
    <div class="register-container">
        <h2>Create Account</h2>

        <form @submit.prevent="handleRegister">
            <input type="text" v-model="form.name" placeholder="Full Name" required />

            <input type="email" v-model="form.email" placeholder="Email" required />

            <input type="password" v-model="form.password" placeholder="Password" required />

            <input type="password" v-model="form.confirmPassword" placeholder="Confirm Password" required />

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
import axios from "axios";
import { useRouter } from "vue-router";


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
        const res = await axios.post("http://localhost:5000/api/user/register", {
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
