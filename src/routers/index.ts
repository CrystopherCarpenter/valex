import { Router } from 'express';
import cardsRouter from './cardsRouter.js';
import transactionRouter from './transactionsRouter.js';

const router = Router();

router.use(cardsRouter);
router.use(transactionRouter);

export default router;
