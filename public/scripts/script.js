const socket = io()
const messages = document.querySelector('section ol')
// const messageToSend = document.querySelector('#message')
// const username = document.querySelector('#username')
const form = document.querySelector('form')

form.addEventListener('submit', (event) => {
    event.preventDefault()

    let username = event.target[0].value;
    let messageToSend = event.target[1].value;

    if (messageToSend != '') {
        socket.emit('message', { username: username, message: messageToSend })
        messaging(username, messageToSend)
        event.target[1].value = ''
    }
})

socket.on('message', (emitted) => {
    messaging(emitted.username, emitted.messageToSend)
})

function messaging(user, message) {
    const span = document.createElement('span')
    const listItem = document.createElement('li')
    span.innerText = message
    listItem.innerText = user
    listItem.appendChild(span)
    messages.appendChild(listItem)
    messages.scrollTop = messages.scrollHeight
}