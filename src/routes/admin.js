import express from 'express';
import { deleteRent, getRentAmount, getRentedList, getWaitList } from '../controllers/admin';
const router = express.Router();

import { verifyToken } from '../middlewares/authJWT';
import { checkAdmin } from '../middlewares/permission';

router.get('/rentedInfo', verifyToken, checkAdmin, getRentedList);

router.get('/waitList', verifyToken, checkAdmin, getWaitList);

router.get('/rentedAmount', verifyToken, checkAdmin, getRentAmount);

router.delete('/rent/:id', verifyToken, checkAdmin, deleteRent);

export default router;