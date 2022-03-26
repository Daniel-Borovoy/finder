import React, {FC, useState} from 'react'
import {NavLink} from "react-router-dom";
import './AppBarMenu.scss'

export const AppBarMenu: FC = () => {

    const [open, setOpen] = useState(false);
    return (
        <div className={open ? "profile open" : "profile"}>
            <div className="profileButton" onClick={() => setOpen(!open)}>
                {/*<h3>{profileFirstName}</h3>*/}
                {/*<img src={profileSRC} alt=""/>*/}
                <svg className={open ? "arrow rotate" : "arrow"} fill="none" height="8" viewBox="0 0 12 8" width="12"
                     xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd"
                          d="M2.16 2.3a.75.75 0 011.05-.14L6 4.3l2.8-2.15a.75.75 0 11.9 1.19l-3.24 2.5c-.27.2-.65.2-.92 0L2.3 3.35a.75.75 0 01-.13-1.05z"
                          fill="currentColor" fillRule="evenodd"></path>
                </svg>
            </div>
            <div className={open ? "top_profile_menu open" : "top_profile_menu"}>
                <div className="top_profile_sep"></div>

                <NavLink to="/profile">
                    <button onClick={() => setOpen(!open)}>Профиль</button>
                </NavLink>
                <button onClick={() => setOpen(!open)}>Настройки</button>
                <button onClick={() => setOpen(!open)}>Помощь</button>
                <div className="top_profile_sep"></div>
                <button onClick={() => setOpen(!open)}>Выйти</button>
            </div>
        </div>
    )
}

