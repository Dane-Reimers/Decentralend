import './Request';
class Member {
    
    constructor(_name, _balance, _request) {
        this.name = _name;
        this.balance = _balance;
        this.request = _request;
    }

    toString() {
        let outRequest = (this.request != null && this.request.amountRequested > 0) ? 'has an outstanding request' : 'Does not have a request';
        return (this.name + ', ' + this.balance.toString() + ', ' + outRequest);
    }
}

export default Member;