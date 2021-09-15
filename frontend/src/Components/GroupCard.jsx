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
            {/* Delete button */}
            <button className={inFavorites ? "close active" : "close"} onClick={this.addFavoriteHandler} style={{color: '#fff'}}><svg width="30pt" height="30pt" version="1.0" viewBox="0 0 1280 1280" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1280) scale(.1 -.1)" fill="#ff5722"><path d="m2717 12790c-85-15-190-51-272-92-78-39-100-60-1128-1092-576-578-1068-1078-1093-1110-66-86-92-134-124-229-97-286-43-606 153-900 53-80 245-277 1477-1516 778-783 1415-1427 1415-1431s-631-634-1402-1398c-772-765-1428-1419-1458-1453-324-363-376-885-121-1213 50-64 2041-2024 2146-2113 166-140 425-208 661-174 179 26 383 114 525 227 37 30 701 684 1476 1455l1410 1402 227-229c125-126 504-508 841-849 1599-1615 1798-1812 1905-1884 112-75 229-128 361-162 74-20 113-24 234-23 127 1 156 4 233 27 109 34 185 71 262 132 89 69 2110 2120 2157 2189 220 321 186 767-86 1126-41 54-582 607-1466 1499l-1402 1414 84 84c45 46 690 686 1432 1421 891 884 1369 1365 1410 1419 106 141 182 314 211 482 40 228-9 453-139 635-42 59-2053 2064-2152 2146-129 106-322 170-517 170-224 0-478-92-677-245-35-27-696-680-1471-1452l-1408-1404-653 658c-359 362-931 939-1272 1283-891 900-940 948-1038 1013-187 125-368 185-573 192-66 2-142 0-168-5z"/></g></svg></button>
            </div>
        );
    }
}
const mapDispatchToProps = {
  cleaner
}
const mapStateToProps = (state) => ({ clean: state.clean });

export default connect(mapStateToProps, mapDispatchToProps)(GroupCard);