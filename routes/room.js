import express from 'express';

import { verifyAdmin } from '../utils/verifyToken.js';
import * as roomController from '../controllers/room.js';

const router = express.Router();

router.get('/', roomController.getRooms);

router.get('/:id', roomController.getRoom);
router.post('/:hotelId', verifyAdmin, roomController.createRoom);
router.post('/edit/:roomId/:hotelId', verifyAdmin, roomController.updateRoom);

router.delete('/:id', verifyAdmin, roomController.deleteRoom);
// router.delete('/:id/:hotelId', verifyAdmin, roomController.deleteRoom);

export default router;
