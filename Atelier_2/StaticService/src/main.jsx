// import react tools
import React from 'react';
import ReactDOM from 'react-dom/client';
// import the created Main component
import {App} from './App';
//add Semantic UI import

import { Provider } from 'react-redux';
import store from './store.jsx';

import 'semantic-ui-css/semantic.min.css'



//Insert a <Main> component inside the <div id='root'/>
// send the property title to the App component
ReactDOM.createRoot(document.getElementById('root')).render(
   <Provider store={store} >
      <App />
   </Provider>
  )

