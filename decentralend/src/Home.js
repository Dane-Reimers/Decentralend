import React, { Component } from "react";
import background_img from './prefumo_canyon.jpg';
 
class Home extends Component {
  render() {
    return (
      <div>
        <div className="background">
          <img src={background_img} className="backgroundImg"/>
          <div className="overlap">Peer to Peer Lending</div>
          <div className="overlap2">Removing Systemic Bias from Loans</div>
        </div>
        <h2>Home</h2>
        <h3>There are { this.props.numGroups } group(s)</h3>
      </div>
    );
  }
}
 
export default Home;