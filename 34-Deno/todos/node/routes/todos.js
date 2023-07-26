const express = require("express");

const router = express.Router();

let todos = [];

router.get("/", (req, res, next) => {
  res.status(200).json({ todos: todos });
});

router.post("/todo", (req, res, next) => {
  const newTodo = {
    id: new Date().toISOString(),
    text: req.body.text,
  };
  todos.push(newTodo);
  res
    .status(201)
    .json({ message: "Todo Created!", todo: newTodo, todos: todos });
});

router.put("/todo/:todoId", (req, res, next) => {
  const tid = req.params.todoId;
  const todoIndex = todos.findIndex((todo) => todo.id === tid);
  console.log("zzz 1", todoIndex);
  if (!(todoIndex > -1)) {
    return res.status(404).json({ message: "Todo Not Found" });
  }
  todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
  res
    .status(201)
    .json({ message: "Todo Updated!", todo: todos[todoIndex], todos: todos });
});

router.delete("/todo/:todoId", (req, res, next) => {
  const tid = req.params.todoId;
  const todoIndex = todos.findIndex((todo) => todo.id === tid);
  if (!(todoIndex > -1)) {
    return res.status(404).json({ message: "Todo Not Found" });
  }
  todos = todos.filter((todo) => todo.id !== tid);
  res.status(201).json({ message: "Todo Deleted!", todoId: tid });
});

module.exports = router;
