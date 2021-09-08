import React from "react";

//          карточка группы
class GroupCard extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        inFavorites: false
      }
      this.addFavoriteHandler = this.addFavoriteHandler.bind(this);
    }
    
    componentDidMount () {
      if (localStorage.getItem(`${this.props.name}`) === 'true') {
        this.setState({
          inFavorites: true
        });
      }
    }
    

    addFavoriteHandler () {
      const inFavorites = this.state.inFavorites;
      localStorage.setItem(`${this.props.name}`, !inFavorites);
      this.setState({inFavorites: !inFavorites});
    }
  
    render () {
        const inFavorites = localStorage.getItem(`${this.props.name}`) === 'true' ? true : false;
        return (
            <div style={{position: "relative"}} >
                {/* Card */}
            <div className={inFavorites ? "container in__favorites" : "container"} onClick={this.addFavoriteHandler}>
                <div>
                <img alt="" src={this.props.imgURL} className="avatar" />
                </div>
                <div className="name"><b>{this.props.name}</b></div>
            </div>
            {/* Close button */}
            <button className={inFavorites ? "close active" : "close"} onClick={this.addFavoriteHandler} style={{color: '#fff'}}>DELETE</button>
            </div>
        );
    }
}

export default GroupCard;