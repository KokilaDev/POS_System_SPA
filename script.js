// ====== Login ======
$('#login-form').on('submit', function (event) {
    event.preventDefault();

    const user = $('#username').val().trim();
    const pass = $('#password').val().trim();

    if (user === "admin" && pass === "1234") {
        $('.login').hide();
        $('#pos-section').show();
    } else {
        alert("Invalid credentials");
    }
});

// ====== Sidebar Toggle ======
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const closeSidebar = document.getElementById('closeSidebar');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('sidebar-collapsed');
});

if (closeSidebar) {
    closeSidebar.addEventListener('click', () => {
        sidebar.classList.add('sidebar-collapsed');
    });
}

// ====== Logout Button ======
const logoutBtn = document.getElementById('logout_btn');
logoutBtn.addEventListener('click', () => {
    $('.login').show();
    $('#pos-section').hide();
    alert('Logged out!');
});

// ====== Tab Navigation ======
const tabs = {
    dashboard: '#dashboard_content',
    customer: '#customer_content',
    product: '#product_content',
    cart: '#cart_content',
    order: '#order_content'
};

$('.tab-content').hide();
$('#dashboard_content').show();
// loadRecentOrders(); // load table on start

$('#dashboard_tab').on('click', function () { showTab('dashboard'); });
$('#customer_tab').on('click', function () { showTab('customer'); });
$('#product_tab').on('click', function () { showTab('product'); });
$('#cart_tab').on('click', function () { showTab('cart'); });
$('#order_tab').on('click', function () { showTab('order'); });

function showTab(tabName) {
    $('.tab-content').hide();
    $(tabs[tabName]).show();

    $('.sidebar-nav-item').removeClass('active');
    $(`#${tabName}_tab`).addClass('active');
}