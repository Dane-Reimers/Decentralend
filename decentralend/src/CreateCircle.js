import React, { Component } from "react";
 
class CreateCircle extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({groupName: event.target.value})
  }

  async handleSubmit(event) {
    console.log(this.props.account)
    this.state.loading = true
    this.props.lendingGroupManager.methods.createGroup(this.state.groupName).send({ from: this.props.account })
    .once('receipt', (receipt) => {
      console.log(receipt)
      this.state.loading = false
    })
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <br/>
          <input type="text" value={this.state.groupName || ""} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
 
export default CreateCircle;