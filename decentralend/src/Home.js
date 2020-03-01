import React, { Component } from "react";
import background_img from './prefumo_canyon.jpg';
import logo from './part_logo.png';
 
class Home extends Component {
  render() {
    return (
      <div>
        <div className="background">
          <img src={background_img} alt="" className="backgroundImg"/>
          <div className="overlap">Peer to Peer Lending</div>
          <div className="overlap2">Removing Systemic Bias From Loans</div>
        </div>
        <div id="about">
          <div id="mission">Lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          <br /><br />
          lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          </div>
          <img src={logo} alt="" className="bigLogo"/>
          <h3>There are { this.props.numGroups } group(s)</h3>
        </div>
      </div>
    );
  }
}
 
export default Home;