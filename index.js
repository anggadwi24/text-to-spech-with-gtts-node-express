const express = require('express');
const ttsRoutes = require('./routes/ttsRoutes');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/tts', ttsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use('/audio', express.static(path.join(__dirname, 'audio')));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
