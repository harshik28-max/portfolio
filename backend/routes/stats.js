const express = require('express');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Contact = require('../models/Contacts');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, async(req, res) => {
    try {
        const totalProjects = await Project.countDocuments();
        const totalSkills = await Skill.countDocuments();
        const totalMessages = await Contact.countDocuments();

        res.json({
            success: true,
            data: {
                totalProjects,
                totalSkills,
                totalMessages
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

module.exports = router;