import React, { Component } from "react";
import './App.css';
import Iframe from "react-iframe";
import background_img from './prefumo_canyon.jpg';
import logo from './part_logo.png';
 
class Carbon extends Component {
  render() {
    return (
        <div class="center">
        <iframe class="iframe"
        src="https://buy.carbon.money/?tokens=eth&homeScreenMessage=Woohoo"
        width="101%"
        height="6000px"
        allow="fullscreen">
    </iframe>
    </div>
    )
  }
}
export default Carbon;