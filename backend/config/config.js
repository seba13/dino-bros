import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({ path: path.join(__dirname, '../../.env') });

export const MONGODB_URI = process.env.MONGODB_URI;
export const PORT = process.env.PORT || 5000;
