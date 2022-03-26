import './AppBar.scss'
import { NavLink } from 'react-router-dom'
import {AppBarMenu} from '../app-bar-menu/AppBarMenu'
import React, {FC} from 'react'

export const AppBar: FC = () => {
  return (
      <div className="navbar">
        <header className="header">
          <div className="header_body">
            <NavLink to="/" style={{textDecoration: "none"}}><h1 className="text">RE-FINDER</h1></NavLink>
            <nav>
              <ul className="links">
                <li><NavLink to="/">
                  <button>Главная</button>
                </NavLink></li>
                <li><NavLink to="/groups">
                  <button>Группы</button>
                </NavLink></li>
                <li><NavLink to="/audio">
                  <button>Аудиозаписи</button>
                </NavLink></li>
                <li><NavLink to="/friends">
                  <button>Friends</button>
                </NavLink></li>
              </ul>
              <AppBarMenu/>
            </nav>
          </div>
        </header>
      </div>
  )
}