import usersManager from "../../src/data/users.manager.js";

async function getAllUsers(req, res, next) {
  try {
    let { rol } = req.query;
    let response;
    if (!rol) {
      response = await usersManager.readAll();
    } else {
      response = await usersManager.readAll(rol);
    }
    if (response.length > 0) {
      return res.status(200).json({ message: "USERS READ", response });
    } else {
      const error = new Error("USER NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function getUser(req, res, next) {
  try {
    const { uid } = req.params;
    const response = await usersManager.read(uid);
    if (response) {
      return res.status(200).json({ message: "USER READ", response });
    } else {
      const error = new Error("USER NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function createUser(req, res, next) {
  try {
    const { email, password } = req.body;
    let { userName, rol, photo } = req.body;
    if (!rol) {
      rol = 0;
    }
    const responseManager = await usersManager.create({
      email,
      password,
      userName,
      rol,
      photo,
    });
    return res
      .status(201)
      .json({ message: "USER CREATED SUCCESSFULLY", response: responseManager });
  } catch (error) {
    return next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const { uid } = req.params;
    const newData = req.body;
    const responseManager = await usersManager.update(uid, newData);
    
    return res
      .status(200)
      .json({ message: "USER UPDATED", response: responseManager });
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({ message: error.message });
    }
    return next(error); 
}
}


async function destroyUser(req, res, next) {
  try {
    const { uid } = req.params;
    const responseManager = await usersManager.delete(uid);
    if (!responseManager) {
      const error = new Error(`User id ${uid} is not found`);
      error.statusCode = 404;
      throw error;
    }
    return res
      .status(200)
      .json({ message: "USER DELETED", response: responseManager });
  } catch (error) {
    return next(error);
  }
}

export { getAllUsers, getUser, createUser, updateUser, destroyUser };