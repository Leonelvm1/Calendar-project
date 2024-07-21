// script.js

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    localStorage.setItem('user', JSON.stringify({ username, password }));
    alert('Registro exitoso');
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.username === username && user.password === password) {
        alert('Inicio de sesión exitoso');
    } else {
        alert('Nombre de usuario o contraseña incorrectos');
    }
});

document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const date = document.getElementById('appointmentDate').value;
    const time = document.getElementById('appointmentTime').value;
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        const appointments = JSON.parse(localStorage.getItem('appointments')) || {};
        const userAppointments = appointments[user.username] || [];
        userAppointments.push({ date, time });
        appointments[user.username] = userAppointments;
        localStorage.setItem('appointments', JSON.stringify(appointments));
        alert('Cita agendada exitosamente');
    } else {
        alert('Debes iniciar sesión para agendar una cita');
    }
});

document.getElementById('consultarDatos').addEventListener('click', function() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        const appointments = JSON.parse(localStorage.getItem('appointments')) || {};
        const userAppointments = appointments[user.username] || [];
        const datosDiv = document.getElementById('datosLocalStorage');
        datosDiv.innerHTML = `<h5>Citas Agendadas:</h5><ul>${userAppointments.map(a => `<li>${a.date} ${a.time}</li>`).join('')}</ul>`;
    } else {
        alert('Debes iniciar sesión para consultar tus citas');
    }
});
