/* seed.js — Populate DB with sample data */
require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');
const Skill = require('./models/Skill');
const User = require('./models/User');

const projects = [{
        title: 'E-Commerce Platform',
        description: 'Full-featured e-commerce app with cart, authentication, payments via Stripe, and admin dashboard.',
        category: 'fullstack',
        tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        githubUrl: 'https://github.com/yourusername/ecommerce',
        liveUrl: 'https://yourproject.netlify.app',
        featured: true,
        order: 1,
    },
    {
        title: 'Task Management App',
        description: 'Kanban-style project tracker with real-time collaboration via WebSockets and drag-and-drop.',
        category: 'fullstack',
        tags: ['React', 'Express', 'PostgreSQL', 'Socket.io'],
        githubUrl: 'https://github.com/yourusername/taskapp',
        liveUrl: 'https://taskapp.vercel.app',
        featured: true,
        order: 2,
    },
    {
        title: 'Weather Dashboard',
        description: 'Animated weather dashboard pulling live data from OpenWeatherMap API with 7-day forecast.',
        category: 'frontend',
        tags: ['JavaScript', 'CSS3', 'API', 'Chart.js'],
        githubUrl: 'https://github.com/yourusername/weather',
        liveUrl: 'https://weather.netlify.app',
        featured: false,
        order: 3,
    },
    {
        title: 'REST API & Auth System',
        description: 'Scalable REST API with JWT auth, role-based access control, rate limiting, and Swagger docs.',
        category: 'backend',
        tags: ['Node.js', 'JWT', 'MySQL', 'Swagger'],
        githubUrl: 'https://github.com/yourusername/restapi',
        liveUrl: '#',
        featured: false,
        order: 4,
    },
    {
        title: 'AI Chat Interface',
        description: 'Sleek chat UI integrated with OpenAI API. Includes conversation history and code highlighting.',
        category: 'frontend',
        tags: ['React', 'OpenAI API', 'Tailwind', 'Vite'],
        githubUrl: 'https://github.com/yourusername/aichat',
        liveUrl: 'https://aichat.vercel.app',
        featured: false,
        order: 5,
    },
    {
        title: 'Blog CMS Platform',
        description: 'Custom blog engine with rich-text editor, image uploads to AWS S3, and analytics dashboard.',
        category: 'fullstack',
        tags: ['Django', 'React', 'PostgreSQL', 'AWS S3'],
        githubUrl: 'https://github.com/yourusername/blogcms',
        liveUrl: 'https://blog.example.com',
        featured: false,
        order: 6,
    },
];

const skills = [
    // Frontend
    { name: 'HTML5 / CSS3', level: 95, category: 'frontend', order: 1 },
    { name: 'JavaScript (ES6+)', level: 90, category: 'frontend', order: 2 },
    { name: 'React.js', level: 88, category: 'frontend', order: 3 },
    { name: 'Tailwind CSS', level: 85, category: 'frontend', order: 4 },
    // Backend
    { name: 'Node.js / Express', level: 85, category: 'backend', order: 1 },
    { name: 'Python / Django', level: 75, category: 'backend', order: 2 },
    { name: 'REST APIs', level: 90, category: 'backend', order: 3 },
    { name: 'GraphQL', level: 65, category: 'backend', order: 4 },
    // Database
    { name: 'MongoDB', level: 85, category: 'database', order: 1 },
    { name: 'PostgreSQL', level: 80, category: 'database', order: 2 },
    { name: 'MySQL', level: 75, category: 'database', order: 3 },
    { name: 'Redis', level: 60, category: 'database', order: 4 },
    // DevOps
    { name: 'Git / GitHub', level: 92, category: 'devops', order: 1 },
    { name: 'Docker', level: 70, category: 'devops', order: 2 },
    { name: 'Vercel / Netlify', level: 88, category: 'devops', order: 3 },
    { name: 'Linux / Bash', level: 72, category: 'devops', order: 4 },
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await Promise.all([Project.deleteMany(), Skill.deleteMany()]);
        console.log('🗑️  Cleared old data');

        // Insert fresh data
        await Project.insertMany(projects);
        console.log(`✅ Seeded ${projects.length} projects`);

        await Skill.insertMany(skills);
        console.log(`✅ Seeded ${skills.length} skills`);

        // Create admin user if none exists
        const adminExists = await User.countDocuments();
        if (!adminExists) {
            await User.create({
                email: process.env.ADMIN_EMAIL || 'admin@example.com',
                password: process.env.ADMIN_PASSWORD || 'Admin@123',
            });
            console.log(`✅ Admin user created: ${process.env.ADMIN_EMAIL || 'admin@example.com'}`);
        } else {
            console.log('ℹ️  Admin already exists — skipped');
        }

        console.log('\n🎉 Database seeded successfully!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seeding failed:', err.message);
        process.exit(1);
    }
}

seed();