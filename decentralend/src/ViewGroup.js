import React, { Component } from "react";
import { LENDING_GROUP_ABI } from "./config";
import Member from "./Member";
import Request from "./Request";

class ViewGroup extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            lendingGroup : null,
            requests : [],
            members : [],
            memAddresses : [],
            name : ""
        }

    }

    componentWillUpdate() {
        if (this.props.address != undefined &&
            this.props.account != undefined) {
            this.setMemberAddresses();
            this.setMembers();
            this.setMemberRequests();
        }
    }

    async setMemberAddresses() {
        this.state.memAddresses.push(await this.props.lendingGroup.methods.getMemberAddresses().call());
    }

    async setGroup() {
        const groupAddress = this.props.address;
        this.state.lendingGroup = new this.props.web3.eth.Contract(LENDING_GROUP_ABI, groupAddress);
    }

    async setMembers() {
        for (let id = 0; id < this.memAddresses.length; id++) {
            let memberTuple = await this.lendingGroup.methods.getMember(this.memAddresses[id]).call();
            var member = new Member(memberTuple[0], memberTuple[1]);
            this.state.members.push(member);
        }
    }
    async setMemberRequests() {
        for (let id = 0; id < this.state.memAddresses.length; id++) {
            let requestTuple = await this.props.lendingGroup.methods.getRequest(this.state.memAddresses[id]).call();

            let request = new Request(requestTuple[0], requestTuple[1]);
            this.state.member[id].request = request;
            this.state.requests.push(request);
        }
    }

    async handleRequest(amount) {
        console.log(this.props.lendingGroup);
        this.props.lendingGroup.methods.requestMoney(amount).send({ from: this.props.account, gas: 100000 });
    }

    async handleDonate(member, amount) {
        console.log(this.props.lendingGroup);
        this.props.lendingGroup.methods.giveMoney(member).send({
            from: this.props.account,
            value: amount,
            gas: 100000
        })
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

    async addMember(memberAddress, name) {
        await this.state.lendingGroup.methods.addMember(memberAddress, name);
    }

    render() {
        return (<div>
            <h1>Hello!!</h1>
        </div>);
        }
    }

    export default ViewGroup;