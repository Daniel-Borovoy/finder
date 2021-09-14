import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Block from './Components/Block';
import Header from './Components/Header';
import GroupsList from './Components/GroupsList';
import Friends from './Components/Friends';
import ScrollToTop from './Components/ScrollToTop';
import { AudioList } from './Components/AudioList';
import { useHttp } from './hooks/http.hook'

const App = () => {
  const [session, setSession] = useState(String)
  const [data, setData] = useState({})
  const {loading, error, request} = useHttp()

  const loginHandler = async (r) => {
    try {
      const data = await request ('/api/auth/login', 'POST', JSON.stringify({userid: r.session.mid}), {"Content-Type": "application/json"})
      console.log('Data ', data)
    } catch (e) {console.log(e)}
  }


  const checkStatus = () => {
    VK.Auth.getLoginStatus((r) => {
      if (r.status === "not_authorized") { // пользователь авторизован ВКонтакте, но не разрешил доступ приложению
        setSession(r.status)
        return;
      }
      else if(r.status === "connected") { // пользователь авторизован ВКонтакте и разрешил доступ приложению
        setData(r)
        setSession(r.status)
        loginHandler(r)
        return;
      }
      else {                              // пользователь не авторизован ВКонтакте
        setSession(r.status)
        }
        return;
      });
  }

  useEffect(() => checkStatus(), [])


  

  function userLoginExit () {
    checkStatus();
  }

  if (session) { // рендерим при ответе на запрос иначе ждём 
    return (
    <BrowserRouter>
          <ScrollToTop />
            <div>
              <Header session={session} data={data} userLoginExit ={userLoginExit}/>
              <div className="wrapper">
                <Switch>
                  <Route exact path="/"><Block/></Route>
                  <Route exact path="/groups"><GroupsList session={session} data={data} /></Route>
                  <Route exact path="/audio"><AudioList></AudioList></Route>
                  <Route exact path="/friends"><Friends></Friends></Route>
                </Switch>
                <Redirect to='/'/>
              </div>
            </div>
          </BrowserRouter>
      );
    }
    else { 
      return null;
    }
}

export default App;