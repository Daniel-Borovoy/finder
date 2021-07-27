/* global VK */

import React from 'react';
import ReactDOM from 'react-dom';
import GroupСard from '../Actions/GroupCard';
import { userId } from '../Actions/VkLogin';
import App from '../App';

let group_count = 200;
let group_array = [];

const css = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
};

export function render_groups(props) {
  if (props) {
    VK.Api.call('groups.get', { user_ids: userId, count: group_count, v: '5.131' }, (r) => {
      if (group_count > r.response.count) {
        group_count = r.response.count;
      }
      VK.Api.call('groups.getById', { group_ids: r.response.items, v: '5.131' }, (r) => {
        for (let i = 0; i < group_count; i++) {
          group_array.push(
            <GroupСard
              key={i}
              name={r.response[i].name}
              imgURL={r.response[i].photo_100}
            />,
          );
          
        }
        ReactDOM.render(<App />, document.getElementById('root'));
      });
    });
  } else {
    group_array = [];
    console.log(group_array);
    ReactDOM.render(<App />, document.getElementById('root'));
  }
}

class GroupsList extends React.Component {
  render() {
    return (
      <div style={{paddingTop: '70px'}}>
        <div style={css}>{group_array}</div>
      </div>
    );
  }
}

export default GroupsList;
