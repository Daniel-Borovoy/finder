import React from 'react';

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
        <section>
            <div className="section__body">
                <ul>
                    <h1>Список избранных групп:</h1>
                    <FavoritesGroups/>
                </ul>
            </div>
        </section>
        );
    }
}

export default Friends;
