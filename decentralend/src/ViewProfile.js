import React, { Component } from "react";
 
class Home extends Component {
  render() {
    return (
      <div>
        <h2>Profile</h2>
        <h3>Your account number is: { this.state.account }</h3>
      </div>
    );
  }
}
 
export default Home;