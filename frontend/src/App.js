import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Block from './Components/Block'
import Header from './Components/Header'
import GroupsList from './Components/GroupsList'
import Friends from './Components/Friends'
import Profile from './Components/Profile'
import ScrollToTop from './Components/ScrollToTop'
import { AudioList } from './Components/AudioList'
import { useHttp } from './hooks/http.hook'
import { useDispatch, useSelector } from 'react-redux'
import { userDataVK } from './redux/actions'

const App = () => {
  const {loading, error, request} = useHttp()
  const dispath = useDispatch()
  const dataVK = useSelector((state) => state.userDataVK)

  const loginHandler = async (r) => {
    try {
      const data = await request ('/api/auth/login', 'POST', {userid: r.session.mid})
      console.log('Data ', data)
    } catch (e) {console.log(e)}
  }

  const checkStatus = () => {
    VK.Auth.getLoginStatus((r) => {
      if (r.status) {
        dispath(userDataVK(r))
        return
      }
      return alert("CHECK STATUS ERROR!")
    })
  }
  // если session === "not_authorized" - пользователь не авторизован ВКонтакте
  // если session === "connected" - пользователь авторизован ВКонтакте, но не разрешил доступ приложению
  // если session === "unknown" - пользователь авторизован ВКонтакте и разрешил доступ приложению
  
  useEffect(() => checkStatus(), [])

  if (dataVK) { // ждем загрузку данных из вк
    return (
      <BrowserRouter>
        <ScrollToTop />
        <Header/>
        <Switch>
          <Route exact path="/"><Block/></Route>
          <Route exact path="/groups"><GroupsList  /></Route>
          <Route exact path="/audio"><AudioList></AudioList></Route>
          <Route exact path="/friends"><Friends></Friends></Route>
          <Route exact path="/profile"><Profile></Profile></Route>
        </Switch>
        {/* <Redirect to='/'/> */}
      </BrowserRouter>
      )
    }
    return null
}

export default App