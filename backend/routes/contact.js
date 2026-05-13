const express = require('express');
const Contact = require('../models/Contacts');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', async(req, res) => {
    try {
        const contact = await Contact.create(req.body);

        res.status(201).json({
            success: true,
            data: contact
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

router.get('/', protect, async(req, res) => {
    try {
        const contacts = await Contact.find();

        res.json({
            success: true,
            data: contacts
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

module.exports = router;