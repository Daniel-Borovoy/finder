/* global VK */

import React from "react"
import ReactDOM from "react-dom"
import App from "../App"

//сессия юзера
let session = false
//текст кнопки авторизации
let login_button = 'Войти'
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
class VkLogin extends React.Component{

    click(){
        //если пользователь авторизирован - выходим, не авторизирован - заходим
        if (session){
            VK.Auth.logout(r => {
                login_button = 'Войти'
                profile_src = ''
                session = false
                btn_style = {
                    backgroundColor: 'red'
                }
                ReactDOM.render(<App/>, document.getElementById('root'))
            })
        } else {
            VK.Auth.login(r => {
                if (r.session){
                    login_button = 'Выйти'
                    session = true
                    btn_style = {
                        backgroundColor: 'red'
                    }
                    ReactDOM.render(<App/>, document.getElementById('root'))
                    //запрос аватарки юзера
                    VK.Api.call('users.get', {user_ids: r.session.user.id, fields: 'photo_100', v:"5.73"}, function(r) {
                        if(r.response) {
                          console.log(r.response[0].id)
                          profile_src = r.response[0].photo_100
                          ReactDOM.render(<App/>, document.getElementById('root'))
                        }
                      });
                    ReactDOM.render(<App/>, document.getElementById('root'))
                }
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