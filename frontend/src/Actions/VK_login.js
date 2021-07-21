/* global VK */

import React from "react"
import ReactDOM from "react-dom"
import App from "../App"

//сессия юзера
let session = false
//текст кнопки авторизации
let login_button = 'Login in'
//ссылка на аватар юзера
let profile_src
//стиль для формы
const form_style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}
//стиль для аватара юзера
const profile_img_style = {
    borderRadius: '50%',
    marginRight: '10px'
}

class VK_login extends React.Component{

    click(){
        //если пользователь авторизирован - выходим, не авторизирован - заходим
        if (session){
            VK.Auth.logout(r => {
                login_button = 'Login in'
                profile_src = ''
                ReactDOM.render(<App/>, document.getElementById('root'))
                session = false
            })
        } else {
            VK.Auth.login(r => {
                if (r.session){
                    login_button = 'Login out'
                    ReactDOM.render(<App/>, document.getElementById('root'))
                    session = true
                    //запрос аватарки юзера
                    VK.Api.call('users.get', {user_ids: r.session.user.id, fields: 'photo_50', v:"5.73"}, function(r) {
                        if(r.response) {
                          console.log(r.response[0].id)
                          profile_src = r.response[0].photo_50
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
            <form action='' style={form_style}>
                <img src={profile_src} style={profile_img_style}></img>
                <input type='button' onClick={this.click}  value={login_button}></input>
            </form>
          );
    }
}

export default VK_login;