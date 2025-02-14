import socket  from '../services/socket'

const randomNumber = Math.floor(Math.random() * 100) + 1;
const userName = "User" + String(randomNumber);
socket.emit("joinChat", userName);
var selectedOption;



// Gestion du formulaire d'envoi de messages
$('form').submit(function() {
  const message = $('#m').val();
  socket.emit('chatMessage', { sender: userName, receiver: selectedOption, message: message });
  $('#m').val('');
  return false;
});

// Gestion des messages système
socket.on('systemMessage', function(message) {
  // Affichez des messages système dans l'interface utilisateur si nécessaire
});

// Fonction pour mettre à jour le contenu du formulaire avec la liste des utilisateurs
function updateUsersListInForm(users) {
  const userDropdown = $('#userDropdown');
  const currentSelectedOption = userDropdown.val();

  userDropdown.empty();

  // Ajouter chaque utilisateur au menu déroulant, sauf l'utilisateur actuel
  for (const i in users) {
    let user = users[i];

    // Vérifier si l'utilisateur est différent de l'utilisateur actuel
    if (user !== userName) {
      userDropdown.append($('<option>').text(user));
    }
  }

  // Sélectionner le premier élément si la liste n'est pas vide
  if (userDropdown.find('option').length > 0) {
    userDropdown.val(userDropdown.find('option:first').val());
  }

  // Rétablir la valeur sélectionnée précédente si elle existe toujours dans la nouvelle liste
  if (userDropdown.find('option[value="' + currentSelectedOption + '"]').length > 0) {
    userDropdown.val(currentSelectedOption);
  }

  // Mettre à jour la variable selectedOption
  selectedOption = userDropdown.val();
}






// Réception des messages de chat
socket.on('chatMessage', function(data) {
  $('#messages').append($('<li>').text(`${data.sender}: ${data.message}`));
});

// Gestion de la mise à jour de la liste des utilisateurs
socket.on('updateUserList', function(users) {
  updateUsersListInForm(users);

});



// Appel initial pour mettre à jour la liste des utilisateurs au démarrage de la page
socket.emit('getInitialUserList', function(users) {
  updateUsersListInForm(users);
});


socket.on('fightRequestResponse', function(enemyName, enemyCardList) {
  // Rediriger vers la page de combat
  //window.location.href = '/fight';

});



socket.on('fightWaiting', function() {
  // Aller sur la page d'attente
  //window.location.href = '/wait';

});


