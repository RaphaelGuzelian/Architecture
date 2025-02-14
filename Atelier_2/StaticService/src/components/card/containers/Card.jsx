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
        image={props.image} 
        handleCardHover={props.handleCardHover}  
        handleCardLeave={props.handleCardLeave}  
        handleCardClick={props.handleCardClick}
      >
        {props.children}
      </CardSimpleDisplay>
    );
  };
  
