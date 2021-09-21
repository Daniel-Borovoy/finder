import React, { useEffect, useState } from 'react'
import GroupCard from './GroupCard'
import "../Styles/GroupCard.scss"
import {connect, useDispatch, useSelector} from 'react-redux'
import {cleaner} from '../redux/actions'
import '../Styles/GroupsList.scss'

const VK = window.VK
let groupCount = "200"
let groupArray = []
let dataLoaded = false

const GroupsList = () => {
    const dispatch = useDispatch()
    const clean = useSelector((state) => state.clean)
    const localStorageLenght = localStorage.length
    const [loading, setLoading] = useState(dataLoaded ? false : true)
    const data = useSelector((state) => state.userDataVK)
    const session = data.status

    function getGroups() {
      if (!dataLoaded) {
        dataLoaded = true
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
              setLoading(false)
            }
          })
        }
      })
    }


    function clearFavoriteListHandler () {
      localStorage.clear()
      dispatch(cleaner())
    }

    if (session !== "connected") {
      groupArray = []
      dataLoaded = false
    }

    if (!dataLoaded && session === "connected") {
      getGroups()
    }
   
    if(session === "connected" && !loading) {
      return (
        <section className="group_list">
          <div className="group_list__body">
            {groupArray}
            <button className={localStorageLenght ? "cleanButton" : "cleanButton disable"} onClick={clearFavoriteListHandler}>Очистить всё</button>
          </div>
        </section>
      )
    }
    if (session === "not_authorized" || session === "unknown") {
      return null
    }
    return (
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div> // это лоадер
    )
}

export default GroupsList