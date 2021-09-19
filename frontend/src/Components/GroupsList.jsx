import React, { useEffect, useState } from 'react'
import GroupCard from './GroupCard'
import "../Styles/GroupCard.scss"
import {connect, useDispatch, useSelector} from 'react-redux'
import {cleaner} from '../redux/actions'
import '../Styles/GroupsList.scss'

const VK = window.VK
let groupCount = "200"
let groupArray = []
let hasLock = false

function GroupsList ({session, data}) {
    const clean = useSelector((state) => state.clean)
    const localStorageLenght = localStorage.length
    const [haveData, setHaveData] = useState(hasLock ? true : false)
    const dispath = useDispatch()
    // const [loading, setLoading] = useState(true)
    // useEffect(() => {
    //   return hasLock = false
    // })
    function getGroups() {
      if (!hasLock) {
        hasLock = true
      }
      const userId = data.session.mid
      VK.Api.call('groups.get', { user_ids: userId, count: groupCount, v: '5.131' }, (r) => {
        if (r.response) {
          if (groupCount > r.response.count) {
            groupCount = r.response.count
          }
        VK.Api.call('groups.getById', { group_ids: r.response.items, v: '5.131' }, (r) => {
            if(r.response) {
              for (let i = 0; i < groupCount; i++) {              
                groupArray.push(             
                  <GroupCard key={i + 1} name={r.response[i].name} imgURL={r.response[i].photo_100}/>
                )
              }
              setHaveData(true)
            }
          })
        }
      })
    }


    function clearFavoriteListHandler () {
      localStorage.clear()
      dispath(cleaner())
    }


    if (session !== "connected") {
      hasLock = false
      groupArray = []
    }

    if (!hasLock && session === "connected") {
      getGroups()
    }
   
    if(session === "connected" && haveData) {
      return (
        <div className="group_list">
          {groupArray}
          <button className={localStorageLenght ? "cleanButton" : "cleanButton disable"} onClick={clearFavoriteListHandler}>Очистить всё</button>
        </div>
      )
    }
    if (session === "not_authorized") {
      return null
    }
    if (session === "unknown") {
      return null
    }
    return (
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div> // это лоадер
    )
}

export default GroupsList