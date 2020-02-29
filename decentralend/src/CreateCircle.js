import React, { Component } from "react";
 
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
    .send({ from: this.props.account, gas: 1000000})
    .once('receipt', (receipt) => {
      console.log(receipt)
      this.setState({groupName: "", username: ""})
      this.state.loading = false
    })
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Group Name:
          <br/>
          <input name="groupName" type="text" value={this.state.groupName} onChange={this.handleChange}/>
        </label>
        <br/>
        <br/>

        <label>
          Your Name:
          <br/>
          <input name="username" type="text" value={this.state.username} onChange={this.handleChange}/>
        </label>
        <br/>

        <input type="submit" value="Submit"/>
      </form>
    );
  }
}
 
export default CreateCircle;