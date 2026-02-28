import cors from "cors";
import express from "express";
import redis from "./redis.js";

import journalsRouter from "./routes/journals/index.js";
import todosRouter from "./routes/todos/index.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get('/statistics', async (req, res) => {
    const addedTodos = await redis.getAsync('added_todos') || 0;
    res.json({
        added_todos: Number(addedTodos)
    });
})

app.use('/journals', journalsRouter)
app.use('/todos', todosRouter);

export default app;