import React, { Component } from "react";
import Web3 from 'web3';
import { LENDING_GROUP_ABI } from "./config";
 
class Home extends Component {
  constructor(props) {
    super(props);
    this.groups = []
  }

  componentWillUpdate() {
    if (this.props.lendingGroupManager != undefined &&
        this.props.account != undefined)
    {
      this.setGroups()
    }
  }

  async setGroups() {
    const numGroups = await this.props.lendingGroupManager.methods.getNumGroups().call()
    for (let id = 1; id <= numGroups; id++) {
      this.checkIfInGroup(id)
    }
  }

  async checkIfInGroup(id) {
    const groupAddress = await this.props.lendingGroupManager.methods.getGroup(id).call()
    const group = new this.props.web3.eth.Contract(LENDING_GROUP_ABI, groupAddress)
    const inGroup = await group.methods.memberInGroup(this.props.account).call()
    if (inGroup) {
      this.groups.push(group)
      console.log(group)
    }
  }

  render() {
    return (
      <div>
        <h2>Profile</h2>
        <h3>Your account number is: { this.props.account }</h3>
        <div>
          {this.groups.map((group, index) => (
            <p>{{ group }}</p>
          ))}
        </div>
      </div>
    );
  }
}
 
export default Home;