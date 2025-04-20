import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
require('dotenv').config();

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    accessToken?: string;
    refreshToken?: string;
    matchPassword(enteredPassword: string): Promise<boolean>;
    generateAccessToken(): string;
    generateRefreshToken(): string;
}

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    accessToken: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
});

// Encrypt password before saving
UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate access token
UserSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { _id: this._id, username: this.username },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: parseInt(process.env.ACCESS_TOKEN_EXPIRY!, 10) }
    );
};

// Generate refresh token
UserSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { _id: this._id },
        process.env.REFRESH_TOKEN_SECRET!,
        { expiresIn: parseInt(process.env.REFRESH_TOKEN_EXPIRY!, 10) }
    );
};

const User = mongoose.model<IUser>('User', UserSchema);

export default User;