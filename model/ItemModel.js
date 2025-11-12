import { item_db } from "../db/DB.js";
import ItemDTO from "../dto/ItemDTO.js";

export const ItemModel = {
    generateItemId() {
        let id = item_db.length + 1;
        return "P00" + id;
    },

    addItem(name, unit_price, qty_on_hand, category) {
        let id = this.generateItemId();
        let item = new ItemDTO(id, name, unit_price, qty_on_hand, category);
        item_db.push(item);
        return item;
    },

    updateItem(index, name, unit_price, qty_on_hand, category) {
        let id = item_db[index]._item_code;
        let updatedItem = new ItemDTO(id, name, unit_price, qty_on_hand, category);
        item_db[index] = updatedItem;
    },

    deleteItem(index) {
        item_db.splice(index, 1);
    },

    getAllItems() {
        return item_db;
    },

    // updateQuantity(item_code, new_qty) {
    //     const item = item_db.find(i => i._item_code === item_code);
    //     if (item) {
    //         item._qty_on_hand = new_qty;
    //     }
    // },

    getLowStockItems() {
        return item_db.filter(item => item._qty_on_hand < 5);
    }
}