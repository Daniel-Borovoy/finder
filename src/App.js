// import logo from './logo.svg';
import './App.css';
import Block from './Components/Block';
import VkLogin from './Actions/VkLogin';
import Header from './Components/Header'

const App = () => {
  return (
    <div>
      <Header/>
      <Block/>
      <VkLogin/>
    </div>
  );
};

export default App;
