// import {OrderModel} from "../model/OrderModel";
//
// $(document).ready(function () {
//     loadOrderTable();
// });
//
// function loadOrderTable() {
//     $("#order_tbl_body").empty();
//     OrderModel.getAllOrders().forEach(order => {
//         let row = `
//             <tr>
//                 <td>${order._order_id}</td>
//                 <td>${order._customer_name}</td>
//                 <td>${order._order_date}</td>
//                 <td>${order._total}</td>
//             </tr>`;
//         $("#order_tbl_body").append(row);
//     });
// }