import React, { Component } from "react";

class ViewGroup extends Component {
    constructor(props) {
        super(props);
        this.requests = [];
        this.members = [];
        this.memAddresses = [];
        this.name = "";
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentWillUpdate() {
        if (this.props.lendingGroup != undefined &&
            this.props.account != undefined)
        {
          this.setMemberAddresses();
          this.setMembers();
          this.setMemberRequests();
        }
      }

      async setMemberAddresses() {
        memAddresses = await this.props.lendingGroup.methods.getMemberAddresses().call();
      }

      async setMembers() {
          for (let id = 0; id < this.memAddresses.length; id++) {
              memberTuple = await this.lendingGroup.methods.getMember(this.memAddresses[id]).call();
              member = new Member(memberTuple[0], memberTuple[1]);
              this.members.push(member);
          }
      }
      async setMemberRequests() {
        for (let id = 0; i < this.memAddresses.length; id++) {
            requestTuple = await this.props.lendingGroup.methods.getRequest(this.memAddresses[id]).call();

            request = new Request(requestTuple[0], requestTuple[1]);
            member[id].request = request;
            this.requests.push(request);
        }        
      }

      async handleRequest(amount) {
          console.log(this.props.lendingGroup);
          this.props.lendingGroup.methods.requestMoney(amount).send({from: this.props.account, gas: 100000});
          event.preventDefault()
      }

      async handleDonate(member, amount) {
          console.log(this.props.lendingGroup);
          this.props.lendingGroup.methods.giveMoney(member).send({
              from: this.props.account,
              value: amount,
              gas: 100000
          })
      }

      createList (_list) {
          ul = document.createElement('ul');
          document.getElementById('myItemList').appendChild(ul);

          for (let id = 0; id < _list.length; id++) {
            let li = document.createElement('li');
            ul.appendChild(li);
            li.innerHTML += _list[id];
          }
      }    

    render() {
        return (
        <div>
            <h2>Group</h2>
            <h3>Your group name is: ____</h3>
            <div>

            </div>
        </div>
        );
    }
}
 
export default ViewGroup;