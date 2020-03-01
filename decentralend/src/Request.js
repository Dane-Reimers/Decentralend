class Request {
    constructor(amount, filled) {
        this.amountRequested = amount;
        this.amountFullfilled = filled;
    }

    toString() {
        return "Amount requested: " + this.amountRequested.toString() + ", Amount Received: " + this.amountFullfilled.toString();
    }
}
export default Request;