import express from "express";
import cors from "cors";
import passport from "passport";
import 'dotenv/config';
import authRoute from "./routes/authRoute.js";
import bookRoute from "./routes/bookRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import searchRoute from "./routes/searchRoute.js";
import recommendRoute from "./routes/recommendRoute.js";
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { User } from "./models/index.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// CORS Configuration for deployment
app.use(cors({
    origin: 'https://bookbuzz-nik.vercel.app',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

//localhost
// app.use(cors());

app.use(passport.initialize());

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
        const user = await User.findOne({ where: { email: jwt_payload.email } });
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
app.use('/books', bookRoute);
app.use('/reviews', reviewRoute);
app.use('/search', searchRoute);
app.use('/recommend', recommendRoute);

export default app;