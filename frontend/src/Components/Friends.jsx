import React from 'react';
import '../Styles/Friends.scss';
let groupArray = []; // массив избранных групп
function FavoritesGroups() {
    for (let i = 0; i <= localStorage.length; i++) {
        if (localStorage.key(i) && !groupArray.includes(localStorage.key(i))) {
            groupArray.push(localStorage.key(i));
        }
    }
    const groupList = groupArray.map((group, i) => {return <li key={i + 1}>{group}</li>});
    if (groupArray.length) {
        return (
            <>
            
            
            <div className="favorite_list">
                <h1>Избранные группы</h1>
                <ul>{groupList}</ul>
            </div>
            </>
        );
    }
    return null;
    }
    
class Friends extends React.Component {
    constructor (props) {
        super(props);
        this.state = {}
    }
    componentWillUnmount () {
        groupArray = [];
    }
    render () {
        return (
        <>
            <FavoritesGroups />
            <section> 
                <div className="section__body" style={{height: '3000px', width: '200px'}}>
                    
                </div>
            </section>
        </>
        );
    }
}

export default Friends;
