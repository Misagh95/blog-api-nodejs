const express = require('express');

const app = express();
const PORT = process.env.PORT || 3200;

app.use(express.json());

let posts = [
  { id: 1, title: 'Getting Started with Node.js', content: 'Node.js is great for building APIs.' }
];

app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.get('/api/posts/:id', (req, res) => {
  const post = posts.find((item) => item.id === Number(req.params.id));
  if (!post) return res.status(404).json({ message: 'Post not found.' });
  res.json(post);
});

app.post('/api/posts', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required.' });
  }

  const post = { id: Date.now(), title, content };
  posts.push(post);
  res.status(201).json(post);
});

app.delete('/api/posts/:id', (req, res) => {
  const id = Number(req.params.id);
  posts = posts.filter((item) => item.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Blog API running on http://localhost:${PORT}`);
});
