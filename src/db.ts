// src/db.ts

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { MONGODB_URI, MONGODB_DB } = process.env;

// mongoose.connect(`${MONGODB_URI}/${MONGODB_DB}`, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoose.connect(`${MONGODB_URI}/${MONGODB_DB}`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export default db;
