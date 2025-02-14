import React, { useState, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { submit_enemy_action } from '../../slices/enemySlice'
import  socketImport  from '../../../../NodeServer/server/services/socket';

export const WaitPage = () => {

  const [socket, setSocket] = useState(null); 
  const dispatch = useDispatch();
  
  const navigate = useNavigate();

  // UseEffect d'initialisation
  useEffect(() => {
    if (socket==null) {
      setSocket(socketImport);
    }
   }, []);


   useEffect(() => {
    if (socket != null) {
      socket.on('fightRequestResponseIndirect', function (data) {
        const player = data.player2
        const cardList = data.cardList2
        console.log(data)
        dispatch(submit_enemy_action({ player2: player, cardList2: cardList }));
       
        navigate('/fight');
      });
    }
  }, [socket]);
  

  return (
    <div style={{ textAlign: 'center', marginTop: '250px' }}>
      <h1 style={{ fontSize: '4em' }}>Waiting fight</h1>
      <Loader active indeterminate size="massive" />
    </div>
  );
  
};
