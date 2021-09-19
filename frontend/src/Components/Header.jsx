import '../Styles/Header.scss'
import { NavLink } from 'react-router-dom'
import VKLogin from './VKLogin'
import React, { useState } from 'react'
import useMediaQuery from 'react-use-media-query-hook'
import onClickOutside from "react-onclickoutside"
// импорт иконок
import HomeIcon from '../images/home.png'
import GroupIcon from '../images/groups.png'
import AudioIcon from '../images/audio.png'
import FriendsIcon from '../images/friends.png'
import { useSelector } from 'react-redux'

const initialState = false

function Header() {

  const [open, setOpen] = useState(initialState)
  const isMobile = useMediaQuery('(max-width: 424px)')
  const isTablet = useMediaQuery('(min-width: 401px) and (max-width: 640px)')
  const isDesktop = useMediaQuery('(min-width: 641px) and (max-width: 1024px)')
  const isLargeDesktop = useMediaQuery('(min-width: 1025px)')
  const session = useSelector((state) => state.dataVK.status)
  Header.handleClickOutside = () => setOpen(false)

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
          <VKLogin/>
          {session === "connected" &&
          <ul className="links">
            <li><NavLink to="/"><button onClick={() => setOpen(false)}><img width='30px' src={HomeIcon}></img><h1>Главная</h1></button></NavLink></li>
            <li><NavLink to="/groups"><button onClick={() => setOpen(false)}><img width='30px' src={GroupIcon}></img><h1>Группы</h1></button></NavLink></li>
            <li><NavLink to="/audio"><button onClick={() => setOpen(false)}><img width='30px' src={AudioIcon}></img><h1>Аудио</h1></button></NavLink></li>
            <li><NavLink to="/friends"><button onClick={() => setOpen(false)}><img width='30px' src={FriendsIcon}></img><h1>Друзья</h1></button></NavLink></li>
          </ul>
          }
          {session !== "connected" && 
            <button style={{border: 'none'}}><h1>Помощь</h1></button>
          }
        </nav>
    </div>
    )
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
            <VKLogin/>
          </nav>
        </main>
      </header>
    </div>
  )
}
const clickOutsideConfig = {
  handleClickOutside: () => Header.handleClickOutside
}


export default onClickOutside(Header, clickOutsideConfig)
