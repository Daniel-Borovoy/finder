import React, { useState } from 'react'
import onClickOutside from 'react-onclickoutside'
import useMediaQuery from 'react-use-media-query-hook'
import '../Styles/VKLogin.scss'
// мобильные иконки
import HelpIcon from '../images/help.png'
import SettingsIcon from '../images/settings.png'
import ExitIcon from '../images/exit.png'
import { useDispatch, useSelector } from 'react-redux'
import { userDataVK } from '../redux/actions'
import { NavLink } from 'react-router-dom'
// данные юзера
let profileFirstName
let profileLastName
let profileSRC // ссылка на аватар юзера

function VKLogin ()  {
  const dispath = useDispatch()
  const VK = window.VK
  const data = useSelector((state) => state.userDataVK)
  const session = data.status
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [openSubmenu, setOpenSubmenu] = useState(false) // для мобилок
  const isMobile = useMediaQuery('(max-width: 767px)')
  // const isTablet = useMediaQuery('(min-width: 401px) and (max-width: 640px)')
  // const isDesktop = useMediaQuery('(min-width: 641px) and (max-width: 1024px)')
  // const isLargeDesktop = useMediaQuery('(min-width: 1025px)')
  VKLogin.handleClickOutside = () => setOpen(false)

  function getTopMenuData (r) {
    // запрос аватарки и имени юзера
    VK.Api.call('users.get', { user_ids: r.session.mid, fields: 'photo_50', v: '5.131' }, (r) => {
      if (r.response) {
        profileSRC = r.response[0].photo_50
        profileFirstName = r.response[0].first_name
        profileLastName = r.response[0].last_name
        setLoading(false)
      }
    })
  }

  function onClickButton() {
        // если пользователь авторизирован - выходим, не авторизирован - заходим
        if (session === "connected") {
          VK.Auth.logout((r) => {
            profileSRC = ''
            localStorage.clear()
            setOpen(false)
            setLoading(false)
            dispath(userDataVK(r))
          })
        }
        else {
          VK.Auth.login((r) => {
            if (r.session) {
              /* Пользователь успешно авторизовался */
              getTopMenuData(r)
              dispath(userDataVK(r))
              if (r.settings) {
                /* Выбранные настройки доступа пользователя, если они были запрошены */
              }
            } else {
              /* Пользователь нажал кнопку Отмена в окне авторизации */
            }
          }, 2 + 4 + 8 + 16 + 262144)
          // числа выше - битовые маски прав доступа https://vk.com/dev/permissions
        }
      }


  if (session === "connected" && loading) {
    getTopMenuData(data)
  }

  // при успешной проверке
  if (session === "connected") {
    if (isMobile) {
      return (
        <div className="mobile_profile">
          <img src={profileSRC} alt="" />
          <div className="mobile_profile__name" onClick={() => setOpenSubmenu(!openSubmenu)}>
            <h4>{profileFirstName} {profileLastName}</h4>
            <svg className={openSubmenu ? "arrow rotate" : "arrow"} fill="none" height="8" viewBox="0 0 12 8" width="12" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M2.16 2.3a.75.75 0 011.05-.14L6 4.3l2.8-2.15a.75.75 0 11.9 1.19l-3.24 2.5c-.27.2-.65.2-.92 0L2.3 3.35a.75.75 0 01-.13-1.05z" fill="currentColor" fillRule="evenodd"></path></svg>
          </div>
          <div className={openSubmenu ? "mobile_submenu open" : "mobile_submenu"}>
            <button onClick={() => setOpen(!open)}><img src={SettingsIcon}></img><h1>Настройки</h1></button>
            <button onClick={() => setOpen(!open)}><img src={HelpIcon}></img><h1>Помощь</h1></button>
            <button onClick={() => setOpen(!open)} onClick={onClickButton}><img src={ExitIcon}></img><h1>Выйти</h1></button>
          </div>
        </div>
      )
    }
    return (
        <div className={open ? "profile open" : "profile"} >
          <div className="profileButton" onClick={() => setOpen(!open)}>
            <h3>{profileFirstName}</h3>
            <img src={profileSRC} alt="" />
            <svg className={open ? "arrow rotate" : "arrow"} fill="none" height="8" viewBox="0 0 12 8" width="12" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M2.16 2.3a.75.75 0 011.05-.14L6 4.3l2.8-2.15a.75.75 0 11.9 1.19l-3.24 2.5c-.27.2-.65.2-.92 0L2.3 3.35a.75.75 0 01-.13-1.05z" fill="currentColor" fillRule="evenodd"></path></svg>
          </div>
          <div className={open ? "top_profile_menu open" : "top_profile_menu"}>
            <div className="top_profile_sep"></div>
            
            <NavLink to="/profile"><button onClick={() => setOpen(!open)}>Профиль</button></NavLink>
            <button onClick={() => setOpen(!open)}>Настройки</button>
            <button onClick={() => setOpen(!open)}>Помощь</button>
            <div className="top_profile_sep"></div>
            <button onClick={() => setOpen(!open)} onClick={onClickButton}>Выйти</button>
          </div>
        </div>
    )
  }

  // пользователь авторизован ВКонтакте, но не разрешил доступ приложению
  if (session === "not_authorized") {
    return (
        <div className="login_button" id='vk'>
          <button type="button" style={{backgroundColor: "blue"}} onClick={onClickButton}>Авторизоваться в ВК</button>
        </div>
    )
  }
  //пользователь не авторизован ВКонтакте
  if(session === "unknown") {
    return (
        <div className="login_button" id='vk'>
          <button type="button" style={{backgroundColor: "blue"}} onClick={onClickButton}>Для входа нужен аккаунт ВК</button>
        </div>
    )
  }
  return null
}

const clickOutsideConfig = {
  handleClickOutside: () => VKLogin.handleClickOutside
}

export default onClickOutside(VKLogin, clickOutsideConfig)
