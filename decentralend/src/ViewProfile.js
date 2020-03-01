import React, { Component } from "react";
import {
  Route,
  NavLink,
} from "react-router-dom";
import { LENDING_GROUP_ABI } from "./config";
import ViewGroup from "./ViewGroup"
import logo from './part_logo.png';
 
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      balanceByGroup: [],
      setGroupsCalled: false,
      totalBalance : -1337
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
        const _balance = await group.methods.getBalance(this.props.account).call();
        let newBalance = _balance + this.state.balance;
        this.setState({balace: newBalance});
        group.name = groupName
        const groupBalString = 'You have a balance of: ' + _balance.toString() + ' in the group: ' + groupName;
        const prevGroupBalString = this.state.balanceByGroup;
        const prevGroups = this.state.groups
        this.setState({balanceByGroup: [...prevGroupBalString, groupBalString]})
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
          <img src={logo} alt="" className="bigLogo"/>
          <div id="groupBox">
            <div className="sub-header" style={{width:"5.5em",marginBottom:"10px",fontSize:"7vmin"}}><b>Your Groups</b></div>
            <div>
              {this.state.groups.map(function(group, idx){
              return (
                <div key={idx}>
                  <NavLink className="group" to={`/group/${group._address}`}>{ group.name }</NavLink>
                </div>
              )})}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
 
export default Home;