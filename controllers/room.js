import Room from '../models/Room.js';
import Hotel from '../models/Hotel.js';

export const getRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        next(error);
    }
};

export const getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
    } catch (error) {
        next(error);
    }
};

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;

    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } });
        } catch (error) {
            next(error);
        }
        res.status(200).json(savedRoom);
    } catch (error) {
        next(error);
    }
};

export const updateRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.roomId, { $set: req.body }, { new: true });
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: updatedRoom._id } });
        } catch (error) {
            next(error);
        }
        res.status(200).json(updatedRoom);
    } catch (error) {
        next(error);
    }
};

// export const deleteRoom = async (req, res, next) => {
//     const hotelId = req.params.hotelId;
//     try {
//         await Room.findByIdAndDelete(req.params.id);
//         try {
//             await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } });
//         } catch (error) {
//             next(error);
//         }
//         res.status(200).json('Room has been deleted !');
//     } catch (error) {
//         next(error);
//     }
// };

export const deleteRoom = async (req, res, next) => {
    const roomId = req.params.id;
    try {
        // Tìm ID của phòng dựa trên tên khách sạn
        const room = await Room.findOne({ _id: roomId });

        if (!room) {
            return res.status(404).json({ success: false, message: 'Room not found.' });
        }

        // Tìm khách sạn dựa trên ID của phòng tìm thấy
        const hotel = await Hotel.findOneAndUpdate({ rooms: room._id }, { $pull: { rooms: room._id } }, { new: true });

        if (!hotel) {
            return res.status(404).json({ success: false, message: 'Hotel not found.' });
        }
        // res.json({ success: true, message: 'Room has been deleted successfully.' });

        // Xóa phòng
        const deletedRoom = await Room.findByIdAndDelete(room._id);

        if (deletedRoom) {
            return res.status(200).json({ success: true, message: 'Room has been deleted successfully.' });
        } else {
            return res.status(404).json({ success: false, message: 'Room not found.' });
        }
    } catch (error) {
        next(error);
    }
};
