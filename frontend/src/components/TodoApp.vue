<template>
    <div class="page-wrapper">
        <div class="todo-container">
            <h2>Write Tasks</h2>
            <form @submit.prevent="addtask" class="add-btn">
                <input type="text" v-model="newtask" placeholder="Enter task.." required />

                <button type="submit"> Add Task </button>
            </form>

            <ul>
                <li v-for="task in todos" :key="task._id">
                    {{ task.task }}
                    <button @click="edittask(task._id)" v-if="!task.completed" class="edit-btn">
                        Edit
                    </button>
                    <button @click="deletetask(task._id)" class="delete-btn">
                        Delete
                    </button>
                </li>
            </ul>
            <button class="logout-btn" @click="logout">Logout</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const todos = ref([]);
const newtask = ref("");

const fetchTasks = async () => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/todos", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        todos.value = res.data;
    } catch (error) {
        alert("Error fetching tasks");
    }
};

const addtask = async () => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.post("http://localhost:5000/api/todos", {
            task: newtask.value,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        todos.value.push(res.data);
        newtask.value = "";
    } catch (error) {
        alert("Error adding task");
    }
};

const edittask = async (id) => {
    const updatedText = prompt("Edit your task");

    if (!updatedText) return;

    try {
        const token = localStorage.getItem("token");
        const res = await axios.put(
            `http://localhost:5000/api/todos/${id}`,
            { task: updatedText },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const index = todos.value.findIndex(t => t._id === id);
        todos.value[index] = res.data;
    } catch (error) {
        alert("Error editing task");
    }
};

const deletetask = async (id) => {
    try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/todos/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        todos.value = todos.value.filter((task) => task._id !== id);
        fetchTasks();
    } catch (error) {
        alert("Error deleting task");
    }
};

const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
};
onMounted(() => {
    fetchTasks();
});

</script>

<style scoped>
.page-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #e36868;
}

.todo-container {
    background: rgb(194, 242, 90);
    padding: 20px;
    border-radius: 10px;
    width: 500px;
}

.todo-container h2 {
    text-align: center;
    margin-bottom: 20px;
}

.todo-container form {
    display: flex;
    margin-bottom: 20px;
}

.todo-container input {
    flex: 1;
    padding: 8px;
    border: 1px solid #0f0e0e;
    border-radius: 4px;
}

.todo-container .add-btn button {
    padding: 8px 12px;
    margin-left: 10px;
    border: none;
    background-color: #1074ee;
    color: rgb(7, 7, 7);
    border-radius: 4px;
    cursor: pointer;
}

.todo-container ul {
    list-style-type: none;
    padding: 0;
}

.todo-container li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid #fac0c0;
}

.todo-container .edit-btn {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
}

.todo-container .delete-btn {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
}

.logout-btn { 
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 14px;
    background: #de0f0f;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

.logout-btn:hover {
    opacity: 0.9;
}
</style>