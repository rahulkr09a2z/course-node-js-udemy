import { Router } from "https://deno.land/x/oak/mod.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.31.2/mod.ts";

import { getDb } from "../helper/db_client.ts";

const collectionName = "tasks";
const router = new Router();

interface Todo {
  id?: string;
  text: string;
}

router.get("/", async (ctx) => {
  const todos = await getDb().collection(collectionName).find().toArray();
  const transformedTodos = todos.map(
    (todo: { _id: ObjectId; text: string }) => {
      return { id: todo._id.toString(), text: todo.text };
    }
  );
  ctx.response.body = { todos: transformedTodos };
});

router.post("/todo", async (ctx) => {
  const data = await ctx.request.body({ type: "json" }).value;
  const newTodo: Todo = {
    text: data.text,
  };
  const id = await getDb().collection(collectionName).insertOne(newTodo);

  newTodo.id = id.$oid;

  ctx.response.body = {
    message: "Todo Created!",
    todo: newTodo,
  };
});

router.put("/todo/:todoId", async (ctx) => {
  const tid = ctx.params.todoId!;
  const data = await ctx.request.body({ type: "json" }).value;
  await getDb()
    .collection(collectionName)
    .updateOne(
      { _id: new ObjectId(tid) },
      {
        $set: {
          text: data.text,
        },
      }
    );

  ctx.response.body = {
    message: "Todo Updated!",
  };
});

router.delete("/todo/:todoId", async (ctx) => {
  const tid = ctx.params.todoId!;

  await getDb()
    .collection(collectionName)
    .deleteOne({ _id: new ObjectId(tid) });
  ctx.response.body = { message: "Deleted todo" };
});

export default router;
