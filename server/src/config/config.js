import dotenv from 'dotenv';
dotenv.config();

export const adminUsername = process.env.ADMIN_USERNAME;
export const adminPassword = process.env.ADMIN_PASSWORD;
export const jwtSecret = process.env.JWT_SECRET;
