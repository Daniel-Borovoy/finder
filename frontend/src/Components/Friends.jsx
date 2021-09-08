import React from 'react';
import '../Styles/Friends.scss';
let groupArray = []; // массив избранных групп
function FavoritesGroups() {
    for (let i = 0; i < localStorage.length; i++) {
        let group = localStorage.key(i);
        if (localStorage.getItem(group) === 'false') {
            if (groupArray.includes(group)) {
                groupArray.splice(groupArray.indexOf(group), 1);
            }
        }
        else if (localStorage.getItem(group) === 'true') {
            if (!groupArray.includes(group)) {
                groupArray.push(group);
            }
        }
    }
    const groupList = groupArray.map((group, i) => {return <li key={i + 1}>{group}</li>});
    return (
        <div>{groupList}</div>
    );
    }
    
class Friends extends React.Component {
    constructor (props) {
        super(props);
        this.state = {}
    }

    render () {
        return (
        <>
            <div className="favorite_list">
                <ul>
                    <h1>Избранные группы</h1>
                    <FavoritesGroups/>
                </ul>
            </div>
            
            <section>
                <div className="section__body">
                    
                </div>
            </section>
        </>
        );
    }
}

export default Friends;
