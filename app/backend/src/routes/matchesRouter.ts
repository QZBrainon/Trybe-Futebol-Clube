import { Router } from 'express';
import { getAllMatches, getInProgressMatches } from '../controllers/MatchesController';

const router = Router();

router.get('/', getAllMatches);
router.get('/inProgress', getInProgressMatches);

export default router;
