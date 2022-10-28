import { Router } from 'express';
import getAllTeams from '../controllers/TeamController';

const router = Router();

router.get('/', getAllTeams);

export default router;
