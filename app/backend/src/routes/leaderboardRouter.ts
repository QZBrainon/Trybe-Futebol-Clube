import { Router } from 'express';
import { getHomeLeaderboard } from '../controllers/MatchesController';

const router = Router();

router.get('/home', getHomeLeaderboard);

export default router;
