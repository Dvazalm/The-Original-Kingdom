import Decision from '../models/Decision.js'

// Controlador para obtener una decisión aleatoria
export const randomDecision = async (req, res) => {
    try {
        // Obtener todas las decisiones desde la base de datos
        const decisiones = await Decision.find();

        const decisionAleatoria = decisiones[Math.floor(Math.random() * decisiones.length)];

        console.log('Decision selecionada:', decisionAleatoria);
        res.json(decisionAleatoria);
    } catch (error) {
        console.error('Error al obtener la decisión aleatoria:', error);
        res.status(500).json({ message: 'Error al obtener la decisión aleatoria' });
    }
};

export const getDecision = async (req, res) => {
  try {
      const { decisionId } = req.params;

      const decision = await Decision.findById(decisionId);

      if (!decision) {
        return res.status(404).json({ message: 'Decisión no encontrada' });
      }

      console.log('Decision encontrada:', decision);
      res.json(decision);
  } catch (error) {
      console.error('Error al obtener la decisión:', error);
      res.status(500).json({ message: 'Error al obtener la decisión' });
  }
};



export const createDecision = async (req, res) => {
  try {
      // Extraer los datos de la solicitud
      const { title, description, NpcImg, acceptPoints, declinePoints } = req.body;

      const newDecision = new Decision({ title, description, NpcImg, acceptPoints, declinePoints });

      const savedDecision = await newDecision.save();

      // Devolver la nueva decisión como respuesta
      console.log('Decisión creada con exito', savedDecision);

      res.status(201).json(savedDecision);
  } catch (error) {
      console.error('Error al crear la decisión:', error);
      res.status(500).json({ message: 'Error al crear la decisión' });
  }
};
