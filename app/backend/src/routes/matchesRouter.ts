import { Router } from 'express';
import jwtAuth from '../auth/tokenValidator';
import { getAllOrInProgressMatches, postMatches } from '../controllers/MatchesController';

const router = Router();

router.get('/', getAllOrInProgressMatches);
router.post('/', jwtAuth, postMatches);

export default router;
