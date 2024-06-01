import Hotel from '../models/Hotel.js';
import Transaction from '../models/Transaction.js';
import User from '../models/User.js';

export const getAllTransaction = async (req, res, next) => {
    try {
        // const allTrans = await Transaction.find().populate('user', 'username'); // Tham chiếu tới user và chỉ lấy trường username;
        // res.status(200).json(allTrans);
        const allTrans = await Transaction.find();
        const transactionsWithUsername = await Promise.all(
            allTrans.map(async (transaction) => {
                const user = await User.findById(transaction.user);
                const transactionWithUsername = { ...transaction._doc, user: user.username };
                return transactionWithUsername;
            })
        );
        res.status(200).json(transactionsWithUsername);
    } catch (error) {
        next(error);
    }
};
export const getLatestTransaction = async (req, res, next) => {
    try {
        // const allTrans = await Transaction.find().populate('user', 'username'); // Tham chiếu tới user và chỉ lấy trường username;
        // res.status(200).json(allTrans);
        const allTrans = await Transaction.find().limit(8);
        const transactionsWithUsername = await Promise.all(
            allTrans.map(async (transaction) => {
                const user = await User.findById(transaction.user);
                const transactionWithUsername = { ...transaction._doc, user: user.username };
                return transactionWithUsername;
            })
        );
        res.status(200).json(transactionsWithUsername);
    } catch (error) {
        next(error);
    }
};

export const getTransactionByUserId = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const tran = await Transaction.find({ user: userId });

        res.status(200).json(tran);
    } catch (error) {
        next(error);
    }
};


export const createTransaction = async (req, res, next) => {
    try {
        const newTrans = new Transaction(req.body);
        const savedTrans = await newTrans.save();

        res.status(200).json(savedTrans);
    } catch (error) {
        next(error);
    }
};
