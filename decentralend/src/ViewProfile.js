import React, { Component } from "react";
import Web3 from 'web3';
import { LENDING_GROUP_ABI } from "./config";
 
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      setGroupsCalled: false
    };
  }

  componentWillReceiveProps() {
    if (this.props.lendingGroupManager != undefined &&
        this.props.account != undefined &&
        !this.state.setGroupsCalled)
    {
      this.setState({setGroupsCalled: true})
      this.setGroups()
    }
  }

  async setGroups() {
    const numGroups = await this.props.lendingGroupManager.methods.getNumGroups().call()
    for (let id = 1; id <= numGroups; id++) {
      const groupAddress = await this.props.lendingGroupManager.methods.getGroup(id).call()
      const group = new this.props.web3.eth.Contract(LENDING_GROUP_ABI, groupAddress)
      const inGroup = await this.inGroup(group)
      if (inGroup) {
        const groupName = await group.name()
        group.name = groupName
        const prevGroups = this.state.groups
        this.setState({groups: [...prevGroups, group]})
      }
    }
  }

  async inGroup(group) {
    const inGroup = await group.methods.memberInGroup(this.props.account).call()
    return inGroup
  }

  render() {
    return (
      <div>
        <h2>Profile</h2>
        <h3>Your account number is: { this.props.account }</h3>
        <div>
          {this.state.groups.map(function(group, idx){
          return (<div key={idx}>{group._address}</div>)
          })}
        </div>
      </div>
    );
  }
}
 
export default Home;