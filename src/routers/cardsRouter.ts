import { Router } from 'express';
import * as cardController from '../controllers/cardController.js';
import * as balanceController from '../controllers/balanceController.js';
import validateApiKey from '../middlewares/validateApiKey.js';
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware.js';
import { activationSchema } from '../schemas/activationSchema.js';
import { newCardSchema } from '../schemas/newCardSchema.js';

const cardsRouter = Router();

cardsRouter.post(
    '/cards/new-card',
    validateSchemaMiddleware(newCardSchema),
    validateApiKey,
    cardController.newCard
);

cardsRouter.post(
    '/cards/:id/activate',
    validateSchemaMiddleware(activationSchema),
    cardController.activateCard
);

cardsRouter.get('/cards/:id/balance', balanceController.getBalance);

export default cardsRouter;
