"use strict";
exports.__esModule = true;
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var morgan_1 = require("morgan");
var cors_1 = require("cors");
var helmet_1 = require("helmet");
dotenv_1["default"].config();
var app = (0, express_1["default"])();
// Init Middleware
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
// cors is a middleware that allows us to make requests from our client
app.use((0, cors_1["default"])());
// Helmet helps you secure your Express apps by setting various HTTP headers.
app.use((0, helmet_1["default"])());
// use morgan to log requests to the console in dev mode
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1["default"])("dev"));
}
app.get("/", function (req, res) {
    res.send("Hello World!");
});
exports["default"] = app;
