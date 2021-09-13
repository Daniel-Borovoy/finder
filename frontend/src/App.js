import React from 'react';
import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Block from './Components/Block';
import Header from './Components/Header';
import GroupsList from './Components/GroupsList';
import Friends from './Components/Friends';
import ScrollToTop from './Components/ScrollToTop';
import { AudioList } from './Components/AudioList';
import { useHttp } from './hooks/http.hook'

// const {loading, error, request} = useHttp()

// const loginHandler = async () => {
//   try {
//     const data = await request('/api/auth/login', 'POST', 'userid')
//     console.log('Data ', data)
//   } catch (e) {}
// }

class App extends React.Component{

  constructor() {
    super();
    this.state = {
      session: "check",
      data: {}
    }
    this.userLoginExit = this.userLoginExit.bind(this);
  }

  componentDidMount() {
    this.checkStatus();
  }

  // async VkLogin() {
  //   const {loading, error, request} = useHttp()
    
  //   const loginHandler = async () => {
  //     try {
  //       const data = await request('/api/auth/login', 'POST', 'userid')
  //       console.log('Data ', data)
  //     } catch (e) {}
  //   }

  //   loginHandler()
  // }

  // проверка авторизации
  checkStatus () {
    VK.Auth.getLoginStatus((r) => {
      if (r.status === "not_authorized") { // пользователь авторизован ВКонтакте, но не разрешил доступ приложению
        this.setState({
          session: "not_authorized"
          });
        return;
      }
      else if(r.status === "connected") { // пользователь авторизован ВКонтакте и разрешил доступ приложению
        this.setState({
          session: r.status,
          data: r
        });
        
        return;
      }
      else {                              // пользователь не авторизован ВКонтакте
        this.setState({
          session: "unknown"
          });
        }
        return;
      });
  }

  // вызывается при авторизации или выходе 
  userLoginExit () {
    this.checkStatus();
  }

  render() {
    const session = this.state.session;
    const data = this.state.data;
    if (session === "connected" || session === "unknown" || session === "not_authorized") { // рендерим при ответе на запрос иначе ждём 
      return (
      <BrowserRouter>
            <ScrollToTop />
              <div>
                <Header session={session} data={data} userLoginExit ={this.userLoginExit}/>
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
};

export default App;