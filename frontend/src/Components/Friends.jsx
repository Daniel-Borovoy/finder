import React, { useEffect } from 'react'
import '../Styles/Friends.scss'
let groupArray = [] // массив избранных групп
const FavoritesGroups = () => {
    for (let i = 0; i <= localStorage.length; i++) {
        if (localStorage.key(i) && !groupArray.includes(localStorage.key(i))) {
            groupArray.push(localStorage.key(i))
        }
    }
    const groupList = groupArray.map((group, i) => {return <li key={i + 1}>{group}</li>})
    if (groupArray.length) {
        return (
            <div className="favorite_list">
                <h1>Избранные группы</h1>
                <ul>{groupList}</ul>
            </div>
        )
    }
    return null
    }
    
const Friends = () => {
    useEffect(()=> {
        return groupArray = []
    })
    return (
        <>
            <FavoritesGroups />
            <section className="friends">
                <div className="friends_body"></div>
            </section>
        </>
    )
    
}

export default Friends
