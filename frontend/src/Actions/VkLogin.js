/* global VK */

import React from 'react';
import ReactDOM, { render } from 'react-dom';
import App from '../App';
import { render_groups } from '../Scripts/GroupsList';

// сессия юзера
export let session = false;
export let userId;
// текст кнопки авторизации
let login_button = 'Login in';
// ссылка на аватар юзера
let profile_src;
let profile_name;
// стиль для формы
const form_style = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
// стиль для аватара юзера
const profile_img_style = {
  marginLeft: '15px',
  width: '35px',
  borderRadius: '50%',
  marginRight: '10px'
  // position: 'absolute',
  // left: '100%',
};
let btn_style = {
  backgroundColor: 'blue',
};

function connect(r) {
  if (r.session) {
    login_button = 'Выйти';
    btn_style = {
      backgroundColor: 'red',
    };
    userId = r.session.mid;
    session = true;
    render_groups(session);
    // запрос аватарки юзера
    VK.Api.call('users.get', { user_ids: r.session.mid, fields: 'photo_50', v: '5.73' }, (r) => {
      if (r.response) {
        profile_src = r.response[0].photo_50;
        profile_name = r.response[0].first_name;
        console.log(r.response[0])
      }
    });
    ReactDOM.render(<App />, document.getElementById('root'));
  }
}

VK.Auth.getLoginStatus((r) => {
  if (!VK._apiId) {
    return;
  }
  if (r.status === 'connected') {
    connect(r);
  } else {
    console.log(`jopa piska${{ r }}`);
  }
});

const divStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  fontSize: '12px',
}
class VkLogin extends React.Component {
  
  click() {
    // если пользователь авторизирован - выходим, не авторизирован - заходим
    if (session) {
      VK.Auth.logout((r) => {
        session = false;
        login_button = 'Войти';
        profile_src = '';
		    btn_style = {
          backgroundColor: 'blue',
        };
        render_groups(session);
        ReactDOM.render(<App/>, document.getElementById('root'));
      });
    } else {
      VK.Auth.login((r) => {
        connect(r);
      }, 2 + 4 + 8 + 16 + 262144);
      // числа выше - битовые маски прав доступа https://vk.com/dev/permissions
    }
  }

  render() {
    if (session) {
      return (
          <div style={divStyle} className="log">
            <h3>{profile_name}</h3>
            <img src={profile_src} style={profile_img_style} alt="" />
            <svg fill="none" height="8" viewBox="0 0 12 8" width="12" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M2.16 2.3a.75.75 0 011.05-.14L6 4.3l2.8-2.15a.75.75 0 11.9 1.19l-3.24 2.5c-.27.2-.65.2-.92 0L2.3 3.35a.75.75 0 01-.13-1.05z" fill="currentColor" fill-rule="evenodd"></path></svg>
            <div className="top_profile_menu">
              <div className="top_profile_sep"></div>
              <a>Настройки</a>
              <a>Помощь</a>
              <div className="top_profile_sep"></div>
              <button onClick={this.click}>Выйти</button>
            </div>
          </div>
      )
    }
    else{
      return (
          <div style={form_style} id='vk'>
            <button type="button" style={btn_style} onClick={this.click}>{login_button}</button>
            <img src={profile_src} style={profile_img_style} alt="" />
          </div>
      )
    }
  }
}

export default VkLogin;
