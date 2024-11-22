import express from "express";
import { Book } from "../models/index.js";

const router = express.Router();

// get all books in discending order of their average rating
router.get('/toprated', async (req, res) => {
    try {
        const books = await Book.findAll({
            order: [
                ['rating', 'DESC']
            ]
        });
        res.send(books);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: "Database error while getting books!", //Database connection error
        });
    }
});

// get all books in discending order of updatedAt timestamp
router.get('/recent', async (req, res) => {
    try {
        const books = await Book.findAll({
            order: [
                ['updatedAt', 'DESC']
            ]
        });
        res.send(books);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: "Database error while getting books!", //Database connection error
        });
    }
});

// get a list of genres of all books
router.get('/genres', async (req, res) => {
    try {
        const genres = await Book.findAll({
            attributes: ['genre'],
            group: ['genre']
        });
        res.send(genres);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: "Database error while getting genres!", //Database connection error
        });
    }
});

export default router;