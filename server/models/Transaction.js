import mongoose from 'mongoose';
const { Schema } = mongoose; // Lấy Schema từ mongoose

const TransactionSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    hotel: {
        type: String,
        required: true,
    },
    hotelId:   { 
        type: String,
        required: true,
        },
    room: {
        type: [Number],
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    payment: {
        type: String,
        enum: ['Credit Card', 'Cash'],
        required: true,
    },
    status: {
        type: String,
        enum: ['Booked', 'Checkin', 'Checkout'],
    },
});

export default mongoose.model('Transaction', TransactionSchema);