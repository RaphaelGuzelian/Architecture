import React, { useState, useEffect  } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Grid, Segment } from 'semantic-ui-react';
import { Login } from './components/login/login';
import { MenuPage } from './components/menu/menu';
import { UserForm } from './components/userform/UserForm';
import { Layout } from './components/layout/layout';
import { SellPage } from './components/sell/sell';
import { BuyPage } from './components/buy/buy';
import { SelectCard } from './components/fight/selectCard';
import { WaitPage } from './components/fight/wait';
import { FightPage } from './components/fight/fight';

export const App = () => {
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    surname: "",
    lastname: "",
    login: "",
    email: "",
    pwd: "",
    repwd: "",
    img: '',
    money: 1000,
  });

  function handleChange(data) {
    setCurrentUser({
      id: data.id,
      surname: data.surname,
      lastname: data.lastname,
      login: data.login,
      email: data.email,
      pwd: data.pwd,
      repwd: data.repwd,
      money: data.money,
      img: data.img,
    });
  }

  return (
      <Router>
        <Routes>
          <Route path="/*" 
            element={
              <Layout>
                <Segment>
                  <Login />
                </Segment>
              </Layout>
            }
          />
          <Route path="/UserForm"
            element={
              <Layout>
                <Grid divided='vertically'>
                  <Grid.Row columns={1}>
                    <Grid.Column>
                      <Segment>
                        <UserForm
                          handleChange={handleChange}
                        />
                      </Segment>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Layout>
            }
          />
          <Route path="/menu"
            element={
              <Layout>
                <MenuPage currentUser={currentUser} />
              </Layout>
            }
          />
          <Route path="/selectCard"
            element={
              <Layout>
                <SelectCard currentUser={currentUser} />
              </Layout>
            }
          />
          <Route path="/wait"
            element={
              <Layout>
                <WaitPage currentUser={currentUser} />
              </Layout>
            }
          />
          <Route path="/fight"
            element={
              <Layout>
                <FightPage currentUser={currentUser} />
              </Layout>
            }
          />
          <Route path="/buy"
            element={
              <Layout>
                <BuyPage currentUser={currentUser} />
              </Layout>
            }
          />
          <Route path="/sell"
            element={
              <Layout>
                <SellPage currentUser={currentUser} />
              </Layout>
            }
          />
      </Routes>
    </Router>
  );
};
