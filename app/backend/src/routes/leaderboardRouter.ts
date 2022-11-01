import { Router } from 'express';
import { getHomeLeaderboard, getAwayLeaderboard } from '../controllers/MatchesController';

const router = Router();

router.get('/home', getHomeLeaderboard);
router.get('/away', getAwayLeaderboard);

export default router;
