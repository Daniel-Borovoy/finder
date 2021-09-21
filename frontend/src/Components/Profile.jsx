import React, { useEffect, useState } from 'react'
import '../Styles/Profile.scss'
import { useSelector } from 'react-redux'

let userAvatar
let userFirstName
let userLastName
let userCity

const Profile = () => {
    const [loading, setLoading] = useState(true)
    const userDataVK = useSelector((state) => state.userDataVK)
    function getUserProfileData (r) {
        if (r.session) {
            VK.Api.call('users.get', { user_ids: r.session.mid, fields: ['city', 'crop_photo'], v: '5.131' }, (r) => {
                if (r.response) {
                    userAvatar = r.response[0].crop_photo.photo.sizes[3].url
                    userFirstName = r.response[0].first_name
                    userLastName = r.response[0].last_name
                    userCity = r.response[0].city.title
                    setLoading(false)
                }
            })
        }
    }
    useEffect (() => getUserProfileData(userDataVK), [])
    if (!loading) {
        return (
            <section className="user_profile">
                <div className="user_profile__body">
                    <div className="user_profile__bar">
                        <img src={userAvatar} alt="" />
                        <h1 className="user_nickname">{userFirstName} {userLastName}</h1>
                        <h1>{userCity}</h1>
                    </div>
                    <div className="user_profile__content"></div>
                </div>
            </section>
        )
    }
    return <div className="lds-ring"><div></div><div></div><div></div><div></div></div> // тут желаетльно нормальный лоадер профиля
    
}

export default Profile