import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// import cookie from 'cookie-parser'

import { createError } from '../utils/error.js';

export const register = async (req, res, next) => {
    try {
        //check thông tin input người dùng nhập đã tồn tại trong DB hay chưa
        const fieldsToCheck = [
            { field: 'username', message: 'Username' },
            { field: 'fullname', message: 'Fullname' },
            { field: 'phoneNumber', message: 'Phone number' },
            { field: 'email', message: 'Email' },
        ];

        for (const field of fieldsToCheck) {
            const existingField = await User.findOne({ [field.field]: req.body[field.field] });
            if (existingField) {
                return res.status(400).json(`${field.message} already exists`);
            }
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password: hash,
        });

        await newUser.save();
        res.status(200).json('User has been created!');
    } catch (error) {
        next(error);
    }
};
export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, 'User not Found!'));

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return next(createError(400, 'Wrong password or username !'));

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT);

        const { password, ...otherDetails } = user._doc;

        res.cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json({ details: { ...otherDetails } });
    } catch (error) {
        next(error);
    }
};
