import React from 'react';

const ListItem = (props) => (
  <div>
  <ul>
  <h3>{props.item.name} is it a threat.... {props.item.hazard}</h3>
    <p> Coming on: { props.item.date }   <a href={props.item.url}> <button> More Info </button> </a> </p>
    <p>Near Earth Object : {props.item.neo}</p>
    <h4> Magnitude: {props.item.magnitude} </h4>
    

  </ul>
  </div>
)

export default ListItem;