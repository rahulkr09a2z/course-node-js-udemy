import { Router } from "express";

import { Todo } from "../models/todo";

type RequestBody = { text: string };
type RequestParams = { todoId: string };

let todos: Array<Todo> = [];

const router = Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ todos: todos });
});

router.post("/todo", (req, res, next) => {
  const body = req.body as RequestBody;
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: body.text,
  };
  todos.push(newTodo);
  res.status(201).json({ message: "AddedTodo", todo: newTodo, todos: todos });
});

router.put("/todo/:todoId", (req, res, next) => {
  const params = req.params as RequestParams;
  const tid = params.todoId;
  const body = req.body as RequestBody;
  const todoIndex = todos.findIndex((todoItem) => todoItem.id === tid);
  if (!(todoIndex > -1)) {
    return res
      .status(404)
      .json({ message: "Could not find todo for this id." });
  }
  todos[todoIndex] = {
    id: todos[todoIndex].id,
    text: body.text,
  };
  res.status(200).json({ message: "Updated Todo", todos: todos });
});

router.delete("/todo/:todoId", (req, res, next) => {
  const params = req.params as RequestParams;
  const tid = params.todoId;
  todos = todos.filter((todoItem) => todoItem.id !== tid);
  res.status(200).json({ message: "Deleted todo", todos: todos });
});

export default router;
