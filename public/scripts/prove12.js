const socket = io('/') // This means your client will always be connected to your server, locally or on Heroku.

const errorContainer = document.getElementById('errMsg')
const usernameInput = document.getElementById('username')
const date = new Date()

// A simple async POST request function
const getData = async (url = '') => {
    const response = await fetch(url, {
        method: 'GET'
    })
    return response.json()
}

// A simple async POST request function
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

const getTime = () => {
    const d = new Date();

    const hours = d.getHours().toString().padStart(2, '0')
    const mins = d.getHours().toString().padStart(2, '0')

    return `${hours}:${mins}`
}

// Login user to access chat room.
const login = async () => {
    /***********************************
     *         YOUR CODE HERE          *
     ***********************************/
    const username = usernameInput.value
    errorContainer.innerHTML = ''
    if(!username || username.trim() === ''){
        errorContainer.innerHTML = 'Username cannot be empty!';
        return
    }
    
    const data = await postData('/prove12/login',{username})

    if (data.error){
        errorContainer.innerHTML = data.error;
        return;
    }

    socket.emit('newUser', username, getTime());
    window.location = '/prove12/chat'
}
