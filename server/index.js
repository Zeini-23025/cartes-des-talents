const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./db'); // config sequelize

const app = express();

// CORS CORRECT CONFIGURATION

// Header CSP pour autoriser favicon et images
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self' data: https:;");
  next();
});

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://cartes-des-talents.onrender.com",
    "https://cartes-des-talents-htsl.vercel.app"
  ],
  credentials: true
}));

app.use(bodyParser.json());

// Importer routes
const path = require('path');

// Root route for health check and to avoid 404 at /
app.get('/', (req, res) => {
  res.send('API is running');
});

// Serve favicon.ico if present, else return 204
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'favicon.ico'), err => {
    if (err) {
      res.status(204).end(); // No Content if not found
    }
  });
});
const userRoutes = require('./routes/userRoutes');
const talentRoutes = require('./routes/talentRoutes');
const projetRoutes = require('./routes/projetRoutes');
const searchRoutes = require('./routes/searchRoutes');
const collaboratorRoutes = require('./routes/collaboratorRoutes');

app.use('/api/users', userRoutes);
app.use('/api/talents', talentRoutes);
app.use('/api/projets', projetRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/collaborators', collaboratorRoutes);

// Test DB
sequelize.authenticate()
  .then(() => console.log('DB connected'))
  .catch(err => console.log('DB error:', err));

// Synchroniser les tables
sequelize.sync({ alter: true })
  .then(() => console.log('Tables synced'));

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
