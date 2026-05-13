require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const projectRoutes = require('./routes/projects');
const contactRoutes = require('./routes/contact');
const authRoutes = require('./routes/auth');
const skillRoutes = require('./routes/skills');
const statsRoutes = require('./routes/stats');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
    helmet({
        crossOriginResourcePolicy: {
            policy: 'cross-origin'
        }
    })
);

app.use(
    cors({
        origin: '*',
        credentials: true
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: 'Too many requests, try again later'
    }
});

app.use('/api', limiter);

app.use('/api/projects', projectsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/stats', statsRoutes);

app.get('/', (req, res) => {
    res.send('Portfolio Backend Running');
});

app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Portfolio API running successfully',
        time: new Date().toISOString()
    });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

app.use((err, req, res, next) => {
    res.status(500).json({
        success: false,
        message: err.message || 'Server Error'
    });
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err.message);
    });

module.exports = app;
