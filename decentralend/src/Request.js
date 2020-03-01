class Request {
    constructor(requester, amount, filled) {
        this.requester = requester
        this.amountRequested = amount
        this.amountFullfilled = filled
    }

    toString() {
        return "Requestor: " + this.requester + ", Amount requested: " + this.amountRequested.toString() +
            ", Amount Received: " + this.amountFullfilled.toString()
    }
}
export default Request;