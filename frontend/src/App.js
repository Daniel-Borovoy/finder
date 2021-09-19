import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Block from './Components/Block'
import Header from './Components/Header'
import GroupsList from './Components/GroupsList'
import Friends from './Components/Friends'
import ScrollToTop from './Components/ScrollToTop'
import { AudioList } from './Components/AudioList'
import { useHttp } from './hooks/http.hook'
import { useDispatch, useSelector } from 'react-redux'
import { vkData } from './redux/actions'
const App = () => {
  const [session, setSession] = useState(String)
  // const [data, setData] = useState({})
  const {loading, error, request} = useHttp()
  const dispath = useDispatch()
  const dataVK = useSelector((state) => state.dataVK)

  const loginHandler = async (r) => {
    try {
      const data = await request ('/api/auth/login', 'POST', {userid: r.session.mid})
      console.log('Data ', data)
    } catch (e) {console.log(e)}
  }


  const checkStatus = () => {
    VK.Auth.getLoginStatus((r) => {
      if (r.status === "not_authorized") { // пользователь авторизован ВКонтакте, но не разрешил доступ приложению
        // setSession(r.status)
        dispath(vkData(r))
        return
      }
      else if(r.status === "connected") { // пользователь авторизован ВКонтакте и разрешил доступ приложению
        // setData(r)
        // setSession(r.status)
        loginHandler(r)
        dispath(vkData(r))
        return
      }
      else {                              // пользователь не авторизован ВКонтакте
        // setSession(r.status)
        dispath(vkData(r))
        return
        }
      })
  }

  useEffect(() => checkStatus(), [])

  const userLoginExit = () => checkStatus()

  if (dataVK) { // рендерим при ответе на запрос иначе ждём 
    return (
    <BrowserRouter>
          <ScrollToTop />
            <div>
              <Header/>
              <div className="wrapper">
                <Switch>
                  <Route exact path="/"><Block/></Route>
                  <Route exact path="/groups"><GroupsList  /></Route>
                  <Route exact path="/audio"><AudioList></AudioList></Route>
                  <Route exact path="/friends"><Friends></Friends></Route>
                </Switch>
                <Redirect to='/'/>
              </div>
            </div>
          </BrowserRouter>
      )
    }
    return null
}

export default App