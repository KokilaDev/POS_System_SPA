import { CartModel } from "../model/CartModel.js";
import {cart_db, item_db, customer_db, order_db} from "../db/DB.js";
import OrderDTO from "../dto/OrderDTO.js";
import {OrderModel} from "../model/OrderModel.js";

$(document).ready(function () {

    // Set Order ID
    $("#order_id").val(CartModel.generateOrderId());

    // Load Items and Customers
    loadItems();
    loadCustomers();
    loadOrderTable();
    updateTotalOrdersCount();
    calculateTotalRevenue();

    // Item selection → auto-fill price & quantity
    $("#order_item").on("change", function () {
        const selectedItemCode = $(this).val();
        const item = item_db.find(i => i._item_code === selectedItemCode);

        if (item) {
            $("#order_price").val(item._unit_price);
            $("#item_quantity").val(item._qty_on_hand);
        } else {
            $("#order_price").val("");
            $("#item_quantity").val("");
        }
    });

    // Quantity input changes total
    $("#order_qty").on("input", function () {
        const qty = parseInt($(this).val());
        const price = parseFloat($("#order_price").val());
        $("#order_total").val((qty * price || 0).toFixed(2));
    });

    // Add to cart button
    $("#add_to_cart_btn").on("click", function (event) {
        event.preventDefault();

        const item_code = $("#order_item").val();
        const qty = parseInt($("#order_qty").val());
        const price = parseFloat($("#order_price").val());

        if (!item_code || isNaN(qty) || qty <= 0) {
            alert("Please select a valid item and quantity!");
            return;
        }

        // Add item to cart
        CartModel.addToCart(item_code, qty, price);

        // Update table and totals
        updateCartTable();
        updateTotal();
        clearItemFields();
    });

    // Place order button
    $("#place_order_btn").on("click", function () {
        const cash = parseFloat($("#cash").val());
        const total = CartModel.calculateTotal();

        if (isNaN(cash) || cash < total) {
            alert("Insufficient cash!");
            return;
        }

        const balance = cash - total;
        $("#balance").text(balance.toFixed(2));

        // New: Save order details to order_db
        const orderId = $("#order_id").val();
        const orderDate = $("#order_date").val();
        const customerId = $("#order_customer").val();
        const customer = customer_db.find(c => c._customer_id === customerId);

        if (!orderDate || !customer) {
            alert("Please select customer and order date!");
            return;
        }

        const newOrder = new OrderDTO(orderId, customer._customer_name, orderDate, total);
        order_db.push(newOrder);

        // Update item stock after placing order
        CartModel.getAllItems().forEach(cartItem => {
            const item = item_db.find(i => i._item_code === cartItem._item_code);
            if (item) {
                item._qty_on_hand -= cartItem._qty_on_hand;
                if (item._qty_on_hand < 0) item._qty_on_hand = 0;
            }
        });

        // Update order table in Orders tab
        loadOrderTable();
        updateTotalOrdersCount();
        calculateTotalRevenue();

        CartModel.clearCart();
        updateCartTable();
        updateTotal();
        $("#cash").val("");
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Order placed successfully!',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
        });

        // After placing order and clearing cart
        $("#order_id").val(CartModel.generateOrderId());
        $("#order_date").val("");
        $("#order_customer").val("");
        $("#balance").val("0.00");
    });

    // Cancel order button
    $("#order_cancel_btn").on("click", function () {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you really want to cancel this order?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.isConfirmed) {
                CartModel.clearCart();
                updateCartTable();
                updateTotal();
                clearItemFields();
                $("#cash").val("");
                $("#balance").text("0.00");

                Swal.fire(
                    'Cancelled!',
                    'Your order has been cancelled.',
                    'success'
                );
            }
        });
    });
});

// Load items into dropdown
function loadItems() {
    const select = $("#order_item");
    select.empty();
    select.append(`<option value="" disabled selected hidden>Select Item</option>`);
    item_db.forEach(item => {
        select.append(`<option value="${item._item_code}">${item._item_name}</option>`);
    });
}

// Load customers into dropdown
function loadCustomers() {
    const select = $("#order_customer");
    select.empty();
    select.append(`<option value="" disabled selected hidden>Select Customer</option>`);
    customer_db.forEach(customer => {
        select.append(`<option value="${customer._customer_id}">${customer._customer_name}</option>`);
    });
}

// Update cart table
function updateCartTable() {
    const tbody = $("#cart_table_body");
    tbody.empty();

    CartModel.getAllItems().forEach(item => {
        tbody.append(`
            <tr>
                <td>${item._item_code}</td>
                <td>${item._qty_on_hand}</td>
                <td>${item._unit_price.toFixed(2)}</td>
                <td>${item._total.toFixed(2)}</td>
                <td>
                    <button class="btn btn-sm btn-danger remove-btn" data-id="${item._item_code}">Remove</button>
                </td>
            </tr>
        `);
    });

    // Remove item from cart
    $(".remove-btn").on("click", function () {
        const code = $(this).data("id");
        CartModel.removeFromCart(code);
        updateCartTable();
        updateTotal();
    });
}

// Update total amount
function updateTotal() {
    const total = CartModel.calculateTotal();
    $("#total-amount").text(total.toFixed(2));
}

function updateTotalOrdersCount() {
    $("#total_orders").text(OrderModel.getOrderCount());
}

function calculateTotalRevenue() {
    let totalRevenue = 0;

    order_db.forEach(order => {
        totalRevenue += Number(order._total);
    });

    // Format with two decimals
    document.getElementById("total_revenue").innerHTML = `<span>Rs.</span>${totalRevenue.toFixed(2)}`;
}

function loadOrderTable() {
    $("#order_tbl_body").empty();
    OrderModel.getAllOrders().forEach(order => {
        let row = `
            <tr>
                <td>${order._order_id}</td>
                <td>${order._customer_name}</td>
                <td>${order._order_date}</td>
                <td>${order._total}</td>
            </tr>`;
        $("#order_tbl_body").append(row);
    });
}

// Clear input fields
function clearItemFields() {
    $("#order_item").val("");
    $("#order_price").val("");
    $("#order_qty").val("");
    $("#order_total").val("");
    $("#item_quantity").val("");
}
