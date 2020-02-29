import React, { Component } from 'react'
import {
  Route,
  HashRouter,
  NavLink,
} from "react-router-dom";
import Web3 from 'web3';
import './App.css';
import { LENDING_GROUP_MANAGER_ABI, LENDING_GROUP_MANAGER_ADDRESS } from './config';
import Home from './Home';
import CreateCircle from './CreateCircle';
import logo from './full_logo.png';
import ViewProfile from './ViewProfile';

class App extends Component {
  componentDidMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    //const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const web3 = new Web3("http://localhost:8545")
    this.setState({ web3 })
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const lendingGroupManager= new web3.eth.Contract(LENDING_GROUP_MANAGER_ABI, LENDING_GROUP_MANAGER_ADDRESS)
    this.setState({ lendingGroupManager})
    const numGroups = await lendingGroupManager.methods.getNumGroups().call()
    this.setState({ numGroups })
  }

  constructor(props) {
    super(props)
    this.state = { account: '' }
  }

  render() {
    return (
      <HashRouter>
        <div>
          <body className="header">
            <img src={logo} alt="Decentralized" className="logo"/>
            <body className="nav">
              <NavLink to="/home">Home</NavLink>
              <NavLink to="/create-circle">Create Circle</NavLink>
              <NavLink to="/profile">Profile</NavLink>
            </body>
          </body>
          <div className="content">
            <Route exact path="/home" render={props =>
                <Home numGroups={this.state.numGroups} {...props} />
              }
            />
            <Route exact path="/create-circle" render={props =>
                <CreateCircle lendingGroupManager={this.state.lendingGroupManager} account={this.state.account} {...props} />
              }
            />
            <Route exact path="/profile" render={props =>
                <ViewProfile lendingGroupManager={this.state.lendingGroupManager} web3={this.state.web3} account={this.state.account} {...props} />
              }
            />
          </div>
        </div>

      </HashRouter>
    );
  }
}

export default App;