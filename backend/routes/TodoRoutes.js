const express = require('express');
const router = express.Router();

const protect = require('../middelwares/authMiddleware');
const TodoController = require('../controllers/TodoController'); 

router.get("/", protect, TodoController.getTodos);
router.post("/", protect, TodoController.createTodo);
router.put("/:id",protect, TodoController.updateTodo);
router.delete("/:id",protect, TodoController.deleteTodo);

module.exports = router;