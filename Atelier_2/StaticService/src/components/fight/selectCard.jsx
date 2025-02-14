import React, { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Card } from '../card/containers/Card';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { submit_selected_cards } from '../../slices/selectedCardsSlice';
import { submit_enemy_action } from '../../slices/enemySlice'

import  socketImport  from '../../../../NodeServer/server/services/socket';


export const SelectCard= () => {

  const [userCards, setUserCards] = useState([]); 
  const [selectedCards, setSelectedCards] = useState([]); 
  const [noticeText, setNoticeText] = useState(''); 
  const [socket, setSocket] = useState(null); 

  const currentUser = useSelector(state => state.userReducer.submitted_user);
  
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const fetchUserCards = async () => {
    try {
      const response = await fetch('http://localhost/superservice/cards_by_user/'+ currentUser.id); //http://tp.cpe.fr:8083/cards_to_sell
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      console.log(response)

      // Mise à jour de l'état userCards avec les nouvelles données
      setUserCards(data);

    } catch (error) {
      console.error('Error:', error);
    }
  };


  // UseEffect d'initialisation
  useEffect(() => {
    if (socket==null) {
      setSocket(socketImport);
    }
    fetchUserCards()
   }, []);



  // UseEffect une fois socket établi
  useEffect(() => {
    if (socket!=null) {
    socket.on('fightRequestResponseDirect', function (data) {
      const player = data.player1
      const cardList = data.cardList1
      console.log("SELECT",data)
      dispatch(submit_enemy_action({ player2: player, cardList2: cardList }));

      
      navigate('/fight');
      
    });
    socket.on('fightWaiting', function () {
      // Aller sur la page d'attente
      navigate('/wait');
    });

    const username = currentUser.login
    const socketID = socket.id
    socket.emit('registerUser', {username, socketID} );
    console.log("CURRENTUSER",username);
    console.log("SOCKETID", socketID);
    }
  }, [socket]);



   const sendSelectedCards = () => {
    if (selectedCards.length != 2) {
      setNoticeText("Please select exactly 5 cards");
    } else {
      dispatch(submit_selected_cards({ cards: selectedCards }));
      console.log(selectedCards);
      socket.emit('fightRequest', {currentUser, selectedCards}) 
    }
  };


  const handleCardClick = (selectedCard) => {
    setSelectedCards((prevSelectedCards) => {
      const cardIndex = prevSelectedCards.findIndex((card) => card.name === selectedCard.name);

      if (cardIndex !== -1) {
        // Card is already selected, remove it
        const updatedSelectedCards = [...prevSelectedCards];
        updatedSelectedCards.splice(cardIndex, 1);
        return updatedSelectedCards;
      } else {
        // Card is not selected, add it
        return [...prevSelectedCards, selectedCard];
      }
    });
  };

  return (
    <div>
      <h1>Please select 5 cards</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '20px', marginRight: '20px' }}>
        {userCards.map((card, index) => (
          <div key={index} style={{ marginBottom: '20px', border: selectedCards.some((selected) => selected.name === card.name) ? '6px solid red' : '2px solid black' }}>
            <Card
              name={card.name}
              description={card.description}
              family={card.family}
              hp={card.hp}
              energy={card.energy}
              defence={card.defence}
              attack={card.attack}
              price={card.price}
              image={card.image}
              handleCardClick={() => handleCardClick(card)}
            />
          </div>
        ))}
      </div>
      <Button onClick={sendSelectedCards} primary>
        Fight
      </Button>
      <div>
          {noticeText}
      </div>

    </div>
  );
};