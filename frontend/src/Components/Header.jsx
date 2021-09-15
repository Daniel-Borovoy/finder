import '../Styles/Header.scss';
import { NavLink } from 'react-router-dom';
import VKLogin from './VKLogin';
import React, { useState } from 'react';
import useMediaQuery from 'react-use-media-query-hook';
import onClickOutside from "react-onclickoutside";

const initialState = false;
function Header(props) {
  const [open, setOpen] = useState(initialState);
  const isMobile = useMediaQuery('(max-width: 424px)');
  const isTablet = useMediaQuery('(min-width: 401px) and (max-width: 640px)');
  const isDesktop = useMediaQuery('(min-width: 641px) and (max-width: 1024px)');
  const isLargeDesktop = useMediaQuery('(min-width: 1025px)');
  
  Header.handleClickOutside = () => setOpen(false);
  if (isMobile) {
    return (
      <div className="navbar mobile" >
      <header className="header">
        <main>
            <button className="burger" onClick={() => setOpen(!open)}>
              <span></span>
              <span></span>
              <span></span>
            </button>
            <NavLink to="/" style={{textDecoration: "none"}}><h1 className="text">RE-FINDER</h1></NavLink>
        </main>
      </header>
      <nav className={open ? "mobile__menu open" : "mobile__menu"}> 
            <VKLogin session={props.session} data={props.data} userLoginExit={props.userLoginExit}/>
            <ul className="links">
              <li><NavLink to="/"><button onClick={() => setOpen(false)}>Главная</button></NavLink></li>
              <li><NavLink to="/groups"><button onClick={() => setOpen(false)}>Группы</button></NavLink></li>
              <li><NavLink to="/audio"><button onClick={() => setOpen(false)}>Аудиозаписи</button></NavLink></li>
              <li><NavLink to="/friends"><button onClick={() => setOpen(false)}>Друзья</button></NavLink></li>
            </ul>
      </nav>
    </div>
    );
  }
  return (
    <div className="navbar" >
      <header className="header">
        <main>
          <NavLink to="/" style={{textDecoration: "none"}}><h1 className="text">RE-FINDER</h1></NavLink>
          <nav>
            <ul className="links">
              <li><NavLink to="/"><button>Главная</button></NavLink></li>
              <li><NavLink to="/groups"><button>Группы</button></NavLink></li>
              <li><NavLink to="/audio"><button>Аудиозаписи</button></NavLink></li>
              <li><NavLink to="/friends"><button>Friends</button></NavLink></li>
            </ul>
            <VKLogin session={props.session} data={props.data} userLoginExit={props.userLoginExit}/>
          </nav>
        </main>
      </header>
    </div>
  );
}
const clickOutsideConfig = {
  handleClickOutside: () => Header.handleClickOutside
};


export default onClickOutside(Header, clickOutsideConfig);
