import React from 'react';
import { CardSimpleDisplay } from '../components/CardSimpleDisplay';

// Card component
export const Card = (props) => {
    return (
      <CardSimpleDisplay
        name={props.name}
        description={props.description}
        family={props.family}
        hp={props.hp}
        energy={props.energy}
        defence={props.defence}
        attack={props.attack}
        price={props.price}
        image={props.image}  // Add this line to pass the image prop
        handleCardHover={props.handleCardHover}  // Add this line to pass the handleCardHover prop
        handleCardLeave={props.handleCardLeave}  // Add this line to pass the handleCardLeave prop
      >
        {props.children}
      </CardSimpleDisplay>
    );
  };
  
