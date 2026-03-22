import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import standardRoutes from './routes/standardRoutes.js';
import historyRoutes from './routes/historyRoutes.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));

app.use(express.json({ limit: '50mb' }));
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/standard', standardRoutes);
app.use('/history', historyRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));