// import logo from './logo.svg';
import './App.css';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Block from './Components/Block';
import Header from './Components/Header';
import GroupsList from './Scripts/GroupsList';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`

const App = () => (
  <BrowserRouter>
    <div>
      <Header />
      <GlobalStyle />
      <div className="body" id="body">
        <Switch>
          <Route exact path="/"><Block /></Route>
          <Route exact path="/groups"><GroupsList /></Route>
        </Switch>
      </div>
    </div>
  </BrowserRouter>
);

export default App;
