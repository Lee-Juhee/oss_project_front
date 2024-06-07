document.getElementById('guestbook-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    const response = await fetch('/api/guestbook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, message })
    });

    if (response.ok) {
        const newMessage = await response.json();
        addMessageToDOM(newMessage);
        document.getElementById('guestbook-form').reset();
    } else {
        alert('메시지를 저장하는 데 문제가 발생했습니다.');
    }
});

async function loadMessages() {
    const response = await fetch('/api/guestbook');
    const messages = await response.json();
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = '';

    messages.forEach((message) => {
        addMessageToDOM(message);
    });
}

function addMessageToDOM(message) {
    const messagesDiv = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.innerHTML = `
        <strong>${message.name}</strong>
        <em>${new Date(message.timestamp).toLocaleString()}</em>
        <p>${message.message}</p>
    `;
    messagesDiv.appendChild(messageDiv);
}

window.onload = loadMessages;
