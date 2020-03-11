import React, { Component } from "react";
import logo from './part_logo.png';
 
class CreateCircle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      hasAccount: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.hasAccount().then(() =>
    this.getUserName()
    );
  }

  async hasAccount() {
    const accountExists = await this.props.
                        LendingGroupManger.
                        methods.accountExists().call();
    this.setState({hasAccount: accountExists});
  }

  async getUserName() {
      const _name = await this.props.
                        LendingGroupManger.
                        methods.getName().call();
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  async handleSubmit(event) {
    this.state.loading = true
    event.preventDefault()
  }

  render() {
    if (this.state.hasAccount) {
        return (
            <div><h1>Hello, {this.state.username}</h1>
            <h1>It appears you already have an account!</h1>
            <NavLink className="nav" to="/profile">Click Here to View Your Profile</NavLink>
            </div>
        );
    }
    else {
        return (
            <div>
            
            </div>
        );
    }

    }
}
 
export default GettingStarted;