"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class apiResponse {
    constructor(statusCode, data, message) {
        this.statusCode = statusCode;
        this.success = statusCode < 400;
        this.data = data;
        this.message = message;
    }
}
exports.default = apiResponse;
