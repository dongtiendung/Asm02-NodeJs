import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        maxPeople: {
            type: Number,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        roomNumbers: [String],
    },
    { timestamps: true }
);

// VD :
//     [
//         {number:101, unavailableDates:[01.01.2023,02.01.2023]},
//         {number:102, unavailableDates:[03.01.2023,05.01.2023]},
//         {number:103, unavailableDates:[]},
//         {number:104, unavailableDates:[]}
//     ]

export default mongoose.model('Room', RoomSchema);
