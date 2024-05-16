import express from 'express';
import * as transactionController from '../controllers/transaction.js';
const router = express.Router();

router.post('/', transactionController.createTransaction);

router.get('/', transactionController.getAllTransaction);

router.get('/latest', transactionController.getLatestTransaction);

router.get('/:userId', transactionController.getTransactionByUserId);

export default router;
