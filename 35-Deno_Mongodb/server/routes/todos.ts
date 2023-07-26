import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

interface Todo {
  id: string;
  text: string;
}

let todos: Array<Todo> = [];

router.get("/", (ctx) => {
  ctx.response.body = { todos: todos };
});

router.post("/todo", async (ctx) => {
  const data = await ctx.request.body({ type: "json" }).value;
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: data.text,
  };
  todos.push(newTodo);

  ctx.response.body = {
    message: "Todo Created!",
    todo: newTodo,
  };
});

router.put("/todo/:todoId", async (ctx) => {
  const tid = ctx.params.todoId;
  const data = await ctx.request.body({ type: "json" }).value;
  const todoIndex = todos.findIndex((todoItem) => todoItem.id === tid);
  if (!(todoIndex > -1)) {
    ctx.throw(404, "Todo not Found!");
  }
  todos[todoIndex] = {
    id: todos[todoIndex].id,
    text: data.text,
  };

  ctx.response.body = {
    message: "Todo Updated!",
  };
});

router.delete("/todo/:todoId", (ctx) => {
  const tid = ctx.params.todoId;
  const oldLength = todos.length;
  todos = todos.filter((todo) => todo.id !== tid);
  const newLength = todos.length;

  if (oldLength === newLength) {
    ctx.throw(404, "Todo not Found!");
  }
  ctx.response.body = { message: "Deleted todo" };
});

export default router;
