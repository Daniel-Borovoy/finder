import '../Styles/Header.scss';
import { NavLink } from 'react-router-dom';
import VKLogin from './VKLogin';
import React from 'react';

function Header(props) {
  return (
    <div className="navbar" >
      <header className="header">
        <main>
          <h1 className="text">RE-FINDER</h1>
          <nav>
            <ul className="links">
              <li><NavLink to="/"><button>Главная</button></NavLink></li>
              <li><NavLink to="/groups"><button>Группы</button></NavLink></li>
              <li><button>ссылка</button></li>
              <li><button>ссылка</button></li>
            </ul>
            <VKLogin session={props.session} data={props.data} userLoginExit={props.userLoginExit}/>
          </nav>
        </main>
      </header>
    </div>
  );
}

export default Header;
