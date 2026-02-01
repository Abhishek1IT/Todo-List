require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const TodoRoutes = require('./routes/TodoRoutes');
const authRouter = require('./routes/authRoutes');

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = "mongodb://localhost:27017/TODO";

app.use(express.json());
app.use(cors());

app.use('/api/todos', TodoRoutes);
app.use('/api/user', authRouter);

app.get('/', (req, res) => {
    res.send('Backend API working');
});

mongoose.connect(MONGO_URI)
.then(() => {
    app.listen(5000, () => {
        console.log('Server running on port 5000');
    });
    console.log('MongoDB connected successfully');
})
.catch((err) => {
    console.log("Connection Error:", err.message);
});
