import { Router } from 'express';
import jwtAuth from '../auth/tokenValidator';
import {
  getAllOrInProgressMatches, postMatches, endMatch, updateGoals,
} from '../controllers/MatchesController';

const router = Router();
//
router.get('/', getAllOrInProgressMatches);
router.post('/', jwtAuth, postMatches);
router.patch('/:id/finish', endMatch);
router.patch('/:id', updateGoals);

export default router;
