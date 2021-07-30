/* global VK */

import React from 'react';
import ReactDOM from 'react-dom';
// import GroupСard from '../Actions/GroupCard';
import { userId } from './VKLogin';
import "../Styles/GroupCard.css";

let groupCount = "200";
let groupArray = [];

const css = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center'
};

// карточка группы
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


// рендер групп
export function renderGroups(props) {
  if (props) {
    VK.Api.call('groups.get', { user_ids: userId, count: groupCount, v: '5.73' }, (r) => {
      if (groupCount > r.response.count) {
        groupCount = r.response.count;
      }
      VK.Api.call('groups.getById', { group_ids: r.response.items, v: '5.73' }, (r) => {
        for (let i = 0; i < groupCount; i++) {
          groupArray.push(
            <GroupCard
              key={i + 1}
              name={r.response[i].name}
              imgURL={r.response[i].photo_100}
            />
          );
        }
        // ReactDOM.render(<App />, document.getElementById('root'));
      });
    });
  } else {
    groupArray = [];
    // console.log(groupArray);
    // ReactDOM.render(<App />, document.getElementById('root'));
  }
}


// блок с группами
class GroupsList extends React.Component {
  render() {
    return (
      <div style={{paddingTop: '70px'}}>
        <div style={css}>{groupArray}</div>
      </div>
    );
  }
}

export default GroupsList;
