import React, { Component } from "react";
import {
  Route,
  NavLink,
} from "react-router-dom";
import { LENDING_GROUP_ABI } from "./config";
import ViewGroup from "./ViewGroup"
 
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      setGroupsCalled: false,
      totalBalance = -1337
    };
  }

  componentWillMount() {
    this.setState({setGroupsCalled: true})
    this.setGroups()
  }

  async setGroups() {
    const numGroups = await this.props.lendingGroupManager.methods.getNumGroups().call()
    for (let id = 1; id <= numGroups; id++) {
      const groupAddress = await this.props.lendingGroupManager.methods.getGroup(id).call()
      const group = new this.props.web3.eth.Contract(LENDING_GROUP_ABI, groupAddress)
      const inGroup = await this.inGroup(group)
      if (inGroup) {
        const groupName = await group.methods.name().call()
        const _balance = await group.methods.getBalance(this.props.account);
        let newBalance = _balance + this.state.balance;
        this.setState({balace: newBalance});
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
        <div id="profile">
          <div className="sub-header"><b>Profile</b></div>
          <div id="accName">Your account number is: { this.props.account }</div>
          <div>
          {this.state.groups.map(function(group, idx){
          return (
            <div key={idx}>
              <NavLink className="nav" to={`/group/${group._address}`}>{ group.name }</NavLink>
            </div>
          )})}
        </div>
        </div>
      </div>
    );
  }
}
 
export default Home;