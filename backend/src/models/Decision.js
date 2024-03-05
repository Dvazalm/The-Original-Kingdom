// backend/src/models/Decision.js
import mongoose from 'mongoose';

const decisionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  NpcImg: { type: String, required: false },
  acceptPoints: {type: Object, required: false },
  declinePoints: {type: Object, required: false}
});

const Decision = mongoose.model('Decision', decisionSchema);

export default Decision;
