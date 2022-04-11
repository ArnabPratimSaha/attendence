"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const errorHandler_1 = require("./middleware/errorHandler");
mongoose_1.default.connect(process.env.DATABASE || '').then(res => {
    console.log(`Successfulluy connected to ${res.connection.db.databaseName} DATABASE`);
}).catch(err => {
    console.log(`Could not connect to database`);
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.raw());
const PORT = process.env.PORT || '5000';
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
const authentication_1 = __importDefault(require("./route/authentication"));
const user_1 = __importDefault(require("./route/user"));
const class_1 = __importDefault(require("./route/class"));
const student_1 = __importDefault(require("./route/student"));
app.use('/auth', authentication_1.default);
app.use('/user', user_1.default);
app.use('/class', class_1.default);
app.use('/student', student_1.default);
app.use(errorHandler_1.errorHandler);