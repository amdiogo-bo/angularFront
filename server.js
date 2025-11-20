const express = require("express");
const path = require("path");

const app = express();

// Dossier contenant Angular compilé
const distPath = path.join(__dirname, "dist/assignment-app/browser");

// Servir les fichiers statiques
app.use(express.static(distPath));

// Route catch-all pour servir Angular index.html
app.use((req, res, next) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// Démarrage serveur
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
