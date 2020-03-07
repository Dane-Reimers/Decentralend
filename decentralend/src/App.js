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
import Carbon from './Carbon';
import logo from './full_logo.png';
import ViewProfile from './ViewProfile';
import ViewGroup from './ViewGroup';

class App extends Component {
  componentDidMount() {
    this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider)
    //const web3 = new Web3("http://localhost:8545")
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
        <head>
        <link href="https://fonts.googleapis.com/css?family=Arvo|Roboto&display=swap" rel="stylesheet"/>
        </head>
        <div >
          <div className="header" id="Header">
            <img src={logo} alt="Decentralized" className="logo"/>
            <div style={{flexGrow:1}}></div>
            <div className="navBar">
              <NavLink className="nav" to="/">Home</NavLink>
              <NavLink className="nav" to="/create-group">Create Group</NavLink>
              <NavLink className="nav" to="/profile">Profile</NavLink>
              <NavLink className="nav" to="/carbon">Buy Eth</NavLink>
            </div>
          </div>
          <div className="content">
            <Route exact path="/" render={props =>
                <Home numGroups={this.state.numGroups} {...props} />
              }
            />
            <Route exact path="/create-group" render={props =>
                <CreateCircle lendingGroupManager={this.state.lendingGroupManager} account={this.state.account} {...props} />
              }
            />
            <Route exact path="/profile" render={props =>
                this.state.lendingGroupManager && 
                <ViewProfile lendingGroupManager={this.state.lendingGroupManager} web3={this.state.web3} account={this.state.account} {...props} />
              }
            />
            <Route exact path="/group/:address" render={props =>
                this.state.web3 && this.state.account &&
                <ViewGroup web3={this.state.web3} account={this.state.account} {...props} />
              }
            />
            <Route exact path="/carbon" render={props => 
                this.state.web3 && this.state.account &&
              <Carbon web3={this.state.web3} account={this.state.account} {... props} />
            }
            />
          </div>
        </div>
        
<script src="/__/firebase/7.9.3/firebase-app.js"></script>
<script src="/__/firebase/7.9.3/firebase-analytics.js"></script>
<script src="/__/firebase/init.js"></script>
      </HashRouter>
    );
  }
}

export default App;