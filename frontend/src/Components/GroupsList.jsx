import React from 'react';
import GroupCard from './GroupCard';
import "../Styles/GroupCard.scss";
import {connect} from 'react-redux';
import {cleaner} from '../redux/actions';
let groupCount = "200";
let groupArray = [];
let hasLock = false;
const VK = window.VK;


const css = {
  position: 'relative',
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
      haveData: hasLock ? true : false
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
          if(r.response) {
            for (let i = 0; i < groupCount; i++) {              
              groupArray.push(             
                <GroupCard checkFavoritesGroupsLenght={this.checkFavoritesGroupsLenght} key={i + 1} name={r.response[i].name} imgURL={r.response[i].photo_100}/>
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
    this.props.cleaner();
  }

  render() {
    const session = this.props.session;
    const localLenght = localStorage.length;
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
          <div style={{paddingTop: '70px'}}>
            
            <div style={css} >
              {groupArray}
              <button className={localLenght ? "cleanButton" : "cleanButton disable"} onClick={this.clearFavoriteListHandler}>Очистить всё</button>
            </div>
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
const mapDispatchToProps = {
  cleaner
}
const mapStateToProps = (state) => ({ clean: state.clean });
// const mapStateToProps = (state) => ({ clean: state.clean });
export default connect(mapStateToProps, mapDispatchToProps)(GroupsList);
