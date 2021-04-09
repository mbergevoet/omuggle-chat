const socket = io()
const messages = document.querySelector('section ol')
const input = document.querySelector('input')
const form = document.querySelector('form')

form.addEventListener('submit', (event) => {
    event.preventDefault()
    if (input.value) {
        socket.emit('message', input.value)
        input.value = ''
    }
})

socket.on('message', function (message) {
    const element = document.createElement('li')
    element.textContent = message
    messages.appendChild(element)
    messages.scrollTop = messages.scrollHeight
})