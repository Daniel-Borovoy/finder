import React from 'react';
import '../Styles/GroupCard.css';

function GroupCard(props) {
  return (
    <div className="container">
      <div>
        <img alt="" src={props.imgURL} className="avatar" />
      </div>
      <div className="name"><b>{props.name}</b></div>
    </div>
  );
}

export default GroupCard;
