import '../Styles/Header.css'
import VkLogin from  '../Actions/VK_login'
import { session } from '../Actions/VK_login'
import React from 'react';
console.log(session)


function Header() {
  return (
    <header className="header">
      <main>  
        <h1 className="text">FINDER</h1>
        <nav>
          <ul className="links">
              <li><button>ссылка</button></li>
              <li><button>ссылка</button></li>
              <li><button>ссылка</button></li>
              <li><button>ссылка</button></li>
          </ul>
        <BtnState s={session}/>
        </nav>
      </main>
    </header>
  );
}



class BtnState extends React.Component{
    constructor(props) {
        super(props);
        this.props = props
        this.state = {
            s: false
        }
    }
    check() {
        if(session){
            this.setState({
                s: true
            })
        }

        else{
            this.setState({
                s: false
            })
        }
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.check(),
            100
        );
    }
    componentWillMount() {
        clearInterval(this.timerID)
    }
    render() {
        if (this.state.s){
            return(
                <div className="out">
                    <VkLogin/>
                </div>
            );
        }
        else{
            return(
                <div className="login">
                    <VkLogin/>
                </div>
            );
        }
    }
}


export default Header;