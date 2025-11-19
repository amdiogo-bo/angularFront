//Install express server
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'dist/assignment-app/browser')));

// Route pour toutes les requêtes (SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/assignment-app/browser/index.html'));
});

app.listen(port, () => {
    console.log(`🚀 Frontend Angular démarré sur le port ${port}`);
});