import '../Styles/Header.css';
import { NavLink } from 'react-router-dom';
import VkLogin from '../Actions/VkLogin';
import React from 'react';

// window.onload = function () {
//     let navbar = document.querySelector('.navbar');
//     let body = document.getElementById('body');
//     let offset = navbar.getBoundingClientRect().height;
//     body.style.marginTop = `${offset}px`;
// };

function Header() {
  return (
    <div className="navbar" id="navbar">
      <header className="header" id="header">
        <main>
          <h1 className="text">FINDER</h1>
          <nav>
            <ul className="links">
              <li><NavLink to="/"><button>Главная</button></NavLink></li>
              <li><NavLink to="/groups"><button>Группы</button></NavLink></li>
              <li><button>ссылка</button></li>
              <li><button>ссылка</button></li>
            </ul>
            <VkLogin />
          </nav>
        </main>
      </header>
    </div>
  );
}

export default Header;
