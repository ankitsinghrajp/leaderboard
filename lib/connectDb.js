// lib/mongodb.js
import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
configDotenv();
const MONGODB_URI = process.env.MONGODB_URI; // Add this to your .env.local file

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Global cache (prevents re-creating connection on hot reload in dev)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDb() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
