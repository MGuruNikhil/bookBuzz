import express from "express";
import { Book } from "../models/index.js";
import { Op } from "sequelize";

const router = express.Router();

// get all books whose title contains the search query
router.get('/', async (req, res) => {
    try {
        const encodedQuery = req.query.query;
        const query = decodeURIComponent(encodedQuery);
        if (!query) {
            return res.status(400).send({
                error: "Send all the required data (query)",
            });
        }

        const books = await Book.findAll({
            where: {
                title: {
                    [Op.like]: `%${query}%`
                }
            }
        });

        res.send(books);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: "Database error while getting books!", //Database connection error
        });
    }
});

// get all books whose authorName contains the search query
router.get('/author', async (req, res) => {
    try {
        const encodedQuery = req.query.query;
        const query = decodeURIComponent(encodedQuery);
        if (!query) {
            return res.status(400).send({
                error: "Send all the required data (query)",
            });
        }

        const books = await Book.findAll({
            where: {
                authorName: {
                    [Op.like]: `%${query}%`
                }
            }
        });

        res.send(books);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: "Database error while getting books!", //Database connection error
        });
    }
});

// get all books whose isbm contains the search query
router.get('/isbn', async (req, res) => {
    try {
        const encodedQuery = req.query.query;
        const query = decodeURIComponent(encodedQuery);
        if (!query) {
            return res.status(400).send({
                error: "Send all the required data (query)",
            });
        }

        const books = await Book.findAll({
            where: {
                isbn: {
                    [Op.like]: `%${query}%`
                }
            }
        });

        res.send(books);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: "Database error while getting books!", //Database connection error
        });
    }
});

// get all books whose genre contains the search query
router.get('/genre', async (req, res) => {
    try {
        const encodedQuery = req.query.query;
        const query = decodeURIComponent(encodedQuery);
        if (!query) {
            return res.status(400).send({
                error: "Send all the required data (query)",
            });
        }

        const books = await Book.findAll({
            where: {
                genre: {
                    [Op.like]: `%${query}%`
                }
            }
        });

        res.send(books);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: "Database error while getting books!", //Database connection error
        });
    }
});

export default router;