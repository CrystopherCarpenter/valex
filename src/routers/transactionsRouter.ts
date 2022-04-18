import { Router } from 'express';
import * as rechargeController from '../controllers/rechargeController.js';
import * as paymentController from '../controllers/paymentController.js';
import validateApiKey from '../middlewares/validateApiKey.js';
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware.js';
import { paymentSchema } from '../schemas/paymentSchema.js';
import { rechargeSchema } from '../schemas/rechargeSchema.js';

const transactionRouter = Router();

transactionRouter.post(
    '/cards/:id/recharges/new-recharge',
    validateSchemaMiddleware(rechargeSchema),
    validateApiKey,
    rechargeController.recharge
);

transactionRouter.post(
    '/cards/:id/payments/new-payment',
    validateSchemaMiddleware(paymentSchema),
    paymentController.newPayment
);

export default transactionRouter;
