"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const apiError_1 = __importDefault(require("../utils/apiError"));
const apiResponse_1 = __importDefault(require("../utils/apiResponse"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
// Sign Up
// export const signUp = ( res:any) => {
//     console.log("Simple controller working");
//     return res.send("Ok");
//   };
exports.signUp = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in userController");
    const { username, email, password } = req.body;
    console.log(req.body);
    if (!username || !email || !password) {
        return next(new apiError_1.default(400, "All fields are required"));
    }
    if (typeof username !== 'string' || username.trim() === "" ||
        typeof email !== 'string' || email.trim() === "" ||
        typeof password !== 'string' || password.trim() === "") {
        return next(new apiError_1.default(400, "All fields are required and must be valid"));
    }
    const userExists = yield user_model_1.default.findOne({ email });
    if (userExists) {
        return next(new apiError_1.default(400, 'User already exists'));
    }
    const isUser = yield user_model_1.default.create({ username, email, password });
    if (!isUser) {
        return next(new apiError_1.default(500, "Failed to create user"));
    }
    const accessToken = isUser.generateAccessToken();
    const refreshToken = isUser.generateRefreshToken();
    if (!accessToken || !refreshToken) {
        return next(new apiError_1.default(500, "Failed to generate tokens"));
    }
    isUser.accessToken = accessToken;
    yield isUser.save({ validateBeforeSave: false });
    const options = {
        httpOnly: true,
        secure: true
    };
    res.cookie("accessToken", accessToken, options);
    res.cookie("refreshToken", refreshToken, options);
    return res.status(201).json(new apiResponse_1.default(200, { isUser, accessToken, refreshToken }, "User created successfully"));
}));
// log In
// export const logIN = asyncHandler(async (req, res, next) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user || !(await user.matchPassword(password))) {
//         return next(new ApiError(401, 'Invalid email or password'));
//     }
//     const accessToken = user.generateAccessToken();
//     const refreshToken = user.generateRefreshToken();
//     if (!accessToken || !refreshToken) {
//         return next(new ApiError(500, "Failed to generate tokens"));
//     }
//     user.accessToken = accessToken;
//     await user.save({ validateBeforeSave: false });
//     const options = {
//         httpOnly: true,
//         secure: true
//     };
//     res.cookie("accessToken", accessToken, options);
//     res.cookie("refreshToken", refreshToken, options);
//     res.status(200).json({
//         success: true,
//         data: user,
//         message: "User logged in successfully"
//     });
// });
// Sign Out
// export const signOut = asyncHandler(async (req, res, next) => {
//     await User.findByIdAndUpdate(
//         req.user._id,
//         {
//             $unset: {
//                 accessToken: 1
//             }
//         },
//         { 
//             new: true  
//         }
//     );
//     const options = {
//         httpOnly: true,
//         secure: true
//     };
//     return res
//         .status(200)
//         .clearCookie("accessToken", options)
//         .clearCookie("refreshToken", options)
//         .json(new apiResponse(200, {}, "User logged out successfully"));
// });
