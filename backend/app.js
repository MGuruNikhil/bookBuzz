import express from "express";
import cors from "cors";
import passport from "passport";
import 'dotenv/config';
import authRoute from "./routes/authRoute.js";
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import client from "./database.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// CORS Configuration for deployment
// app.use(cors({
//     origin: 'https://.vercel.app',
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
// }));

//localhost
app.use(cors());

app.use(passport.initialize());

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
        const data = await client.query(`SELECT * FROM users WHERE email= $1;`, [jwt_payload.email]);
        const user = data.rows[0];
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
}));


app.get('/', function (req, res) {
    res.send({
        message: "working"
    });
});

app.use('/auth', authRoute);

export default app;