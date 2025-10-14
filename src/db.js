import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  type: { type: String, required: true },
  userId: { type: String, required: true },
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export const Log = mongoose.model('Log', logSchema);

export async function logEvent(type, userId, action) {
  await Log.create({ type, userId, action });
}

export async function connectDB() {
  await mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}
