import express from "express";
import passport from "passport";
import { Book, Review, User } from "../models/index.js";

const router = express.Router();

router.post("/", passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const { rating, text, bookId } = req.body;

        if (!rating || !bookId) {
            return res.status(400).send({
                error: "Send all the required data (rating, bookId)",
            });
        }

        // Check if the user has already reviewed this book
        const existingReview = await Review.findOne({
            where: {
                bookId,
                userId: req.user.id
            }
        });

        if (existingReview) {
            return res.status(400).send({
                error: "You have already reviewed this book",
            });
        }

        const user = await User.findByPk(req.user.id);

        const review = await Review.create({
            rating,
            text,
            bookId,
            userId: req.user.id,
            userDisplayName: user.displayname
        });

        // Update the average rating of the book
        const book = await Book.findByPk(bookId);
        const newRating = (book.rating * book.numberOfReviews + rating) / (book.numberOfReviews + 1);
        await book.update({
            rating: newRating,
            numberOfReviews: book.numberOfReviews + 1
        });

        res.status(201).send(review);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: "Database error while creating review!", //Database connection error
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const { bookId } = req.query;
        if (!bookId) {
            return res.status(400).send({
                error: "Send all the required data (bookId)",
            });
        }

        const reviews = await Review.findAll({
            where: {
                bookId
            }
        });

        res.send(reviews);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: "Database error while getting reviews!", //Database connection error
        });
    }
});

router.put("/", passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const { rating, text, bookId } = req.body;

        if (!rating || !bookId) {
            return res.status(400).send({
                error: "Send all the required data (rating, bookId)",
            });
        }

        const review = await Review.findOne({
            where: {
                bookId,
                userId: req.user.id
            }
        });

        if (!review) {
            return res.status(404).send({
                error: "Review not found",
            });
        }
        
        // Update the average rating of the book
        const book = await Book.findByPk(bookId);
        const newRating = (book.rating * book.numberOfReviews - review.rating + rating) / book.numberOfReviews;
        await book.update({
            rating: newRating
        });

        await review.update({
            rating,
            text
        });

        res.send(review);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: "Database error while updating review!", //Database connection error
        });
    }
});

router.delete("/", passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const { bookId } = req.query;

        if (!bookId) {
            return res.status(400).send({
                error: "Send all the required data (bookId)",
            });
        }

        const review = await Review.findOne({
            where: {
                bookId,
                userId: req.user.id
            }
        });

        if (!review) {
            return res.status(404).send({
                error: "Review not found",
            });
        }
        
        // Update the average rating of the book
        const book = await Book.findByPk(bookId);
        if(book.numberOfReviews === 1) {
            await book.update({
                rating: 0,
                numberOfReviews: 0
            });
        } else {
            const newRating = (book.rating * book.numberOfReviews - review.rating) / (book.numberOfReviews - 1);
            await book.update({
                rating: newRating,
                numberOfReviews: book.numberOfReviews - 1
            });
        }

        await review.destroy();

        res.send(review);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: "Database error while deleting review!", //Database connection error
        });
    }
});

export default router;