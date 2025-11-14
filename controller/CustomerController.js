import { CustomerModel } from "../model/CustomerModel.js";
import { validEmail, validMobile } from "../util/Validation.js";

let selectedCustomerIndex;

$(document).ready(function () {
    $("#cust_id").val(CustomerModel.generateCustomerId());
    loadCustomerTable();
    updateTotalCustomersCount();
});

/* ================== Load Table ================== */
function loadCustomerTable() {
    $("#customer_tbl_body").empty();
    CustomerModel.getAllCustomers().forEach((customer, index) => {
        let row = `
            <tr data-index="${index}">
                <td>${customer._customer_id}</td>
                <td>${customer._customer_name}</td>
                <td>${customer._contact}</td>
                <td>${customer._email}</td>
                <td>${customer._address}</td>
            </tr>`;
        $("#customer_tbl_body").append(row);
    });
}

/* ================== Update Total ================== */
function updateTotalCustomersCount() {
    $("#total_customers").text(CustomerModel.getCustomerCount());
}

/* ================== Clear Fields ================== */
function clearCustomerFields() {
    $("#cust_name, #cust_contact, #cust_email, #cust_address").val("");
}

/* ================== Add ================== */
$("#customer_save_btn").on("click", function () {
    let name = $("#cust_name").val().trim();
    let contact = $("#cust_contact").val().trim();
    let email = $("#cust_email").val().trim();
    let address = $("#cust_address").val().trim();

    if (!name) return Swal.fire({ icon: "error", text: "Name required" });
    if (!validMobile(contact)) return Swal.fire({ icon: "error", text: "Invalid mobile number" });
    if (CustomerModel.isDuplicateMobile(contact)) return Swal.fire({ icon: "error", title: "Duplicate Number", text: "This contact number already exists!" });
    if (!validEmail(email)) return Swal.fire({ icon: "error", text: "Invalid email" });
    if (CustomerModel.isDuplicateEmail(email)) return Swal.fire({ icon: "error", title: "Duplicate Email", text: "This email already exists!" });
    if (!address) return Swal.fire({ icon: "error", text: "Address required" });

    CustomerModel.addCustomer(name, contact, email, address);
    $(document).trigger("customerAdded");
    loadCustomerTable();
    updateTotalCustomersCount();

    Swal.fire({ icon: "success", title: "Saved!", timer: 1000, showConfirmButton: false });
    clearCustomerFields();
    $("#cust_id").val(CustomerModel.generateCustomerId());
});

/* ================== Select Row ================== */
$("#customer_tbl_body").on("click", "tr", function () {
    selectedCustomerIndex = $(this).data("index");
    let customer = CustomerModel.getAllCustomers()[selectedCustomerIndex];

    $("#cust_id").val(customer._customer_id);
    $("#cust_name").val(customer._customer_name);
    $("#cust_contact").val(customer._contact);
    $("#cust_email").val(customer._email);
    $("#cust_address").val(customer._address);
});

/* ================== Update ================== */
$("#customer_update_btn").on("click", function () {
    if (selectedCustomerIndex === undefined) {
        Swal.fire({ icon: "warning", text: "Select a customer first!" });
        return;
    }

    let name = $("#cust_name").val().trim();
    let contact = $("#cust_contact").val().trim();
    let email = $("#cust_email").val().trim();
    let address = $("#cust_address").val().trim();

    if (!validMobile(contact)) return Swal.fire({ icon: "error", text: "Invalid mobile" });
    if (CustomerModel.isDuplicateMobileForUpdate(contact, selectedCustomerIndex)) return Swal.fire({ icon: "error", title: "Duplicate Number", text: "This contact number already exists!" });
    if (!validEmail(email)) return Swal.fire({ icon: "error", text: "Invalid email" });
    if (CustomerModel.isDuplicateEmailForUpdate(email, selectedCustomerIndex)) return Swal.fire({ icon: "error", title: "Duplicate Email", text: "This email already exists!" });

    CustomerModel.updateCustomer(selectedCustomerIndex, name, contact, email, address);
    loadCustomerTable();
    Swal.fire({ icon: "success", title: "Updated!", timer: 1000, showConfirmButton: false });

    clearCustomerFields();
    $("#cust_id").val(CustomerModel.generateCustomerId());
    selectedCustomerIndex = undefined;
});

/* ================== Delete ================== */
$("#customer_delete_btn").on("click", function () {
    if (selectedCustomerIndex === undefined) {
        Swal.fire({
            icon: "warning",
            title: "No Selection",
            text: "Please select a customer to delete",
        });
        return;
    }

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
            CustomerModel.deleteCustomer(selectedCustomerIndex);
            loadCustomerTable();
            updateTotalCustomersCount();
            clearCustomerFields();
            $("#cust_id").val(CustomerModel.generateCustomerId());
            Swal.fire({
                title: "Deleted!",
                text: "Customer has been deleted successfully.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });
            selectedCustomerIndex = undefined;
        }
    });
});

/* ================== Reset ================== */
$("#customer_reset_btn").on("click", function () {
    clearCustomerFields();
    $("#cust_id").val(CustomerModel.generateCustomerId());
    selectedCustomerIndex = undefined;
});
