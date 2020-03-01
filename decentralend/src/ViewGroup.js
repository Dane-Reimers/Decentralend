import React, { Component } from "react";
import { LENDING_GROUP_ABI } from "./config";
import Select from 'react-select';
import 'react-dropdown/style.css'
import Member from "./Member";
import Request from "./Request";

class ViewGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: "",
            lendingGroup: null,
            requests: [],
            members: [],
            memAddresses: [],
            name: "",
            setGroupCalled: false,
            addRequestAmount: 0,
            requestAmounts: [],
            addMemberName: "",
            addMemberAddress: "",
            requestOptions: [],
            requestOption: null,
            loanAmount: 0
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleRequest = this.handleRequest.bind(this);
        this.handleAddMember = this.handleAddMember.bind(this);
        this.handleDonate = this.handleDonate.bind(this);
    }

    componentWillMount() {
        this.setState({setGroupCalled: true})
        this.setGroup().then(() =>
        this.setMemberAddresses().then(() => 
        this.setMembers().then(() => 
        this.setMemberRequests().then(() => 
        this.setGroupName()))))
      }

    async setGroupName() {
        const groupName = await this.state.lendingGroup.methods.name().call()
        this.setState({groupName: groupName})
    }

    async setMemberAddresses() {
        const addresses = await this.state.lendingGroup.methods.getMemberAddresses().call()
        this.setState({memAddresses: addresses})
    }

    async setGroupName() {
        const _name = await this.state.lendingGroup.methods.name().call();
        this.setState({groupName: _name})
    }

    async setGroup() {
        const groupAddress = this.props.match.params.address
        const group = await (new this.props.web3.eth.Contract(LENDING_GROUP_ABI, groupAddress))
        this.setState({lendingGroup: group})
    }

    async setMembers() {
        let members = []
        for (let id = 0; id < this.state.memAddresses.length; id++) {
            let memberTuple = await this.state.lendingGroup.methods.getMember(this.state.memAddresses[id]).call();
            var member = new Member(memberTuple[0], memberTuple[1]);
            console.log(this.state.memAddresses[id])
            members.push(member)
        }
        this.setState({members})
    }

    async setMemberRequests() {
        let requests = []
        let requestAmounts = []
        let requestOptions = []
        for (let id = 0; id < this.state.memAddresses.length; id++) {
            const memAddress = this.state.memAddresses[id]
            const requestTuple = await this.state.lendingGroup.methods.getRequest(memAddress).call()
            if (requestTuple[0] != 0) {
                const requestor = await this.state.lendingGroup.methods.getMember(memAddress).call()
                const request = new Request(requestor[0], memAddress, requestTuple[0], requestTuple[1])
                this.state.members[id].request = request
                requests.push(request)
                requestAmounts.push(0)
                requestOptions.push({value: request, label: requestor[0]})
            }
        }
        this.setState({requestOptions})
        this.setState({requestAmounts})
        this.setState({requests})
    }

    async handleRequest(event) {
        event.preventDefault()
        const amount = this.state.addRequestAmount
        this.state.lendingGroup.methods.requestMoney(amount).send({ from: this.props.account, gas: 100000 });
        this.setState({addRequestAmount: 0})
    }

    async handleDonate(event) {
        event.preventDefault()
        const requesterAddress = this.state.requestOption.value.requesterAddress
        console.log(this.state.requestOption)
        const amount = this.state.loanAmount
        await this.state.lendingGroup.methods.giveMoney(requesterAddress)
            .send({from: this.props.account, gas: 100000, value: (amount / 1000)})
            .once('receipt', (receipt) => {
            console.log(receipt)
            this.setState({requestOption: null, loanAmount: 0})
            })
    }

    async handleAddMember(event) {
        event.preventDefault()
        const address = this.state.addMemberAddress
        const name = this.state.addMemberName
        await this.state.lendingGroup.methods.addMember(address, name)
            .send({from: this.props.account, gas: 100000})
            .once('receipt', (receipt) => {
            console.log(receipt)
            this.setState({addMemberAddress: "", addMemberName: ""})
            })
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSelectChange = requestOption => {
        this.setState({ requestOption });
      };

    render() {
        return (<div>
            <div>
              <div className="groupHeader"><b> { this.state.groupName }</b></div>
              <div id="groupData">
                <div id="memberList" className="groupList"> 
                    <div className="sub-header" style={{paddingBottom:"15px"}}>Group Members</div>
                    {this.state.members.map(function(member, idx){
                    return (
                        <div key={idx}>
                            <div className="listElem">{member.toString()}</div>
                        </div>
                    )})}
                </div>
                <div id="requestList" className="groupList">
                    <div className="sub-header" style={{paddingBottom:"15px"}}>Current Requests</div>
                    {this.state.requests.map(function(request, idx){
                    return (
                        <div key={idx}>
                            <div className="listElem">{request.toString()}</div>
                        </div>
                    )})}
                </div>
                <div id="addMember" className="groupList">
                <div className="sub-header">Add Member</div>
                    <form onSubmit={this.handleAddMember}>
                        <label>
                        <input name="addMemberName" type="text" placeholder="New member name..."
                            value={this.state.addMemberName} onChange={this.handleChange}/>
                        </label>
                        <label>
                        <input name="addMemberAddress" type="text" placeholder="New member address..."
                            value={this.state.addMemberAddress} onChange={this.handleChange}/>
                        </label>
                        <br/>
                        <input id="submit" type="submit" value="Submit"/>
                    </form>
                </div>
                <div id="manageRequests" className="groupList">
                    <div>
                        <div className="sub-header" style={{paddingBottom:"15px"}}>Lend</div>
                        <form onSubmit={this.handleDonate}>
                            <label>
                            <Select name="requestOption" options={this.state.requestOptions} onChange={this.handleSelectChange}
                                value={this.state.requestOption} placeholder="Select a recipiant"/>
                            </label>
                            <br/>
                            <label>
                            <input name="loanAmount" type="number" placeholder="Loan amount..."
                                value={this.state.donateAmount} onChange={this.handleChange}/>
                            </label>
                            <br/>
                            <input id="submit" type="submit" value="Submit"/>
                        </form>
                    </div>
                    <br/>
                    <hr/>
                    <div>
                    <div className="sub-header">Request</div>
                        <form onSubmit={this.handleRequest}>
                            <label>
                            <input name="requestAmount" type="number" placeholder="Amount..." value={this.state.requestAmount} onChange={this.handleChange}/>
                            </label>
                            <br/>
                            <input id="submit" type="submit" value="Submit"/>
                        </form>
                    </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

    createList(_list) {
        let ul = document.createElement('ul');
        document.getElementById('myItemList').appendChild(ul);

        for (let id = 0; id < _list.length; id++) {
            let li = document.createElement('li');
            ul.appendChild(li);
            li.innerHTML += _list[id];
        }
    }

    }

    export default ViewGroup;