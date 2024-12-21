import * as admin from 'firebase-admin';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const serviceAccount = require("../config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

export const generateJWT = (uid: string): string => {
  return jwt.sign({ uid }, process.env.JWT_SECRET || 'ebuddy73hdb3ydbasdb', { expiresIn: '1h' });
};

export default admin;
