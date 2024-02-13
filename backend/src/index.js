// backend/src/index.js
import express from 'express';
import cors from 'cors';
import connectDB from './services/databaseService.js';
import userRoutes from './routes/userRoutes.js';
import config from './config.js';

const app = express();
app.use(cors());
// Establecer conexión a MongoDB
connectDB();

// Middleware para parsear JSON
app.use(express.json());

// Rutas de usuario
app.use('/api/users', userRoutes);

// Puerto de escucha
const PORT = config.port || 8080;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
