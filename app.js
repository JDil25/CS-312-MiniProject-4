const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3001;

// Simulated in-memory data for users (you can replace this with a database later)
let users = [];
let posts = [];

// Middleware to parse JSON data
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve static files from React frontend build folder
app.use(express.static('client/build'));

// Routes

// Simulate user sign-up
app.post('/api/signup', (req, res) => {
    const { username, password } = req.body;
    
    // Check if the username already exists
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ error: 'Username already exists' });
    }
    
    // Create new user (Note: In a real app, passwords should be hashed)
    const newUser = { username, password }; 
    users.push(newUser);
    res.status(201).json({ message: 'User created successfully' });
});

// Simulate user sign-in (simple authentication)
app.post('/api/signin', (req, res) => {
    const { username, password } = req.body;
    
    // Validate user credentials
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    res.status(200).json({ message: 'Signed in successfully', username: user.username });
});

// GET route to fetch all posts
app.get('/api/posts', (req, res) => {
    res.json(posts); // Send posts as JSON data
});

// POST route to create a new blog post
app.post('/api/create', (req, res) => {
    const { title, content, name } = req.body;
    const newPost = {
        id: posts.length + 1,
        title,
        content,
        name,
        date: new Date().toLocaleString()
    };
    posts.push(newPost);
    res.json(newPost); // Send the created post as a response
});

// GET route to fetch a single post by ID
app.get('/api/posts/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    if (post) {
        res.json(post); // Send the post as JSON
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
});

// PUT route to edit an existing blog post
app.put('/api/edit/:id', (req, res) => {
    const { title, content, name } = req.body;
    const postIndex = posts.findIndex(p => p.id == req.params.id);
    
    if (postIndex !== -1) {
        posts[postIndex] = { ...posts[postIndex], title, content, name };
        res.json(posts[postIndex]); // Send the updated post as JSON
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
});

// DELETE route to delete a blog post
app.delete('/api/delete/:id', (req, res) => {
    const postIndex = posts.findIndex(p => p.id == req.params.id);
    
    if (postIndex !== -1) {
        const deletedPost = posts.splice(postIndex, 1);
        res.json(deletedPost); // Send the deleted post as a response
    } else {
        res.status(404).json({ error: 'Post not found' });
    }
});

// Serve React frontend
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});