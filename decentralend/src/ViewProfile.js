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
      totalBalance : 0
    };
  }

  componentWillMount() {
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
        group.name = groupName
        group.balance = _balance
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
          <div id="background"></div>
          <div id="mainBoxes">
            <div id="groupBox">
              <div className="sub-header" style={{width:"8em",marginBottom:"10px",fontSize:"6vmin"}}><b>Lending Groups</b></div>
              <div>
                {this.state.groups.map(function(group, idx){
                return (
                  <div key={idx}>
                    <NavLink className="group" to={`/group/${group._address}`}>{ group.name }</NavLink>
                  </div>
                )})}
              </div>
            </div>
            <div id="balanceBoxes"> 
              <div id="balanceBox">
                <div className="sub-header" style={{width:"8em",marginBottom:"10px",fontSize:"6vmin"}}><b>Balances</b></div>
                <div>
                  {this.state.groups.map(function(group, idx){
                  return (
                    <div key={idx}>
                      <div className="balance">{ group.name } - {group.balance.toString()}</div>
                    </div>
                  )})}
                </div>
              </div>
              <div id="totalBalance">
                <div className="sub-header" style={{fontSize:"4vmin"}}><b>Total Balance: </b> {this.state.totalBalance} </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
 
export default Home;