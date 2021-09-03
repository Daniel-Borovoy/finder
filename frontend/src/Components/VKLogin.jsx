const VK = window.VK;

import React from 'react';
// import { renderGroups } from './GroupsList';
import onClickOutside from "react-onclickoutside";
// сессия юзера
// export let session = false;
// export let userId;
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

class VKLogin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      haveData: false
    }
    this.setOpen = this.setOpen.bind(this);
    this.onClickButton = this.onClickButton.bind(this);
    this.getTopMenuData = this.getTopMenuData.bind(this)
  }

  // срабатывает при клике снаружи компонента
  handleClickOutside()  {
    if (this.state.open){
      this.setState({
        open: false 
      });
    }
  }


  getTopMenuData(r) {
      // запрос аватарки и имени юзера
      VK.Api.call('users.get', { user_ids: r.session.mid, fields: 'photo_50', v: '5.131' }, (r) => {
          if (r.response && !this.state.haveData) {
            profileSRC = r.response[0].photo_50;
            profileName = r.response[0].first_name;
            this.setState({haveData: true});
          }
      });
  }

  // открытие и закрытие меню
  setOpen() {
      const currentState = this.state.open;
      this.setState({ open: !currentState});
  }

  // нажатие на кнопку авторизации или выхода
  onClickButton() {

    // если пользователь авторизирован - выходим, не авторизирован - заходим
    if (this.props.session === "connected") {
      VK.Auth.logout(() => {
        loginButton = 'Авторизоваться';
        profileSRC = '';
        this.setState({
          open: false,
          haveData: false
        });
        localStorage.clear();
        this.props.userLoginExit();
      });
    } 
    else {
      VK.Auth.login((r) => {
        if (r.session) {
          /* Пользователь успешно авторизовался */
          this.getTopMenuData(r);
          this.props.userLoginExit();
          if (r.settings) {
            /* Выбранные настройки доступа пользователя, если они были запрошены */
          }
        } else {
          /* Пользователь нажал кнопку Отмена в окне авторизации */
        }
      }, 2 + 4 + 8 + 16 + 262144);
      // числа выше - битовые маски прав доступа https://vk.com/dev/permissions
    }
  }
  

  render() {
    const session = this.props.session;
    const data = this.props.data;
    const haveData = this.state.haveData;

    if (session === "connected") {
      if (!haveData) {
        this.getTopMenuData(data);
      }
    }

    // при успешной проверке
    if (session === "connected") {
      return (
          <div style={profileStyle} className={this.state.open ? "profile open" : "profile"} >
            <div className="profileButton" onClick={this.setOpen}> 
            <h3>{profileName}</h3>
            <img src={profileSRC} style={profileImgStyle} alt="" />
            <svg className={this.state.open ? "arrow rotate" : "arrow"} fill="none" height="8" viewBox="0 0 12 8" width="12" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M2.16 2.3a.75.75 0 011.05-.14L6 4.3l2.8-2.15a.75.75 0 11.9 1.19l-3.24 2.5c-.27.2-.65.2-.92 0L2.3 3.35a.75.75 0 01-.13-1.05z" fill="currentColor" fillRule="evenodd"></path></svg>
            </div>
            <div className={this.state.open ? "top_profile_menu open" : "top_profile_menu"}>
              <div className="top_profile_sep"></div>
              <button onClick={this.setOpen}>Настройки</button>
              <button onClick={this.setOpen}>Помощь</button>
              <div className="top_profile_sep"></div>
              <button onClick={this.setOpen} onClick={this.onClickButton}>Выйти</button>
            </div>
          </div>
      );
    }
    // при проверке
    if (session === "check") {
      return (
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      );
    }
    
    // пользователь авторизован ВКонтакте, но не разрешил доступ приложению
    if (session === "not_authorized") {
      // alert("Нет доступа к данным аккаунта ВК.");
      return (
        <div style={loginButtonStyle} id='vk'>
          <button type="button" style={{backgroundColor: "blue"}} onClick={this.onClickButton}>{loginButton}</button>
          <img src={profileSRC} style={profileImgStyle} alt="" />
        </div>
      );
    }
    //пользователь не авторизован ВКонтакте
    if(session === "unknown") {
      // alert("Вы не авторизованы.")
      return (
        <div style={loginButtonStyle} id='vk'>
          <button type="button" style={{backgroundColor: "blue"}} onClick={this.onClickButton}>{loginButton}</button>
          <img src={profileSRC} style={profileImgStyle} alt="" />
        </div>
      );
    }
    return null;
  }
}

export default onClickOutside(VKLogin);
