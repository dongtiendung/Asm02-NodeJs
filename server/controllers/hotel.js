import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';

export const getAllHotel = async (req, res, next) => {
    try {
        const { min, max, limit, ...others } = req.query;

        const hotels = await Hotel.find({ ...others, cheapestPrice: { $gt: min || 1, $lt: max || 999 } }).limit(limit);
        res.status(200).json(hotels);
    } catch (error) {
        next(error);
    }
};
export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (error) {
        next(error);
    }
};

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);

    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (error) {
        next(error);
    }
};

export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedHotel);
    } catch (error) {
        next(error);
    }
};

export const deletehotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json('Hotel has been deleted!');
    } catch (error) {
        next(error);
    }
};

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(',');
    try {
        const list = await Promise.all(
            cities.map((city) => {
                const cityName = city.replace(/([a-z])([A-Z])/g, '$1 $2'); //chuyển từ HaNoi => Ha Noi
                return Hotel.countDocuments({ city: cityName }); //countDocuments ko tìm nạp thuộc tính nào, nó chỉ hiển thị số lượng
            })
        );
        res.status(200).json(list);
    } catch (error) {
        next(error);
    }
};

export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: 'hotel' });
        const apartmentCount = await Hotel.countDocuments({ type: 'apartment' });
        const resortCount = await Hotel.countDocuments({ type: 'resort' });
        const villaCount = await Hotel.countDocuments({ type: 'villa' });
        const cabinCount = await Hotel.countDocuments({ type: 'cabin' });

        res.status(200).json([
            { type: 'hotel', count: hotelCount },
            { type: 'apartment', count: apartmentCount },
            { type: 'resort', count: resortCount },
            { type: 'villa', count: villaCount },
            { type: 'cabin', count: cabinCount },
        ]);
    } catch (error) {
        next(error);
    }
};

export const topRate = async (req, res, next) => {
    try {
        const topRate = await Hotel.aggregate([
            { $sort: { rating: -1 } }, // Sắp xếp giảm dần theo trường rating
            { $limit: 3 }, // Giới hạn kết quả chỉ lấy 3 khách sạn đầu tiên
        ]);
        res.status(200).json(topRate);
    } catch (error) {
        next(error);
    }
};

export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(
            hotel.rooms.map((room) => {
                return Room.findById(room);
            })
        );
        res.status(200).json(list);
    } catch (error) {
        next(error);
    }
};


