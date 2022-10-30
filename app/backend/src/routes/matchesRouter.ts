import { Router } from 'express';
// import jwtAuth from '../auth/tokenValidator';
import { getAllOrInProgressMatches, postMatches, endMatch } from '../controllers/MatchesController';

const router = Router();

router.get('/', getAllOrInProgressMatches);
router.post('/', postMatches);
router.patch('/:id/finish', endMatch);

export default router;
