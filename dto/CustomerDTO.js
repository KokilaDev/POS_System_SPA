export default class CustomerDTO {
    constructor(customer_id, customer_name, contact, email, address) {
        this._customer_id = customer_id;
        this._customer_name = customer_name;
        this._contact = contact;
        this._email = email;
        this._address = address;
    }

    get customer_id(){
        return this._customer_id;
    }

    set customer_id(customer_id){
        this._customer_id = customer_id;
    }

    get customer_name() {
        return this._customer_name;
    }

    set customer_name(customer_name) {
        this._customer_name = customer_name;
    }

    get address() {
        return this._address;
    }

    set address(address) {
        this._address = address;
    }

    get contact() {
        return this._contact;
    }

    set contact(contact) {
        this._contact = contact;
    }

    get email() {
        return this._email;
    }

    set email(email) {
        this._email = email;
    }
}