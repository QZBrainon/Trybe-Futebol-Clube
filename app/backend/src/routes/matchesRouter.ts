import { Router } from 'express';
import getAllOrInProgressMatches from '../controllers/MatchesController';

const router = Router();

router.get('/', getAllOrInProgressMatches);

export default router;
