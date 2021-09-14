const VK = window.VK;

import React from 'react';
import GroupCard from './GroupCard';
import "../Styles/GroupCard.scss";

let groupCount = "200";
let groupArray = [];
let hasLock = false;


const css = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center'
};

class GroupsList extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      haveData: hasLock ? true : false,
      doClear: false
    }
    this.clearFavoriteListHandler = this.clearFavoriteListHandler.bind(this);
  }


  getGroups() {
    if (!hasLock) {
      hasLock = true;
    }
    const userId = this.props.data.session.mid;
    VK.Api.call('groups.get', { user_ids: userId, count: groupCount, v: '5.131' }, (r) => {
      if (r.response) {
        if (groupCount > r.response.count) {
          groupCount = r.response.count;
        }
      VK.Api.call('groups.getById', { group_ids: r.response.items, v: '5.131' }, (r) => {
          console.log(r.response)
          if(r.response) {
            for (let i = 0; i < groupCount; i++) {              
              groupArray.push(             
                <GroupCard key={i + 1} name={r.response[i].name} imgURL={r.response[i].photo_100}/>
                
              );
            }
            this.setState({haveData: true});
          }
        }); 
      }
    });
  }


  clearFavoriteListHandler () {
    localStorage.clear();
  }
  

  render() {
    const session = this.props.session;
    if (session !== "connected") {
      hasLock = false;
      groupArray = [];
    }

    if (!hasLock && session === "connected") {
      this.getGroups();
    }
   
    if(session === "connected" && this.state.haveData) {
      return (
        <>
         <button style={{position: "fixed", right: "15px", top: "100px"}} onClick={this.clearFavoriteListHandler}>Очистить</button>
          <div style={{paddingTop: '70px', position:'relative'}}>
            <div style={css}>{groupArray}</div>
          </div>
        </>
      );
    }
    if (session === "not_authorized") {
      return null;
    }
    if (session === "unknown") {
      return null;
    }
    return (
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    );
  }
}

export default GroupsList;
