import express from 'express';
import * as userController from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// router.get('/checkauthentication', verifyToken, (req, res, next) => {
//     res.json('Hello user, you are logged in !');
// });
// router.get('/checkuser/:id', verifyUser, (req, res, next) => {
//     res.json('Hello user, you are logged in and you can delete your account !');
// });
// router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
//     res.json('Hello admin, you are logged in you can delete all accounts !');
// });

router.get('/', verifyAdmin, userController.getAllUser);

router.get('/:id', verifyUser, userController.getUser);
router.put('/:id', verifyUser, userController.updateUser);
router.delete('/:id', verifyUser, userController.deleteUser);

export default router;
