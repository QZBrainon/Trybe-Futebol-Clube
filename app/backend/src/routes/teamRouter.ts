import { Router } from 'express';
import { getAllTeams, getTeamById } from '../controllers/TeamController';

const router = Router();

router.get('/:id', getTeamById);
router.get('/', getAllTeams);

export default router;
