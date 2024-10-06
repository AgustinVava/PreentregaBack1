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
    const { email, password, userName, photo } = req.body;
    const rol = 0;  // Rol predeterminado para usuarios registrados

    const responseManager = await usersManager.create({
      email,
      password,
      userName,
      rol,
      photo,
    });

    return res.redirect("/users");  // Redirigir a la lista de usuarios después de registrar
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

async function getUserView(req, res, next) {
  try {
    const { uid } = req.params;
    const user = await usersManager.read(uid);
    if (user) {
      return res.render("userDetail", { user });  // Renderiza la vista con los datos del usuario
    } else {
      const error = new Error("USER NOT FOUND");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

// Controlador para mostrar el formulario de registro
function getRegisterView(req, res, next) {
  try {
    return res.render("register");  // Renderiza la vista del formulario de registro
  } catch (error) {
    return next(error);
  }
}

// Controlador para mostrar el formulario de inicio de sesión
function getLoginView(req, res, next) {
  try {
    return res.render("login");  // Renderiza la vista del formulario de inicio de sesión
  } catch (error) {
    return next(error);
  }
}

async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await usersManager.readAll();  // Obtener todos los usuarios

    const foundUser = user.find(u => u.email === email && u.password === password);
    if (foundUser) {
      // Aquí puedes implementar una lógica para manejar la sesión, como el uso de cookies o JWT
      return res.redirect(`/users/${foundUser.id}`);  // Redirigir a la página del usuario
    } else {
      return res.status(401).send("Credenciales incorrectas");
    }
  } catch (error) {
    return next(error);
  }
}


export { getAllUsers, getUser, createUser, updateUser, destroyUser, getUserView, getRegisterView, getLoginView, loginUser };