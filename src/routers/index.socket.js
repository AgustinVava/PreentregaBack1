import usersManager from "../data/users.manager.js";

const socketCallBack = async (socket) =>{
    console.log("socket connected id: " + socket.id)
socket.on("new user", async data =>{
const id = await usersManager.create(data)
socket.emit("update users", allUsers)
})
const allUsers = await usersManager.readAll()
socket.emit("update users", allUsers)

}

export default socketCallBack;