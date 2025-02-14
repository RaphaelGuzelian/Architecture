import React from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';

export const CardSimpleDisplay = (props) => {
  const { hoveredCard, isHovered, handleCardHover, handleCardLeave } = props;

  return (
    <Card
      onMouseEnter={() => handleCardHover(props)}
      onMouseLeave={handleCardLeave}
      raised={isHovered}
    >
      <Image src={props.image} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{props.name}</Card.Header>
        <Card.Meta>{props.family}</Card.Meta>
        <Card.Description>{props.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="heart" />
        {props.hp} 
      </Card.Content>
      <Card.Content extra>
        <Icon name="lightning" />
        {props.energy} 
      </Card.Content>
      <Card.Content extra>
        <Icon name="shield alternate" />
        {props.defence} 
      </Card.Content>
      <Card.Content extra>
        <Icon name="crosshairs" />
        {props.attack} 
      </Card.Content>
      <Card.Content extra>
        <Icon name="money bill alternate outline" />
        {props.price}
      </Card.Content>
    </Card>
  );
};
