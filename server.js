"use strict";
exports.__esModule = true;
var app_1 = require("./app");
var PORT = process.env.PORT || 3000;
app_1["default"].listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
