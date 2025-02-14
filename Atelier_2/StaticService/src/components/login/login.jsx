import React, { useState } from 'react';
import { Form, Header, Button } from 'semantic-ui-react';

export const Login = (props) => {
  const [loginInfo, setLoginInfo] = useState({
    login: "",
    password: "",
  });

  function processInput(event, { valueData }) {
    const target = event.currentTarget;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setLoginInfo({ ...loginInfo, [name]: value });
  }

  const connectOrder = async () => {
      try {
        const response = await fetch('http://tp.cpe.fr:8083/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userLogin: currentUser.login,
            userPwd: currentUser.password,
          }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
      } catch (error) {
        console.error('Error:', error);
      }
  };
  

  function cancelOrder() {
    console.log("Login annulé");
    setLoginInfo({
      login: "",
      password: "",
    });
  }

  return (
    <Form>
      <Header as='h4' dividing>
        User login
      </Header>

      <Form.Field>
        <Form.Input fluid label='Login' placeholder='Login' name="login" onChange={processInput} value={loginInfo.login} />
      </Form.Field>

      <Form.Field>
        <Form.Input type="password" label="Password" placeholder="Password" name="password" onChange={processInput} value={loginInfo.password} />
      </Form.Field>

      <Button type='reset' onClick={cancelOrder}>Cancel</Button>
      <Button type='submit' onClick={connectOrder}>Connect</Button>
    </Form>
  );
};
