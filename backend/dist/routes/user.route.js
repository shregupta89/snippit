"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userAuth_controller_1 = require("../controllers/userAuth.controller");
const router = express_1.default.Router();
router.route('/signup').post(userAuth_controller_1.signUp);
router.get('/test', (req, res) => {
    res.send("hello from test");
});
console.log("in userRouter");
exports.default = router;
