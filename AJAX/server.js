const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'post.html'));
});

app.post('/submit', (req, res) => {
    const { name, email } = req.body;
    req.session.name = name;
    req.session.email = email;
    res.redirect('welcome.html');
});

app.get('/session-data', (req, res) => {
    res.json({
        name: req.session.name || 'Guest',
        email: req.session.email || 'unknown'
    });
});

app.use(express.static(path.join(__dirname)));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
