import { Router } from 'express';
import { login, getRole } from '../controllers/UserController';

const router = Router();

router.post('/', login);
router.get('/validate', getRole);
export default router;
