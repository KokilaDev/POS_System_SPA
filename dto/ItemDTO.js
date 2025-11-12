export default class ItemDTO {
    constructor(item_code, item_name, unit_price, qty_on_hand, category) {
        this._item_code = item_code;
        this._item_name = item_name;
        this._unit_price = unit_price;
        this._qty_on_hand = qty_on_hand;
        this._category = category;
    }
    get item_code() {
        return this._item_code;
    }
    get item_name() {
        return this._item_name;
    }
    get unit_price() {
        return this._unit_price;
    }
    get qty_on_hand() {
        return this._qty_on_hand;
    }
    get category() {
        return this._category;
    }
    set item_code(item_code) {
        this._item_code = item_code;
    }
    set item_name(item_name) {
        this._item_name = item_name;
    }
    set unit_price(unit_price) {
        this._unit_price = unit_price;
    }
    set qty_on_hand(qty_on_hand) {
        this._qty_on_hand = qty_on_hand;
    }
    set category(category) {
        this._category = category;
    }
}