import express from "express";
import Todo from "../../models/Todo.js";
import redis from "../../redis.js";

const router = express.Router();

router.get('/', async (req, res) => {
    res.json(await Todo.find({}));
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    if(!id){
        return res.status(400).json({ error: 'Id is required' });
    }
    const todo = await Todo.findById(id);
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
})

router.post('/', async (req, res) => {
    const {title} = req.body;
    if (!title) {
        return res.status(400).json({error: 'Title is required'});
    }

    const newTodo = {
        title,
        completed: false
    };
    const savedTodo = await Todo.create(newTodo);
    const addedTodos = Number(await redis.getAsync('added_todos') || 0);
    await redis.setAsync('added_todos', addedTodos + 1);
    res.status(201).json(savedTodo);
})

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    if (!id) {
        return res.status(400).json({ error: 'Id is required' });
    }

    const todo = await Todo.findById(id);
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }

    const {title, completed} = req.body;
    if (title) {
        todo.title = title;
    }
    if (completed !== undefined) {
        todo.completed = completed;
    }
    await todo.save();
    res.json(todo);
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    if (!id) {
        return res.status(404).json({error: 'Id is required'});
    }

    const todo = await Todo.findByIdAndDelete(id);
    if(!todo){
        return res.status(404).json({error: 'Todo not found'});
    }

    res.status(204).send();
})

export default router;