/* global VK */

import React from 'react';
import { renderGroups } from './GroupsList';
import onClickOutside from "react-onclickoutside";
// сессия юзера
export let session = false;
export let userId;
// текст кнопки авторизации
let loginButton = 'Авторизоваться';
// ссылка на аватар юзера
let profileSRC;
// имя юзера
let profileName;
// стиль для кнопки авторизации
const loginButtonStyle = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};
// стиль для аватара юзера
const profileImgStyle = {
  marginLeft: '15px',
  width: '35px',
  borderRadius: '50%',
  marginRight: '10px',
  pointerEvents: 'none'
  // position: 'absolute',
  // left: '100%',
};
// стиль топ меню
const profileStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  fontSize: '12px',
}




function connect(r) {
  if (r.session) {
    // loginButton = 'Выйти';
    userId = r.session.mid;
    profileSRC = '';
    session = true;
    renderGroups(session);
    // запрос аватарки юзера
    VK.Api.call('users.get', { user_ids: userId, fields: 'photo_50', v: '5.73' }, (r) => {
      if (r.response) {
        profileSRC = r.response[0].photo_50;
        profileName = r.response[0].first_name;
      }
    });
    // ReactDOM.render(<App />, document.getElementById('root'));
  }
}

let hasError = false;
const checkAuth = setInterval(() => {
  VK.Auth.getLoginStatus((r) => {
    if (!VK._apiId) {
      return;
    }
    if (r.status === "connected" && !hasError) {
      hasError = true;
      connect(r);
      clearInterval(checkAuth);
    }
  });
}, 500);



class VKLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      session: false
    }
    this.setActive = this.setActive.bind(this);  // ОЧЕНЬ ВАЖНАЯ ХЕРНЯ БЕЗ КОТОРОЙ НИХЕРА НЕ ЗАРАБОТАЕТ
    this.click = this.click.bind(this);
  }
  componentDidMount() { // СДЕЛАНО ЧЕРЕЗ ЖОПУ
    let conecting = false;
    const checkConnecting = setInterval(() => {
      conecting = session;
      if (conecting) {
        this.setState({
          session: true
        })
        clearInterval(checkConnecting);
      }
    }, 500);
  }
  handleClickOutside = () => {
    if (this.state.active){
      this.setState({
        active: false 
      });
    }
    
  }
  setActive() {
    // if (!this.state.active){
      const currentState = this.state.active;
      this.setState({ active: !currentState});
    // }
  }
  click() {
    this.setState({
      session: false
    })
    // если пользователь авторизирован - выходим, не авторизирован - заходим
    if (session) {
      VK.Auth.logout((r) => {
        session = false;
        loginButton = 'Авторизоваться';
        profileSRC = '';
        renderGroups(session);
        // ReactDOM.render(<App/>, document.getElementById('root'));
      });
    } else {
      VK.Auth.login((r) => {
        connect(r);
      }, 2 + 4 + 8 + 16 + 262144);
      // числа выше - битовые маски прав доступа https://vk.com/dev/permissions
    }
  }
  

  render() {
    if (this.state.session) {
      return (
          <div  style={profileStyle} className={this.state.active ? "profile active" : "profile"} onClick={this.setActive}>
            <h3>{profileName}</h3>
            <img src={profileSRC} style={profileImgStyle} alt="" />
            <svg className={this.state.active ? "arrow rotate" : "arrow"} fill="none" height="8" viewBox="0 0 12 8" width="12" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M2.16 2.3a.75.75 0 011.05-.14L6 4.3l2.8-2.15a.75.75 0 11.9 1.19l-3.24 2.5c-.27.2-.65.2-.92 0L2.3 3.35a.75.75 0 01-.13-1.05z" fill="currentColor" fill-rule="evenodd"></path></svg>
            <div className={this.state.active ? "top_profile_menu active" : "top_profile_menu"} >
              <div className="top_profile_sep"></div>
              <button>Настройки</button>
              <button>Помощь</button>
              <div className="top_profile_sep"></div>
              <button onClick={this.click}>Выйти</button>
            </div>
          </div>
      );
    }
    else{
      return (
          <div style={loginButtonStyle} id='vk'>
            <button type="button" style={{backgroundColor: "blue"}} onClick={this.click}>{loginButton}</button>
            <img src={profileSRC} style={profileImgStyle} alt="" />
          </div>
      );
    }
  }
}

export default onClickOutside(VKLogin);
