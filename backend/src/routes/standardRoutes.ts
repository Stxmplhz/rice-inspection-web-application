import { Router } from 'express';
import { getStandards } from '../controllers/standardController.js'; 

const router = Router();

router.get('/', getStandards);

export default router;