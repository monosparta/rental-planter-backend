import express from 'express';
import { createAdminAccount, deleteMember, deleteAdmin, deleteRent, getMembers, getAdmins, getRentAmount, getRentedList, getWaitList, listConfig, markRentTaken, updateConfig, updateMemberData, updateMemberRequest } from '../controllers/admin';
const router = express.Router();

import { verifyToken } from '../middlewares/authJWT';
import { checkAdmin } from '../middlewares/permission';

router.get('/rentedInfo', verifyToken, checkAdmin, getRentedList);

router.get('/waitList', verifyToken, checkAdmin, getWaitList);

router.get('/rentedAmount', verifyToken, checkAdmin, getRentAmount);

router.put('/rent/:id', verifyToken, checkAdmin, markRentTaken);

router.delete('/rent/:id', verifyToken, checkAdmin, deleteRent);

router.get('/members', verifyToken, checkAdmin, getMembers);

router.put('/members', verifyToken, checkAdmin, updateMemberRequest);

router.put('/member/:id', verifyToken, checkAdmin, updateMemberData);

router.delete('/member/:id', verifyToken, checkAdmin, deleteMember);

router.get('/admin', verifyToken, checkAdmin, getAdmins);

router.post('/admin', verifyToken, checkAdmin, createAdminAccount);

router.delete('/admin/:id', verifyToken, checkAdmin, deleteAdmin);

router.get('/config', verifyToken, checkAdmin, listConfig);

router.put('/config', verifyToken, checkAdmin, updateConfig);

export default router;