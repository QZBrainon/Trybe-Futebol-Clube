import { Router } from 'express';
import getInProgressMatches from '../controllers/MatchesController';

const router = Router();

router.get('/', getInProgressMatches);
export default router;
