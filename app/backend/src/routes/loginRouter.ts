import { Router } from 'express';
import { login } from '../controllers/UserController';

const router = Router();

router.post('/', login);

export default router;
