import express from "express";
import passport from "passport";
import { compareSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

const router = express.Router();

router.post("/register", async function (req, res) {
    const { email, password, displayname } = req.body;

    if (!email || !password || !displayname) {
        return res.status(400).send({
            error: "Send all the required data (email, password, displayname)",
        });
    }

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                error: "Email already there, No need to register again.",
            });
        } else {
            const user = await User.create({
                displayname,
                email,
                password: hashSync(password, 10)
            });
            res.status(200).send({ message: 'user created successfully' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error while registering user!", //Database connection error
        });
    }
});

router.post("/login", async function (req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({
            error: "Send all the required data (email, password)",
        });
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({
                error: "User is not registered, Sign Up first",
            });
        } else {
            if (!compareSync(password, user.password)) {
                return res.status(401).send({
                    message: "Incorrect password"
                });
            }
            const token = jwt.sign({ email: user.email }, process.env.SECRET, { expiresIn: "10d" });
            return res.status(200).send({
                message: "Successfully logged in",
                token: "Bearer " + token
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error while logging in!", //Database connection error
        });
    }
});

router.get("/user", passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.status(200).send({
        message: "u are one of us",
        user: {
            id: req.user.id,
            email: req.user.email,
            displayname: req.user.displayname
        }
    });
});

export default router;