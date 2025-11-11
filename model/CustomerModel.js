import { customer_db } from "../db/DB.js";
import CustomerDTO from "../dto/CustomerDTO.js";

export const CustomerModel = {
    generateCustomerId() {
        let id = customer_db.length + 1;
        return "C00" + id;
    },

    addCustomer(name, contact, email, address) {
        let id = this.generateCustomerId();
        let customer = new CustomerDTO(id, name, contact, email, address);
        customer_db.push(customer);
        return customer;
    },

    updateCustomer(index, name, contact, email, address) {
        let id = customer_db[index]._customer_id;
        let updatedCustomer = new CustomerDTO(id, name, contact, email, address);
        customer_db[index] = updatedCustomer;
    },

    deleteCustomer(index) {
        customer_db.splice(index, 1);
    },

    getAllCustomers() {
        return customer_db;
    },

    getCustomerCount() {
        return customer_db.length;
    },

    // Duplicate Check Functions
    isDuplicateMobile(mobile) {
        return customer_db.some(c => c._contact === mobile);
    },

    isDuplicateEmail(email) {
        return customer_db.some(c => c._email === email);
    },

    isDuplicateMobileForUpdate(mobile, currentIndex) {
        return customer_db.some((c, index) => c._contact === mobile && index !== currentIndex);
    },

    isDuplicateEmailForUpdate(email, currentIndex) {
        return customer_db.some((c, index) => c._email === email && index !== currentIndex);
    }
};