// import logo from './logo.svg';
import './App.css'
import Block from './Components/Block'
import Header from './Components/Header'
import GroupsList from './Scripts/GroupsList'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`

const css = {
  padding: '0 100px',
  backgroundColor: '#f0f0f3'
}

const App = () => {
  return (
    <div>
      <Header/>
      <GlobalStyle/>
      <div style = {css}>
        <Block/>
        <GroupsList/>
      </div>
    </div>
  );
};

export default App;
