import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Block from './Components/Block';
import Header from './Components/Header';
import GroupsList from './Components/GroupsList';
import ScrollToTop from './Components/ScrollToTop';


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

    return (
      <BrowserRouter>
            <ScrollToTop />
              <div>
                <Header session={session} data={data} userLoginExit ={this.userLoginExit}/>
                <div className="wrapper">
                  <Switch>
                    <Route exact path="/"><Block /></Route>
                    <Route exact path="/groups"><GroupsList session={session} data={data} /></Route>
                  </Switch>
                </div>
              </div>
            </BrowserRouter>
    );

  }
  
};

export default App;
