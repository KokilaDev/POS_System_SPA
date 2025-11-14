let customer_db = [
    { _customer_id: "C001", _customer_name: "Kokila Dewmini", _contact: "0711234567", _email: "kokila@gmail.com", _address: "Colombo" },
    { _customer_id: "C002", _customer_name: "Adeepa Bimsara", _contact: "0779876543", _email: "adeepa@gmail.com", _address: "Kandy" },
    { _customer_id: "C003", _customer_name: "Nimesh Perera", _contact: "0758854123", _email: "nimesh@gmail.com", _address: "Galle" },
    { _customer_id: "C004", _customer_name: "Samanthi Silva", _contact: "0714589632", _email: "samanthi@gmail.com", _address: "Negombo" },
    { _customer_id: "C005", _customer_name: "Tharindu Jayasuriya", _contact: "0769954221", _email: "tharindu@gmail.com", _address: "Matara" }
];

let item_db = [
    { _item_code: "I001", _item_name: "Bananas", _unit_price: 380, _qty_on_hand: 50, _category: "Fruits & Vegetables" },
    { _item_code: "I002", _item_name: "Fresh Milk 1L", _unit_price: 420, _qty_on_hand: 30, _category: "Dairy & Eggs" },
    { _item_code: "I003", _item_name: "Orange Juice", _unit_price: 750, _qty_on_hand: 25, _category: "Beverages" },
    { _item_code: "I004", _item_name: "Chocolate Cookies", _unit_price: 600, _qty_on_hand: 40, _category: "Snacks & Confectionery" },
    { _item_code: "I005", _item_name: "Red Lentils (Dhal)", _unit_price: 350, _qty_on_hand: 60, _category: "Grains & Pulses" }
];

let cart_db = [];

let order_db = [
    { _order_id: "O001", _customer_name: "Kokila Dewmini", _order_date: "2025-11-14", _total: 3010 },
    { _order_id: "O002", _customer_name: "Adeepa Bimsara", _order_date: "2025-11-13", _total: 1800 },
    { _order_id: "O003", _customer_name: "Nimesh Perera", _order_date: "2025-11-12", _total: 2200 },
    { _order_id: "O004", _customer_name: "Samanthi Silva", _order_date: "2025-11-11", _total: 1450 },
    { _order_id: "O005", _customer_name: "Tharindu Jayasuriya", _order_date: "2025-11-10", _total: 3200 }
];

export {customer_db, item_db, cart_db, order_db};
