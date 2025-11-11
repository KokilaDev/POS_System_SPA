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