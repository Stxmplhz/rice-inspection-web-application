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

const swaggerPath = path.join(process.cwd(), 'swagger.yaml');
let swaggerDocument;
try {
  swaggerDocument = YAML.load(swaggerPath);
} catch (e) {
  console.error("Swagger file not found at:", swaggerPath);
}

app.use(express.json({ limit: '50mb' }));
app.use(cors());

if (swaggerDocument) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
app.use('/standard', standardRoutes);
app.use('/history', historyRoutes);

const PORT = process.env.PORT || 3000;

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Server is booming on port ${PORT}`);
  console.log(`Swagger docs available at /api-docs`);
});