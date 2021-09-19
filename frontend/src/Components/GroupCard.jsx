import React, {useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {cleaner} from '../redux/actions'

//карточка группы
function GroupCard ({name, imgURL}) {
  // const initialState = localStorage.getItem(name) ? true : false
  const dispath = useDispatch()
  const cleanerCheck = useSelector((state) => state.clean)
  const inFavorites = localStorage.getItem(name) ? true : false

  function addFavoriteHandler () {
    if (localStorage.getItem(name)) {
      localStorage.removeItem(name)
    }
    else {
      localStorage.setItem(name, "group")
    }
    dispath(cleaner())  
  }
    return (
      <div className={inFavorites ? "container in__favorites" : "container"} onClick={addFavoriteHandler}>
        <div>
        <img alt="" src={imgURL} className={inFavorites ? "avatar in__favorites" : "avatar"} />
        </div>
        <div className="name"><b>{name}</b></div>
      </div>
    )
}

export default GroupCard