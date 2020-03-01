import '/Request';
class Member {
    
    constructor(_name, _balance, _request) {
        this.name = _name;
        this.balance = _balance;
        this.request = _request;
    }

    toString() {
        outRequest = (this.request != null && this.request.amountRequested > 0) ? 'has an outstanding request' : 'Does not have a request';
        return (this.name + ', ' + _balance.toString() + ', ' + outRequest);
    }
}