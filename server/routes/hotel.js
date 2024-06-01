import express from 'express';
import * as hotelController from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/', hotelController.getAllHotel);
router.post('/', verifyAdmin, hotelController.createHotel);
router.post('/edit/:id', verifyAdmin, hotelController.updateHotel);

router.get('/:id', hotelController.getHotel);
// router.delete('/:id', verifyAdmin, hotelController.deletehotel);
router.delete('/:id', hotelController.deletehotel);

router.get('/find/countByCity', hotelController.countByCity);
router.get('/find/countByType', hotelController.countByType);
router.get('/find/topRate', hotelController.topRate);

router.get('/room/:id', hotelController.getHotelRooms);

export default router;
