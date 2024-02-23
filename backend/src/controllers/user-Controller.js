import User from '../models/User.js';

// Controlador para obtener los datos de un usuario
export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    // Buscar el usuario por correo, excluyendo la contraseña
    const user = await User.findOne({ email }).select('-password');


    if (!user) {
      console.log("ERROR: No se encontró ningún usuario con el correo electrónico proporcionado");
      return res.status(404).json({ message: `No user found with the provided email. Email provided: ${email}` });
    }

    console.log("Datos del usuario encontrados:", user);
    res.status(200).json(user);
  } catch (error) {
    console.log('ERROR: Error al obtener los datos del usuario por correo electrónico', error);
    res.status(500).json({ message: 'Error fetching user data by email' });
  }
};




// Controlador para eliminar un usuario por correo electrónico
export const deleteUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await User.findOneAndDelete({ email });
    const username = user.username;
    // Verificar si se eliminó un usuario
    if (!user) {
      console.log("ERROR: No se encontró ningún usuario con el correo electrónico proporcionado");
      return res.status(404).json({ message: `No user found with the provided email. Email provided: ${email}` });
    }

    // Devolver los datos del usuario eliminado
    console.log(`Usuario eliminado correctamente: ${username}`);
    res.status(200).json({ message: `User deleted successfully: ${username}` });
  } catch (error) {
    console.log('ERROR: Error al eliminar el usuario por correo electrónico', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
};



export const updateUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    let user = await User.findOne({ email }).select('-password');
    if (!user) {
      console.log("ERROR: No se encontró ningún usuario con el correo electrónico proporcionado");
      return res.status(404).json({ message: `No user found with the provided email. Email provided: ${email}` });
    }



    delete req.body.email;
    user = await User.findOneAndUpdate({ email }, { $set: req.body }, { new: true });

    console.log("Usuario actualizado:", user);
    res.status(200).json( {message: "The user data has been updated successfully."});
  } catch (error) {
    console.log('ERROR: Error al actualizar los datos del usuario por correo electrónico', error);
    res.status(500).json({ message: 'Error updating user data by email.' });
  }
};
