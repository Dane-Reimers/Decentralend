import React, { Component } from "react";
import { LENDING_GROUP_ABI } from "./config";
import Member from "./Member";
import Request from "./Request";

class ViewGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: "",
            lendingGroup : null,
            requests : [],
            members : [],
            memAddresses : [],
            name : "",
            setGroupCalled : false
        }

    }

    componentWillMount() {
        this.setState({setGroupCalled: true});
        this.setGroup().then(() =>
        this.setMemberAddresses(),
        this.setMembers(),
        this.setMemberRequests()
        )
      }

    async setMemberAddresses() {
        const addresses = await this.state.lendingGroup.methods.getMemberAddresses().call()
        this.setState({memAddresses: addresses})
    }

    async setGroup() {
        const groupAddress = this.props.match.params.address;
        const group = new this.props.web3.eth.Contract(LENDING_GROUP_ABI, groupAddress)
        this.setState({lendingGroup: group})
    }

    async setMembers() {
        for (let id = 0; id < this.state.memAddresses.length; id++) {
            let memberTuple = await this.lendingGroup.methods.getMember(this.memAddresses[id]).call();
            var member = new Member(memberTuple[0], memberTuple[1]);
            this.state.members.push(member);
        }
    }
    async setMemberRequests() {
        for (let id = 0; id < this.state.memAddresses.length; id++) {
            let requestTuple = await this.state.lendingGroup.methods.getRequest(this.state.memAddresses[id]).call();

            let request = new Request(requestTuple[0], requestTuple[1]);
            this.state.member[id].request = request;
            this.state.requests.push(request);
        }
    }

    async handleRequest(amount) {
        this.props.lendingGroup.methods.requestMoney(amount).send({ from: this.props.account, gas: 100000 });
    }

    async handleDonate(member, amount) {
        this.props.lendingGroup.methods.giveMoney(member).send({
            from: this.props.account,
            value: amount,
            gas: 100000
        })
    }

    async addMember(memberAddress, name) {
        await this.state.lendingGroup.methods.addMember(memberAddress, name);
    }

    render() {
        return (<div>
            <div id="profile">
              <div className="sub-header"><b>Group</b></div>
              <div id="groupName">Your group name is: { this.state.groupName }</div>
              <div>
              {this.state.memAddresses.map(function(group, idx){
              return (
                <div key={idx}>
                  <h2>{this.state.memAddresses[idx]}</h2>
                </div>
              )})}
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