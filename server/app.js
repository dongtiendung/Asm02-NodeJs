import express from 'express';
// import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoute from './routes/auth.js';
import hotelRoute from './routes/hotel.js';
import roomRoute from './routes/room.js';
import userRoute from './routes/user.js';
import transactionRoute from './routes/transaction.js';

const app = express();

//MIDDLEWARE
// if (process.env.NODE_ENV === 'development') {
//     app.use(morgan('dev'));
// }

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/hotel', hotelRoute);
app.use('/api/room', roomRoute);
app.use('/api/transaction', transactionRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'Some thing went wrong !';
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

//START SERVER
export default app;
