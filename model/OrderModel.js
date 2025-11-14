import {order_db} from "../db/DB.js";
import OrderDTO from "../dto/OrderDTO.js";

export const OrderModel = {
    getAllOrders() {
        return order_db;
    }
}