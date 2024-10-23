import usersManager from "../data/users.manager.js";

const socketCallBack = (socket) =>{
    console.log("socket connected id: " + socket.id)
socket.on("new user", async data =>{
const id = await usersManager.create(data)
socket.emit("update users", id)
}) 
}

export default socketCallBack;