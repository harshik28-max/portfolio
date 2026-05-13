const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

const signToken = (id) => {
    return jwt.sign({ id },
        process.env.JWT_SECRET, {
            expiresIn: '7d'
        }
    );
};

router.post('/register', async(req, res) => {
    try {
        const user = await User.create(req.body);

        const token = signToken(user._id);

        res.status(201).json({
            success: true,
            token
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
});

router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const token = signToken(user._id);

        res.json({
            success: true,
            token
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

router.get('/me', protect, async(req, res) => {
    res.json({
        success: true,
        data: req.user
    });
});

module.exports = router;