import React from 'react'
import './Profile.scss'

export const Profile = () => {
    return (
        <section className="user_profile">
            <div className="user_profile__body">
                <div className="user_profile__bar">
                    {/*<img src={userAvatar} alt=""/>*/}
                    {/*<h1 className="user_nickname">{userFirstName} {userLastName}</h1>*/}
                    {/*<h1>{userCity}</h1>*/}
                </div>
                <div className="user_profile__content"></div>
            </div>
        </section>
    )
}