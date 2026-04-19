// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Razorpay = require('razorpay');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/fftournaments');

// User Schema
const userSchema = new mongoose.Schema({
    username: String,
    ffuid: String,
    mobile: { type: String, unique: true },
    password: String, // In production, use bcrypt
    wallet: { type: Number, default: 0 },
    joinedMatches: [Object],
    rewards: [Object]
});

const User = mongoose.model('User', userSchema);

// Razorpay instance
const razorpay = new Razorpay({
    key_id: 'YOUR_KEY_ID',
    key_secret: 'YOUR_KEY_SECRET'
});

// API Routes
app.post('/api/signup', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.json({ success: true, user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/api/login', async (req, res) => {
    const { mobile, password } = req.body;
    const user = await User.findOne({ mobile, password });
    if (user) {
        res.json({ success: true, user });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

app.post('/api/create-order', async (req, res) => {
    const { amount } = req.body;
    const order = await razorpay.orders.create({
        amount: amount * 100,
        currency: 'INR'
    });
    res.json(order);
});

app.listen(3000, () => console.log('Server running on port 3000'));
