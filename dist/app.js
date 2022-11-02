"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Init Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// cors is a middleware that allows us to make requests from our client
app.use((0, cors_1.default)());
// Helmet helps you secure your Express apps by setting various HTTP headers.
app.use((0, helmet_1.default)());
// use morgan to log requests to the console in dev mode
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
app.get("/", (req, res) => {
    res.send("Hello World!");
});
exports.default = app;
