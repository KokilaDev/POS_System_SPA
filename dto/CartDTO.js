export default class CartDTO{
    constructor(item_code, qty_on_hand, unit_price, total) {
        this._item_code = item_code;
        this._qty_on_hand = qty_on_hand;
        this._unit_price = unit_price;
        this._total = total;
    }

    get item_code() {
        return this._item_code;
    }
    get qty_on_hand() {
        return this._qty_on_hand;
    }
    get unit_price() {
        return this._unit_price;
    }
    get total() {
        return this._total;
    }
    set item_code(item_code) {
        this._item_code = item_code;
    }
    set qty_on_hand(qty_on_hand) {
        this._qty_on_hand = qty_on_hand;
    }
    set unit_price(unit_price) {
        this._unit_price = unit_price;
    }
    set total(total) {
        this._total = total;
    }
}