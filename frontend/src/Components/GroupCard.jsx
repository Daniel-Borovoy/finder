import React from "react";
import { connect } from "react-redux";
import {cleaner} from '../redux/actions';

//  карточка группы
class GroupCard extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        inFavorites: false
      }
      this.addFavoriteHandler = this.addFavoriteHandler.bind(this);
    }
    
    componentDidMount () {
      if (localStorage.getItem(`${this.props.name}`)) {
        this.setState({
          inFavorites: true
        });
      }
    }
    
    addFavoriteHandler () {
      if (localStorage.getItem(`${this.props.name}`)) {
        localStorage.removeItem(`${this.props.name}`);
        this.setState({inFavorites: false});
      }
      else {
        localStorage.setItem(`${this.props.name}`, "group");
        this.setState({inFavorites: true});
      }
      this.props.cleaner();
    }
  
    render () {
        const inFavorites = localStorage.getItem(`${this.props.name}`) ? true : false;
        return (
            <div style={{position: "relative"}} >
                {/* Card */}
            <div className={inFavorites ? "container in__favorites" : "container"} onClick={this.addFavoriteHandler}>
                <div>
                <img alt="" src={this.props.imgURL} className={inFavorites ? "avatar in__favorites" : "avatar"} />
                </div>
                <div className="name"><b>{this.props.name}</b></div>
            </div>
            </div>
        );
    }
}
const mapDispatchToProps = {
  cleaner
}
const mapStateToProps = (state) => ({ clean: state.clean });

export default connect(mapStateToProps, mapDispatchToProps)(GroupCard);