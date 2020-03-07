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
          <div id="mission"> <div id="mission-header">1.7 billion.</div>
          <br /><br />
          The number of people in the world who do not have the means to access or open a bank account. 1.7 billion people, victims of systemic variables out of their control. This inability to hold a bank account causes a snowball effect, embedding them further in poverty.  
          <div id="mission-subheader">Until now.</div>
          Decentralend promises a solution to those unbanked, to those who have been victims of an endless cycle of an unjust monetary system. Decentralend offers a truly decentralized, zero collateral, zero interest loan system. Loans across towns, loans across cities, loans across the world. Money for all.
          </div>
          <img src={logo} alt="" className="bigLogo"/>
          <h3>There are { this.props.numGroups } group(s)</h3>
        </div>
      </div>

    );
  }
}
 
export default Home;