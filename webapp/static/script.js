const form = document.getElementById('chat-form');
const messageInput = document.getElementById('message');
const chatContainer = document.getElementById('chat-container');

function appendMessage(text, className) {
    const msg = document.createElement('div');
    msg.className = `message ${className}`;
    msg.textContent = text;
    chatContainer.appendChild(msg);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userMessage = messageInput.value;
    appendMessage(userMessage, 'user');
    messageInput.value = '';
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({message: userMessage})
    });
    const data = await response.json();
    appendMessage(data.reply, 'bot');
});
