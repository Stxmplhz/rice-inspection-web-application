import { Router } from 'express';
import { 
    createHistory, 
    updateHistory, 
    getHistoryById, 
    getAllHistory, 
    deleteHistory 
} from '../controllers/historyController.js';

const router = Router();

router.post('/', createHistory);
router.patch('/:id', updateHistory);
router.delete('/', deleteHistory);
router.get('/:id', getHistoryById);
router.get('/', getAllHistory);

export default router;