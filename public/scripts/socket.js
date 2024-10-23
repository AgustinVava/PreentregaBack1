const socket = io();

document.querySelector("#register").addEventListener("click", ()=>{
    const name = document.querySelector("#name").value
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
    const usersData = {name, email, password}

    socket.emit("new user", usersData)
})

socket.on("update users", id=>{
    document.querySelector("#update").innerHTML = id
})