const VK = window.VK;

import React from 'react';
// import { session, userId } from './VKLogin';
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

// карточка группы
class GroupCard extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      inFavorites: false
    }
    this.addFavorite = this.addFavorite.bind(this);
  }
  
  componentDidMount () {
    if (localStorage.getItem(`${this.props.name}`) === 'true') {
      this.setState({
        inFavorites: true
      })
    }
  }

  addFavorite () {
    const inFavorites = this.state.inFavorites;
    localStorage.setItem(`${this.props.name}`, !inFavorites);
    this.setState({inFavorites: !inFavorites});
  }

  render () {
    return (
      <div style={{position: "relative"}}>
        <div className={this.state.inFavorites ? "container in__favorites" : "container"} onClick={this.addFavorite}>
          
          <div>
            <img alt="" src={this.props.imgURL} className="avatar" />
          </div>
          <div className="name"><b>{this.props.name}</b></div>
        </div>
        <button className={this.state.inFavorites ? "close active" : "close"} onClick={this.addFavorite}>❌</button>
      </div>
    );
  }
}




// блок с группами
class GroupsList extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      haveData: hasLock ? true : false
    }
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
        <div style={{paddingTop: '70px'}}>
          <div style={css}>{groupArray}</div>
        </div>
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
