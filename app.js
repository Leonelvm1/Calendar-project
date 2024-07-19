// Manejador de registro
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registro exitoso');
    this.reset();
});

// Manejador de inicio de sesión
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert('Inicio de sesión exitoso');
        this.reset();
    } else {
        alert('Nombre de usuario o contraseña incorrectos');
    }
});

// Manejador de agendamiento de citas
document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const date = document.getElementById('appointmentDate').value;
    const time = document.getElementById('appointmentTime').value;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Debe iniciar sesión para agendar una cita');
        return;
    }
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.push({ user: currentUser.username, date, time });
    localStorage.setItem('appointments', JSON.stringify(appointments));
    alert('Cita agendada exitosamente');
    this.reset();
});
