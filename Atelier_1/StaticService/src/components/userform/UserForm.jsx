// UserForm.jsx
import React, { useState } from 'react';
import { Form, Header, Button, Message } from 'semantic-ui-react';
import {  useDispatch } from 'react-redux';
import {update_user_action,submit_user_action } from '../../slices/userSlice';


export const UserForm = () => {

  const [currentUser, setCurrentUser] = useState({
    id: 1,
    surname: '', 
    lastname: '', 
    img: '', 
    login: '', 
    email: '',
    pwd: '', 
    repwd: '',
    money: 10000,
  });

  const [error, setError] = useState(null); // État pour stocker le message d'erreur
  
  const dispatch = useDispatch();

  function processInput(event) { //{valueData}
    const target = event.currentTarget;
    const value = target.value;
    const name = target.name;

    let currentVal=currentUser;
    setCurrentUser({...currentUser, [name]: value});
    currentVal[name]= value;
  }

  function submitOrder() {
    // Vérifier si les pwd correspondent
    if (currentUser.pwd === currentUser.repwd) {

      // Créer le user dans la BDD
      createUser()

      dispatch(submit_user_action({ user: currentUser }));

      resetForm();
      setError(null); // Réinitialiser l'erreur s'il y en avait une avant
    } else {
      setError("Les mots de passe ne correspondent pas");
    }
  }

  function resetForm() {
    setError(null);
    setCurrentUser({
      id: '',
      surname: '',
      lastname: '',
      img: '',
      login: '',
      email: '',
      pwd: '',
      repwd: '',
      money: 10000,
    });
  }

  const createUser = async () => {
    try {
      const response = await fetch('http://localhost/userservice/sendmsg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: currentUser.id, 
          userLogin: currentUser.login,
          userSurname: currentUser.surname,
          userLastName: currentUser.lastname,
          userEmail: currentUser.email,
          userPwd: currentUser.pwd,
          userAccount: currentUser.money
        }),
      });

      console.log(response)

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  // UTILISER USE-EFFECT ???
  
  return (
    <Form>
      <Header as='h4' dividing>
        User registration
      </Header>

      <Form.Field>
        <Form.Input fluid label='Login' placeholder='Login' name="login" onChange={processInput} value={currentUser.login} />
      </Form.Field>

      <Form.Field>
        <Form.Input fluid label='Surname' placeholder='Surname' name="surname" onChange={processInput} value={currentUser.surname} />
      </Form.Field>

      <Form.Field>
        <Form.Input fluid label='Lastname' placeholder='Lastname' name="lastname" onChange={processInput} value={currentUser.lastname} />
      </Form.Field>

      <Form.Field>
        <Form.Input fluid label='E-mail' placeholder='E-mail' name="email" onChange={processInput} value={currentUser.email} />
      </Form.Field>

      <Form.Field>
        <Form.Input type="password" label="Password" placeholder="Password" onChange={processInput} name="pwd" value={currentUser.pwd} />
      </Form.Field>

      <Form.Field>
        <Form.Input type="password" label="Re-Password" placeholder="Re-Password" onChange={processInput} name="repwd" value={currentUser.repwd} />
      </Form.Field>

      {error && <Message negative>{error}</Message>}

      <Button type='reset' onClick={resetForm}>Cancel</Button>
      <Button type='submit' onClick={() => submitOrder(currentUser)}>OK</Button>
    </Form>
  );
};
