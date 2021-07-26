/* global VK */

import React from "react"
import ReactDOM from "react-dom"
import App from "../App"
import {render_groups} from "../Scripts/GroupsList"

//сессия юзера
export let session = false
export let userId
//текст кнопки авторизации
let login_button = 'Login in'
//ссылка на аватар юзера
let profile_src
//стиль для формы
const form_style = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}
//стиль для аватара юзера
const profile_img_style = {
    marginLeft: '15px',
    width: '35px',
    borderRadius: '50%',
    position: 'absolute',
    left: '100%'
}
let btn_style = {
    backgroundColor: 'blue'
}

function connect(r) {
    if (r.session){
        login_button = 'Выйти'
        btn_style = {
            backgroundColor: 'red'
        }
        userId = r.session.mid
        session = true
        render_groups(session);
        //запрос аватарки юзера
        VK.Api.call('users.get', {user_ids: r.session.mid, fields: 'photo_50', v:"5.73"}, function(r) {
            if(r.response) {
              profile_src = r.response[0].photo_50
            }
          });
          
        ReactDOM.render(<App/>, document.getElementById('root'))
    }
}

VK.Auth.getLoginStatus(r => {
    if (!VK._apiId) {
        return;
      }
    if(r.status === 'connected'){
        connect(r)
    } else {
        console.log('jopa piska' + {r})
    }
  })



class VkLogin extends React.Component{

    click(){
        //если пользователь авторизирован - выходим, не авторизирован - заходим
        if (session){
            VK.Auth.logout(r => {
                session = false
                login_button = 'Войти'
                profile_src = ''
		        btn_style = {
                    backgroundColor: 'blue'
                }
                render_groups(session);
                ReactDOM.render(<App/>, document.getElementById('root'))
            })
        } else {
            VK.Auth.login(r => {
                connect(r)
            },2+4+8+16+262144)
            //числа выше - битовые маски прав доступа https://vk.com/dev/permissions
        }
    }

    render(){
        return (
            <div style={form_style}>
                <button type='button' style={btn_style} onClick={this.click}>{login_button}</button>
                <img src={profile_src} style={profile_img_style} alt=""></img>
            </div>
          );
    }
}

export default VkLogin;