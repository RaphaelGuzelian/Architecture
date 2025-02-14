const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const cors = require('cors'); // Importez le module cors

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost"],
    methods: ["GET", "POST"],
    credentials: true
  }
});
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost"],
  methods: ["GET", "POST"],
  credentials: true
};

app.use(cors(corsOptions));




// Utilisez le middleware cors
//app.use(cors({origin:'http://localhost:5173'}));

// Définition des répertoires statiques
app.use(express.static(path.join(__dirname, 'public')));

// Configuration des routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Import du gestionnaire de sockets
const socketManager = require('./socketManager');

// Configuration du gestionnaire de sockets
socketManager.configure(io);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
