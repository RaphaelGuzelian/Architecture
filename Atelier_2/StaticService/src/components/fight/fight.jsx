import React, { useState, useEffect } from 'react';
import { Card, Container, Segment, Input, Button, Progress, Dropdown, Header, Icon } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
// import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js"
// import io from 'socket.io-client';

import  socket  from '../../../../NodeServer/server/services/socket';
import { excludeMyName } from '../../../../NodeServer/server/services/utils';



const ChatColumn = () => {

  const [selectedName, setSelectedName] = useState(null); //Selected name in the dropdown
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const [options, setOptions] = useState([]); //Dropdown options
  const [username, setUsername] = useState(''); //Dropdown options

  const currentUser = useSelector(state => state.userReducer.submitted_user);


  

  //Une fois que socket est établi
  useEffect(() => {
    if (socket) {
      // Gestion des messages système
      socket.on('systemMessage', function (message) {
        // Affichez des messages système dans l'interface utilisateur si nécessaire
      });

      // Réception des messages de chat
      socket.on('chatMessage', (data) => {
        var {sender, receiver, message} = data;
        const newMessage = { sender: sender, content: message };
        
        // Add the new message to the chatMessages array
        setChatMessages(prevMessages => [...prevMessages, newMessage]);
        
      });
    
    }
  }, [socket]);
    

  //Une fois que username est fetch
  useEffect(() => {
    if (socket && currentUser) {
      // Gestion de la mise à jour de la liste des utilisateurs
      socket.on('updateUserList', function (users) {
        // console.log("ListUpdate1", users)
        const updatedOptions = excludeMyName(currentUser.login, users);
        // console.log("ListUpdate2", updatedOptions)
        setOptions(updatedOptions);
      });

      // Join the chat with the initial username
      socket.emit("joinChat", currentUser.login);

      // setUsername(currentUser.login);
    }
  }, [currentUser, socket]);



  const handleInputChange = (event, { value }) => {
    setMessage(value);
  };


  const handleSendClick = () => {
    const newMessage = { sender: currentUser.login, content: message };
    console.log(newMessage);
    setChatMessages(prevMessages => [...prevMessages, newMessage]);
  
    socket.emit('chatMessage', { sender: currentUser.login, receiver: selectedName, message: message });
  };
  
  const handleDropdownChange = (event, data) => {
    setSelectedName(data.value);
  };



  return (
    <div style={{ flex: '0 0 30%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <Segment style={{ marginRight: '100px', marginBottom: '10px', width: '100%' }}>
        <h2>Chat</h2>
        {chatMessages.map((chatMessage, index) => (
          <div key={index}>
            <strong>{chatMessage.sender}: </strong>{chatMessage.content}
          </div>
        ))}
        <Dropdown
          placeholder="Select a name"
          fluid
          selection
          options={options}
          onChange={handleDropdownChange}
        />
        <Input
          placeholder="Type a message..."
          value={message}
          onChange={handleInputChange}
          style={{ marginTop: '10px' }}
        />
        <Button primary style={{ marginTop: '10px' }} onClick={handleSendClick}>
          Send
        </Button>
      </Segment>
    </div>
  );
};

const ProgressColumn = () => {

  const [progress, setProgress] = useState(0);
  const [textNotice, setTextNotice] = useState('');

  const username = useSelector(state => state.userReducer.submitted_user);
  const enemyName = useSelector(state => state.enemyInfo.player2);
  const turnIndicator = useSelector(state =>  state.enemyInfo.turnIndicator)

  
  //Une fois que socket est établi
  // useEffect(() => {
  //   textGeneration(true)
  //   setProgress(100)
  // },);



  const textGeneration = (boot) => {
    console.log("LANCE")
    if(boot){
      if (turnIndicator) {
        setTextNotice("C'est à toi de jouer !");
      } else {
        setTextNotice("C'est au tour de ton adversaire !");
      }
      boot = !boot
    }
    else{

    }
  }

  return (
  <div style={{ flex: '0 0 10%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginRight: '100px' }}>
    
    <Icon name="user" />

    <Header as='h4'>
        <span>{enemyName.login}</span>
    </Header>
    <Progress percent={progress} progress style={{ width: '100%',marginBottom: '10px' }} />
    <Button primary style={{ marginTop: '10px' }}>End Turn </Button>

    <Header as='h4'>
        <span>{textNotice}</span>
    </Header>

    <Progress percent={progress} progress style={{  width: '100%', marginTop: '10px' }} />
    <Header as='h4'>
        <span>{username.login}</span>
    </Header>


    <Icon name="user" />
  </div>
  )
};

const  DecksColumn = (props) => {

  const [selectedPlayer1Card, setSelectedPlayer1Card] = useState(null);
  const [selectedPlayer2Card, setSelectedPlayer2Card] = useState(null);

  // const initCardList1 = useSelector(state => state.cardLists.cardList1);
  // const initCardList2 = useSelector(state => state.cardLists.cardList2);
  const initplayer1Deck = useSelector(state => state.selectedCardsReducer.submitted_cards);
  const initplayer2Deck = useSelector(state => state.enemyInfo.cardList2);

  const [player1Deck, setPlayer1Deck] = useState([]);
  const [player2Deck, setPlayer2Deck] = useState([]);

  useEffect(() => {
    if (initplayer2Deck && initplayer1Deck && (props.cardList1.length === 0) && (props.cardList2.length === 0) ) {
      // console.log("passed")
      setPlayer1Deck(initplayer1Deck);
      setPlayer2Deck(initplayer2Deck);
      setSelectedPlayer1Card(null);
      setSelectedPlayer2Card(null);
    }
    if (props.cardList1.length != 0) {
      setPlayer1Deck(props.cardList1);
      setPlayer2Deck(props.cardList2);
    }
  }, [initplayer2Deck, initplayer1Deck, props.cardList1, props.cardList2]);

  const selectCard = (deck, card) => {
    if (deck === player1Deck) {
      setSelectedPlayer1Card(card);
    } else if (deck === player2Deck) {
      setSelectedPlayer2Card(card);
    }
    
    props.onCardSelected({
      deckType: deck === player1Deck ? 'player1' : 'player2',
      selectedCard: card,
    });
  };

  const DecksColumnUpdate = (cardList1, cardList2) => {
      setPlayer1Deck(cardList1);
      setPlayer2Deck(cardList2);
  }


  return (
    <div style={{ flex: '0 0 40%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Segment style={{ marginBottom: '10px', width: '100%' }}>
        <h2>Player 2 Deck</h2>
        <Card.Group itemsPerRow={5}>
          {player2Deck.map((card, index) => (
            <Card
              key={index}
              style={{ border: selectedPlayer2Card === index ? '2px solid red' : 'none' }}
              onClick={() => selectCard(player2Deck, card)}
            >
              <Card.Content>
                <Card.Header>{card.name}</Card.Header>
                <Card.Description>
                  <strong>Description:</strong> {card.description}<br />
                  <strong>Family:</strong> {card.family}<br />
                  <strong>HP:</strong> {card.hp}<br />
                  <strong>Energy:</strong> {card.energy}<br />
                  <strong>Defence:</strong> {card.defence}<br />
                  <strong>Attack:</strong> {card.attack}<br />
                  <strong>Price:</strong> {card.price}<br />
                </Card.Description>
                {/* Add other card details as needed */}
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
    </Segment>

    <Segment style={{ marginBottom: '10px', width: '100%' }}>
        <h2>Player 1 Deck</h2>
        <Card.Group itemsPerRow={5}>
          {player1Deck.map((card, index) => (
            <Card
              key={index}
              style={{ border: selectedPlayer1Card === index ? '2px solid red' : 'none' }}
              onClick={() => selectCard(player1Deck, card)}
            >
              <Card.Content>
                <Card.Header>{card.name}</Card.Header>
                <Card.Description>
                  <strong>Description:</strong> {card.description}<br />
                  <strong>Family:</strong> {card.family}<br />
                  <strong>HP:</strong> {card.hp}<br />
                  <strong>Energy:</strong> {card.energy}<br />
                  <strong>Defence:</strong> {card.defence}<br />
                  <strong>Attack:</strong> {card.attack}<br />
                  <strong>Price:</strong> {card.price}<br />
                </Card.Description>
                {/* Add other card details as needed */}
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
    </Segment>
  </div>
)};



const CardsAndAttackColumn = ({ transferCardList, selectedCard1, selectedCard2, deckType}) => {




  const attackButtonHandle = () => {
    socket.emit('attack action', {selectedCard1, selectedCard2, deckType});
  }

  socket.on('attack result',  (data) => {
    console.log("ATTACK RESULT", data)
    // const cardList1 = data.cardList1;
    // const cardList2 = data.cardList2;
    //transferCardList(cardList1, cardList2);
  });

  return(
  <div style={{ flex: '0 0 20%', marginLeft: '150px' }}>
    <Segment>
      <h2>Carte player2</h2>
      <Card>
              <Card.Content>
                <Card.Header>{selectedCard2.name}</Card.Header>
                <Card.Description>
                  <strong>Description:</strong> {selectedCard2.description}<br />
                  <strong>Family:</strong> {selectedCard2.family}<br />
                  <strong>HP:</strong> {selectedCard2.hp}<br />
                  <strong>Energy:</strong> {selectedCard2.energy}<br />
                  <strong>Defence:</strong> {selectedCard2.defence}<br />
                  <strong>Attack:</strong> {selectedCard2.attack}<br />
                  <strong>Price:</strong> {selectedCard2.price}<br />
                </Card.Description>
              </Card.Content>
            </Card>
    </Segment>
    <Button primary style={{ marginLeft: '120px' }} onClick={attackButtonHandle}>Attack</Button>
    <Segment>
      <h2>Carte player1</h2>
      <Card>
              <Card.Content>
                <Card.Header>{selectedCard1.name}</Card.Header>
                <Card.Description>
                  <strong>Description:</strong> {selectedCard1.description}<br />
                  <strong>Family:</strong> {selectedCard1.family}<br />
                  <strong>HP:</strong> {selectedCard1.hp}<br />
                  <strong>Energy:</strong> {selectedCard1.energy}<br />
                  <strong>Defence:</strong> {selectedCard1.defence}<br />
                  <strong>Attack:</strong> {selectedCard1.attack}<br />
                  <strong>Price:</strong> {selectedCard1.price}<br />
                </Card.Description>
              </Card.Content>
            </Card>
    </Segment>
  </div>
  )
};

export const FightPage = ({ currentUser }) => {

  // const [socket, setSocket] = useState(null); 
  // //UseEffect d'initialisation
  // useEffect(() => {
  //   if (socket==null) {
  //     setSocket(socketImport);
  //   }
  // });



  //currentUser = useSelector(state => state.userReducer.submitted_user);
  const [selectedCard1, setSelectedCard1] = useState('');
  const [selectedCard2, setSelectedCard2] = useState('');
  const [deckType, setDeckType] = useState('');
  const [cardList1, setCardList1] = useState([]);
  const [cardList2, setCardList2] = useState([]);


  const transferCardList = ({ cardList1, cardList2 }) => {
    // Call the handleCardListUpdate function in the DecksColumn
    setCardList1(cardList1);
    setCardList2(cardList2);

  };
  
  

  const handleCardSelected = ({ deckType, selectedCard }) => {
    console.log(`Carte sélectionnée : ${deckType} Deck, Card : ${selectedCard}`);
    if(deckType === 'player1'){
      setSelectedCard1(selectedCard)
      setDeckType(deckType)
    }
    else{
      setSelectedCard2(selectedCard)
      setDeckType(deckType)

    }
  };
  

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100vh' }}>
        <ChatColumn  />
        <ProgressColumn/>
        <DecksColumn onCardSelected={handleCardSelected} cardList1={cardList1} cardList2={cardList2}/>
        <CardsAndAttackColumn transferCardList = {transferCardList} selectedCard1 = {selectedCard1} selectedCard2 = {selectedCard2} deckType = {deckType}/>
      </div>
    </Container>
  );
};
