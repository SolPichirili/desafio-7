const socket = io.connect();

const chat = document.querySelector('#chat');

chat.addEventListener('submit', (e) => {
    e.preventDefault();

    const date = new Date().toLocaleString();
    const mail = document.querySelector('#mail').value;
    const message = document.querySelector('#message').value;

    socket.emit('new-message', { mail, date, message });

    document.querySelector('#message').value = "";
});

const showMessages = (messages) => {
    const html = messages.map((m) => {
        return (`<p class="email">${m.mail}:</p>
                <p class="fecha">[${m.date}]</p>
                <p class="mensaje">${m.message}</p>`);
    }).join(" ");

    document.querySelector('#savedMessage').innerHTML = html;
};

socket.on('messages', data => {
    showMessages(data);
});