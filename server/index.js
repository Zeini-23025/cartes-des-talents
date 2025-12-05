const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./db'); // config sequelize

const app = express();

// CORS CORRECT CONFIGURATION
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(bodyParser.json());

// Importer routes
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
