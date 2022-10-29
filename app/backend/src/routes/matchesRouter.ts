import { Router } from 'express';
import { getAllMatches, getInProgressMatches } from '../controllers/MatchesController';

const router = Router();

router.get('/', getInProgressMatches);
router.get('/', getAllMatches);

export default router;
