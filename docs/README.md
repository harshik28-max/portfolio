# Personal Portfolio — README

## Files
```
portfolio/
├── index.html    ← Main HTML (all sections)
├── style.css     ← All styles + responsive
├── script.js     ← Interactivity & animations
└── README.md     ← This file
```

## How to Customize

### 1. Change Your Name & Info
In `index.html`, replace:
- `Alex Chen` → your name
- `AC` (avatar initials) → your initials
- `alex@example.com` → your email
- Location, GitHub, LinkedIn, Twitter links

### 2. Change Your Projects
Each project card follows this pattern:
```html
<div class="project-card reveal" data-category="fullstack">
  <div class="project-num">01</div>
  <div class="project-header">
    <h3>Your Project Name</h3>
    <div class="project-links">
      <a href="YOUR_GITHUB_LINK">...</a>
      <a href="YOUR_LIVE_LINK">...</a>
    </div>
  </div>
  <p>Project description here.</p>
  <div class="project-tags">
    <span>React</span><span>Node.js</span>
  </div>
</div>
```
`data-category` can be: `fullstack`, `frontend`, or `backend`

### 3. Add Your Photo
Replace the SVG placeholder in the About section:
```html
<div class="image-placeholder">
  <img src="your-photo.jpg" alt="Your Name" style="width:100%;height:100%;object-fit:cover;">
</div>
```

### 4. Skill Bar Values
In `index.html`, find `data-w="95"` on each `.bar-fill` element and change the number (0–100) to reflect your actual skill level.

### 5. Change Colors
In `style.css`, edit the `:root` variables:
```css
:root {
  --accent: #e8ff47;     /* Main accent (neon yellow) */
  --accent2: #47ffc8;    /* Secondary accent (teal) */
  --bg: #0a0a0a;         /* Background */
  --text: #f0ede8;       /* Text color */
}
```

### 6. Connect Contact Form to Real Backend
In `script.js`, replace the `setTimeout` in the form handler with a real fetch:
```javascript
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, subject, message })
});
```
Or use EmailJS (free): https://www.emailjs.com

## Deploy to Netlify (Free, Easiest)
1. Go to https://netlify.com
2. Drag and drop your portfolio folder
3. Done! You get a live URL instantly.

## Deploy to Vercel
1. Install: `npm i -g vercel`
2. In the portfolio folder: `vercel`
3. Follow the prompts.

## Deploy to GitHub Pages
1. Push to a GitHub repo
2. Go to Settings → Pages → Source: main branch
3. Your site is live at `https://yourusername.github.io/repo-name`

## Add a Backend (Node.js + Express)
For contact form, project database, etc.:
```
backend/
├── server.js        ← Express app entry
├── routes/
│   ├── contact.js   ← POST /api/contact → sends email
│   └── projects.js  ← GET /api/projects → from DB
├── models/
│   └── Project.js   ← MongoDB/Mongoose schema
└── .env             ← EMAIL_USER, EMAIL_PASS, MONGO_URI
```

## Tech Stack Used
- **HTML5** — Semantic structure
- **CSS3** — Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript** — IntersectionObserver, DOM manipulation
- **Google Fonts** — Syne (display) + DM Mono (mono)
- No frameworks, no build tools — just open index.html!
