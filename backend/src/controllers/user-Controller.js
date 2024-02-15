import User from '../models/User.js';

// Controlador para obtener los datos de un usuario por correo electrónico
export const getUserByEmail = async (req, res) => {
  try {
    // Extraer el correo electrónico de la ruta
    const { email } = req.params;

    // Buscar el usuario por correo electrónico en la base de datos
    const user = await User.findOne({ email });

    // Verificar si se encontró un usuario
    if (!user) {
      console.log("ERROR: No se encontró ningún usuario con el correo electrónico proporcionado");
      return res.status(404).json({ message: `No user found with the provided email. Email provided: ${email}` });
    }

    // Devolver los datos del usuario encontrado
    console.log("Datos del usuario encontrados:", user);
    res.status(200).json(user);
  } catch (error) {
    // Manejar errores
    console.log('ERROR: Error al obtener los datos del usuario por correo electrónico', error);
    res.status(500).json({ message: 'Error fetching user data by email' });
  }
};
