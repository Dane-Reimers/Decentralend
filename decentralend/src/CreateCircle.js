import React, { Component } from "react";
import logo from './part_logo.png';
 
class CreateCircle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      groupName: "",
      loading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  async handleSubmit(event) {
    this.state.loading = true
    this.props.lendingGroupManager.methods.createGroup(this.state.groupName, this.state.username)
    .send({ from: this.props.account, gas: 5000000})
    .once('receipt', (receipt) => {
      console.log(receipt)
      this.setState({groupName: "", username: ""})
      this.state.loading = false
    })
    event.preventDefault()
  }

  render() {
    return (
      <div>
      <div style={{position:"relative"}} id="makeGroup">
        <img src={logo} alt="" className="bigLogo"/>
        <div id="groupForm">
          <div className="sub-header"><b>Create a new lending group</b></div>
          <form onSubmit={this.handleSubmit}>
            <label>
              <input name="groupName" type="text" placeholder="Group name..." value={this.state.groupName} onChange={this.handleChange}/>
            </label>
            <br/>
            <label>
            <input name="username" type="text" placeholder="Your name..." value={this.state.username} onChange={this.handleChange}/>
            </label>
            <br/>
            <input id="submit" type="submit" value="Submit"/>
          </form>
      <div>
      </div>    
      </div>
      </div>
      </div>
    );
  }
}
 
export default CreateCircle;