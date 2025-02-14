// Import des services
const chatService = require('./services/chatService');
const userService = require('./services/userService');
const fightService = require('./services/fightService');

const stompit = require('stompit');


// let classA = new ClassA();
let player1;
let cardList1 = [];
let player2;
let cardList2 = [];

// Informations d'identification pour ActiveMQ
const connectOptions = {
  'host': 'localhost',
  'port': 61613,
  'connectHeaders':{
    'host': 'localhost',
    'login': 'admin',
    'passcode': 'admin',
    'heart-beat': '5000,5000'
  }
};
// Fonction de configuration du gestionnaire de sockets
function configure(io) {
  // Créer une connexion vers ActiveMQ
  stompit.connect(connectOptions, (err, client) => {
    if (err) {
      console.error('Error connecting to ActiveMQ:', err);
      return;
    }
    io.on('connection', (socket) => {
      console.log('A user connected');

      socket.on('registerUser', function (data) {
        userService.addUser(data.socketID, data.username);
      });


      // Gestion de la déconnexion d'un utilisateur
      socket.on('disconnect', () => {
        console.log('User disconnected');
        userService.removeUser(socket.id);
        io.emit('updateUserList', userService.getUserList());
      });

      // Gestion du message de chat
      socket.on('chatMessage', (data) => {
        const { sender, receiver, message } = data;

        // Vérifier si la connexion à ActiveMQ est établie
        if (client) {
          // Envoyer le message à ActiveMQ
          console.log('Sending message to ActiveMQ...');
          const frame = client.send({ destination: '/topic/BUS_LOGS' });
          frame.on('error', (err) => {
            console.error('Error sending message to ActiveMQ:', err);
          });
          frame.on('end', () => {
            console.log('Message successfully sent to ActiveMQ');
          });
          frame.write(JSON.stringify({ sender, receiver, message }));
          frame.end();
        } else {
          console.error('Error: ActiveMQ connection not established.');
        }

        const name = {login: receiver}
        const targetSocket = io.sockets.sockets.get(userService.getIDbyName(name));
          if (targetSocket) {
            // Émettre le message uniquement au socket cible
            targetSocket.emit('chatMessage', { sender, receiver, message });
          }
      });

      // Gestion de la connexion d'un nouvel utilisateur
      socket.on('joinChat', (username) => {
        console.log("JOIN CHAT", socket.id, username);
        io.emit('updateUserList', userService.getUserList());
      });

    // Gestion de la connexion à un combat
    socket.on('fightRequest', (data) => {
      [player1, cardList1, player2, cardList2, fightOK] = fightService.joinFight(data.currentUser, data.selectedCards);
      
      // classA.setCardList1(cardList1)
      // cardList1 =[...cardList1Tmp];
      // cardList2 =[...cardList2Tmp];


    
      const socketPlayer1 = io.sockets.sockets.get(userService.getIDbyName(player1));
      // console.log("CARDLIST2",cardList2)
      // console.log("CARDLIST1",cardList1)
      if (fightOK) {
        const socketPlayer2 = io.sockets.sockets.get(userService.getIDbyName(player2));
        turnIndicator = Math.random() >= 0.5;
        socketPlayer1.emit('fightRequestResponseIndirect', { player2, cardList2, turnIndicator});
        turnIndicator = !turnIndicator
        socketPlayer2.emit('fightRequestResponseDirect', { player1, cardList1, turnIndicator});
      } else {
        socketPlayer1.emit('fightWaiting');
      }
    });

      socket.on('attack action', (data) => {
        var {selectedCard1, selectedCard2, deckType} = data
        // console.log(deckType)
        console.log("CARTES POUR COMBAT")
        console.log(selectedCard1, selectedCard2)
        console.log("CARDLIST1",cardList1)
        console.log("CARDLIST2",cardList2)
  
        // Gestion combat ici simpliste mais améliorable
        if(deckType === 'player1'){
          selectedCard1.hp = selectedCard1.hp - selectedCard2.attack
  
          // Update card
          for (i = 0; i<cardList1.length; i++){
            if (cardList1[i].name === selectedCard1.name){
              cardList1[i] = selectedCard1
            }
          }
          socket.emit("attack result", {cardList1, cardList2})
        }
  
  
        // Gestion combat ici simpliste mais améliorable
        if(deckType === 'player2'){
          selectedCard2.hp = selectedCard2.hp - selectedCard1.attack
  
          // Update card
          for (i = 0; i<cardList2.length; i++){
            if (cardList2[i].name === selectedCard2.name){
              cardList2[i] = selectedCard2
            }
          }
          socket.emit("attack result", {cardList1, cardList2})
  
      
        }
  
  
        
  
      });
    });
  });
}


// Export de la fonction de configuration
module.exports = { configure };






