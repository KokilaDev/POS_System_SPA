import { ItemModel } from "../model/ItemModel.js";
import {item_db} from "../db/DB.js";

let selectedItemIndex;

$(document).ready(function () {
    $("#pro_id").val(ItemModel.generateItemId());
    updateLowStockItems();
    loadItemTable();
    updateCategoryChart()
});

/* ================== Load Table ================== */
function loadItemTable() {
    $("#product_tbl_body").empty();
    ItemModel.getAllItems().forEach((item, index) => {
        // Quantity < 10 => red text + row highlight
        const qtyClass = item._qty_on_hand < 10 ? "low-stock" : "";
        const rowClass = item._qty_on_hand < 10 ? "low-stock-row" : "";

        let row = `
            <tr class="${rowClass}" data-index="${index}">
                <td>${item._item_code}</td>
                <td>${item._item_name}</td>
                <td>${item._unit_price}</td>
                <td class="${qtyClass}">${item._qty_on_hand}</td>
                <td>${item._category}</td>
            </tr>`;
        $("#product_tbl_body").append(row);
    });
    updateLowStockItems();
}

/* ================== Low Stock Items ================== */
function updateLowStockItems() {
    const allItems = ItemModel.getAllItems();

    const lowItemDiv = document.getElementById("low-item");
    const lowItemInfoDiv = document.getElementById("low-item-info");

    lowItemInfoDiv.classList = "";

    if (allItems.length === 0) {
        lowItemDiv.textContent = "-";
        lowItemInfoDiv.innerHTML = `<i class="fas fa-exclamation"></i><span> No products in stock</span>`;
        lowItemInfoDiv.classList.add("empty");
        return;
    }

    const lowStockItems = ItemModel.getLowStockItems();

    if (lowStockItems.length === 0) {
        lowItemDiv.textContent = "-";
        lowItemInfoDiv.innerHTML = `<i class="fas fa-check"></i><span> All products in stock</span>`;
        lowItemInfoDiv.classList.add("normal");
        return;
    }

    const minQtyItem = lowStockItems.reduce((prev, curr) => {
        return curr._qty_on_hand < prev._qty_on_hand ? curr : prev;
    });

    lowItemDiv.textContent = minQtyItem._item_code;
    lowItemInfoDiv.innerHTML = `<i class="fas fa-arrow-down"></i><span> ${minQtyItem._qty_on_hand} - ${minQtyItem._item_name}</span>`;
    lowItemInfoDiv.classList.add("low");
}

// function updateItemQuantity(item_code, new_qty) {
//     ItemModel.updateQuantity(item_code, new_qty);
//     updateLowStockItems();
// }

/* ================== Clear Fields ================== */
function clearItemFields() {
    $("#pro_name, #unit_price, #qty_on_hand, #item_category").val("");
}

/* ================== Add ================== */
$("#product_save_btn").on("click", function () {
    let name = $("#pro_name").val().trim();
    let unit_price = $("#unit_price").val().trim();
    let qty_on_hand = $("#qty_on_hand").val().trim();
    let category = $("#item_category").val().trim();

    if (!name || !unit_price || !qty_on_hand || !category) {
        Swal.fire({
            icon: "error",
            title: "Missing Fields",
            text: "Please fill out all the required fields before saving.",
        });
        return;
    }

    ItemModel.addItem(name, unit_price, qty_on_hand, category);
    $(document).trigger("itemAdded");
    loadItemTable();
    updateLowStockItems();

    Swal.fire({ icon: "success", title: "Saved!", timer: 1000, showConfirmButton: false });
    clearItemFields();
    $("#pro_id").val(ItemModel.generateItemId());
});

/* ================== Select Row ================== */
$("#product_tbl_body").on("click", "tr", function () {

    $("#product_tbl_body tr").removeClass("selected");
    $(this).addClass("selected");

    selectedItemIndex = $(this).data("index");
    let item = ItemModel.getAllItems()[selectedItemIndex];

    $("#pro_id").val(item._item_code);
    $("#pro_name").val(item._item_name);
    $("#unit_price").val(item._unit_price);
    $("#qty_on_hand").val(item._qty_on_hand);
    $("#item_category").val(item._category);
});

/* ================== Update ================== */
$("#product_update_btn").on("click", function () {
    if (selectedItemIndex === undefined) {
        Swal.fire({ icon: "warning", text: "Select a item first!" });
        return;
    }

    let name = $("#pro_name").val().trim();
    let unit_price = $("#unit_price").val().trim();
    let qty_on_hand = $("#qty_on_hand").val().trim();
    let category = $("#item_category").val().trim();

    if (!name || !unit_price || !qty_on_hand || !category) {
        Swal.fire({
            icon: "error",
            title: "Missing Fields",
            text: "Please fill all fields to update."
        });
        return;
    }

    ItemModel.updateItem(selectedItemIndex, name, unit_price, qty_on_hand, category);
    loadItemTable();
    updateLowStockItems();

    Swal.fire({ icon: "success", title: "Updated!", timer: 1000, showConfirmButton: false });

    clearItemFields();
    $("#pro_id").val(ItemModel.generateItemId());
    selectedItemIndex = undefined;
});

/* ================== Delete ================== */
$("#product_delete_btn").on("click", function () {
    if (selectedItemIndex === undefined) {
        Swal.fire({
            icon: "warning",
            title: "No Selection",
            text: "Please select a item to delete",
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
            ItemModel.deleteItem(selectedItemIndex);
            loadItemTable();
            updateLowStockItems();
            clearItemFields();
            $("#pro_id").val(ItemModel.generateItemId());
            Swal.fire({
                title: "Deleted!",
                text: "Item has been deleted successfully.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });
            selectedItemIndex = undefined;
        }
    });
});

/* ================== Reset ================== */
$("#product_reset_btn").on("click", function () {
    clearItemFields();
    $("#pro_id").val(ItemModel.generateItemId());
    selectedItemIndex = undefined;
});

// ====== Category Chart ======
function updateCategoryChart() {
    // Initialize counts
    const counts = {
        "Fruits & Vegetables": 0,
        "Dairy & Eggs": 0,
        "Beverages": 0,
        "Snacks & Confectionery": 0,
        "Household Essentials": 0,
        "Grains & Pulses": 0,
        "Spices & Seasonings": 0
    };

    // Count items per category
    ItemModel.getAllItems().forEach(item => {
        if (counts[item._category] !== undefined) {
            counts[item._category]++;
        }
    });

    // Update table counts dynamically
    document.getElementById("count-fruits").textContent = counts["Fruits & Vegetables"];
    document.getElementById("count-dairy").textContent = counts["Dairy & Eggs"];
    document.getElementById("count-beverages").textContent = counts["Beverages"];
    document.getElementById("count-snacks").textContent = counts["Snacks & Confectionery"];
    document.getElementById("count-household").textContent = counts["Household Essentials"];
    document.getElementById("count-grains").textContent = counts["Grains & Pulses"];
    document.getElementById("count-spices").textContent = counts["Spices & Seasonings"];
}
