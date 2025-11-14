import { cart_db ,order_db } from "../db/DB.js";
import CartDTO from "../dto/CartDTO.js";

export const CartModel = {
    // Generate auto Order ID (O001, O002, ...)
    generateOrderId() {
        let id = order_db.length + 1;
        return "O00" + id;
    },

    // Add item to cart
    addToCart(item_code, qty_on_hand, unit_price) {
        const total = qty_on_hand * unit_price;

        // check if item already exists
        let existingItem = cart_db.find(item => item._item_code === item_code);
        if (existingItem) {
            existingItem._qty_on_hand += qty_on_hand;
            existingItem._total = existingItem._qty_on_hand * existingItem._unit_price;
        } else {
            const cartItem = new CartDTO(item_code, qty_on_hand, unit_price, total);
            cart_db.push(cartItem);
        }
    },

    // Remove item from cart
    removeFromCart(item_code) {
        const index = cart_db.findIndex(item => item._item_code === item_code);
        if (index !== -1) {
            cart_db.splice(index, 1);
        }
    },

    // Calculate total amount
    calculateTotal() {
        return cart_db.reduce((sum, item) => sum + item._total, 0);
    },

    // Clear the cart
    clearCart() {
        cart_db.length = 0;
    },

    // Get all cart items
    getAllItems() {
        return cart_db;
    }
};
