export default class OrderDTO {
    constructor(order_id, customer_name, order_date, total) {
        this._order_id = order_id;
        this._customer_name = customer_name;
        this._order_date = order_date;
        this._total = total;
    }
    get order_id(){
        return this._order_id;
    }
    get customer_name() {
        return this._customer_name;
    }
    get order_date() {
        return this._order_date;
    }
    get total() {
        return this._total;
    }
    set order_id(order_id) {
        this._order_id = order_id;
    }
    set customer_name(customer_name) {
        this._customer_name = customer_name;
    }
    set order_date(order_date) {
        this._order_date = order_date;
    }
    set total(total) {
        this._total = total;
    }
}