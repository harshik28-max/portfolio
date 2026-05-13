const express = require('express');
const Skill = require('../models/Skill');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const skills = await Skill.find();

        res.json({
            success: true,
            data: skills
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

router.post('/', protect, async(req, res) => {
    try {
        const skill = await Skill.create(req.body);

        res.status(201).json({
            success: true,
            data: skill
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
});

module.exports = router;