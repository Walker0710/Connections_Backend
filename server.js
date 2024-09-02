const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const gameRoutes = require('./routes/gameRoutes');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db');

// public ip -> 4.240.104.73

const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});

const host = "4.240.104.73";
const port = 8080;



dotenv.config();

const https = require('https')
const app = express();

app.use(limiter);

// const port = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(cors({
    origin: 'https://synapses123.netlify.app',
    methods: 'GET,POST',
    credentials: true,
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/user', userRoutes);

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

// https.createServer(app).listen(443);
