import express from "express";
import Journal from "../../models/Journal.js";

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const journals = await Journal.find();
        res.json(journals);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch journals' });
    }
})

router.post('/', async (req, res) => {
    const {title, content} = req.body;
    const journal = await Journal.create({ title, content }); 
    res.status(201).json(journal);
})

export default router;