import express from "express";
import { Book } from "../models/index.js";
import passport from "passport";

const router = express.Router();

router.post("/", passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const { title, authorName, isbn, genre, coverImageUrl } = req.body;

        if (!title || !authorName || !isbn || !genre || !coverImageUrl) {
            return res.status(400).send({
                error: "Send all the required data (title, authorName, isbn, genre, coverImageUrl)",
            });
        }

        const book = await Book.create({
            title,
            authorName,
            isbn,
            genre,
            coverImageUrl,
            userId: req.user.id
        });
        res.status(201).send(book);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: "Database error while creating book!", //Database connection error
        });
    }
});

// router.get("/", passport.authenticate('jwt', { session: false }), async (req, res) => {
//     try {
//         const books = await Book.findAll();
//         res.send(books);
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             error: "Database error while getting books!", //Database connection error
//         });
//     }
// });

// get a book whose id is passed as a parameter
router.get("/:id", async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) {
            return res.status(404).send({
                error: "Book not found",
            });
        }
        res.send(book);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: "Database error while getting book!", //Database connection error
        });
    }
});

// update the book whose id is passed as a parameter
router.put("/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const { id } = req.params;
        const { title, authorName, isbn, genre, coverImageUrl } = req.body;

        if (!title || !authorName || !isbn || !genre || !coverImageUrl) {
            return res.status(400).send({
                error: "Send all the required data (title, authorName, isbn, genre, coverImageUrl)",
            });
        }

        const book = await Book.findByPk(id);
        if (!book) {
            return res.status(404).send({
                error: "Book not found",
            });
        }

        book.title = title;
        book.authorName = authorName;
        book.isbn = isbn;
        book.genre = genre;
        book.coverImageUrl = coverImageUrl;

        await book.save();
        res.send(book);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: "Database error while updating book!", //Database connection error
        });
    }
});

// delete the book whose id is passed as a parameter
router.delete("/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) {
            return res.status(404).send({
                error: "Book not found",
            });
        }
        await book.destroy();
        res.send({
            message: "Book deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: "Database error while deleting book!", //Database connection error
        });
    }
});

export default router;