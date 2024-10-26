const socket = io();

document.querySelector("#register").addEventListener("click", ()=>{
    const name = document.querySelector("#name").value
    const email = document.querySelector("#email").value
    const photo = document.querySelector("#photo").value
    const password = document.querySelector("#password").value
    const usersData = {name, email, photo, password}

    socket.emit("new user", usersData)
})

socket.on("update users", data=>{
    data = data.map(each => `<div>${each.email}</div>`).join("")
    document.querySelector("#update").innerHTML = data
})