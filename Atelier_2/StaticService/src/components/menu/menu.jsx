import React, {useEffect} from 'react';
import { Button, Container, Header, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';


export const MenuPage = () => {

  let currentUser = useSelector(state => state.userReducer.submitted_user);
  const [currentUserMoney, setCurrentUserMoney] = useState(0); // État local pour currentUser.money

  const fetchMoney = async () => {
    try {
      const response = await fetch(`http://localhost/userservice/user/${currentUser.id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setCurrentUserMoney(data.userAccount);

    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    fetchMoney();
    // Mettre à jour l'état local currentUserMoney à partir de currentUser
    setCurrentUserMoney(currentUser.money);
  }, [currentUser.money]);

  return (
    <Container textAlign="center">
      <Menu pointing secondary>
        <Menu.Item position='left'>
          <Header as='h4'>Money: {currentUserMoney} $</Header>
        </Menu.Item>
        <Menu.Item position='right'>
          <Header as='h4'>{currentUser.surname}</Header>
        </Menu.Item>
      </Menu>

      <div style={{ marginTop: '100px' }}>
        <Button.Group size="big">
          <Button primary as={Link} to="/selectCard">Play</Button>
          <Button.Or />
          <Button secondary as={Link} to="/buy">Buy</Button>
          <Button.Or />
          <Button as={Link} to="/sell">Sell</Button>
        </Button.Group>
      </div>

    </Container>
  );
};
