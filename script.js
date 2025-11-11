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
