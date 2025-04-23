"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_db_1 = require("./db/database.db");
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const user_route_1 = __importDefault(require("./routes/user.route"));
(0, dotenv_1.config)();
const port = process.env.PORT || 5000;
(0, database_db_1.connectDB)();
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
// Middleware to parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
// Middleware to parse application/json
app.use(express_1.default.json());
app.use('/api/v1/auth', user_route_1.default);
console.log("in index.ts");
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
