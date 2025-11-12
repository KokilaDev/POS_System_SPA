let customer_db = [
    { _customer_id: "C001", _customer_name: "Kokila Dewmini", _contact: "0711234567", _email: "kokila@gmail.com", _address: "Colombo 03" },
    { _customer_id: "C002", _customer_name: "Adeepa Bimsara", _contact: "0779876543", _email: "adeepa@gmail.com", _address: "Kandy" },
    { _customer_id: "C003", _customer_name: "Samanthi Fernando", _contact: "0712345678", _email: "samanthi.f@gmail.com", _address: "Galle" },
    { _customer_id: "C004", _customer_name: "Chathura Silva", _contact: "0763456789", _email: "chathura.s@gmail.com", _address: "Negombo" },
    { _customer_id: "C005", _customer_name: "Iresha Jayasinghe", _contact: "0754567890", _email: "iresha.j@gmail.com", _address: "Matara" }
];

let item_db = [
    { _item_code: 'P001', _item_name: 'Crystal Hair Clip', _unit_price: 250, _qty_on_hand: 12, _category: 'Jewellery & Accessories' },
    { _item_code: 'P002', _item_name: 'Beaded Necklace', _unit_price: 1200, _qty_on_hand: 5, _category: 'Jewellery & Accessories' },
    { _item_code: 'P003', _item_name: 'Ladies Handbag', _unit_price: 3250, _qty_on_hand: 8, _category: 'Handbags & Purses' },
    { _item_code: 'P004', _item_name: 'Stylish Sunglasses', _unit_price: 1800, _qty_on_hand: 15, _category: 'Jewellery & Accessories' },
    { _item_code: 'P005', _item_name: 'Silver Earrings', _unit_price: 950, _qty_on_hand: 3, _category: 'Jewellery & Accessories' }
];

let cart_db = [];

let order_db = [];

export {customer_db, item_db, cart_db, order_db};
