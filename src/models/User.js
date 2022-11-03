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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var bcryptjs_1 = require("bcryptjs");
var crypto = require("cryptojs");
var schema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    confirmed: { type: Boolean, "default": false },
    blocked: { type: Boolean, "default": false },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date }
}, {
    timestamps: true
});
// Encrypt password using bcrypt before saving
schema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    user = this;
                    if (!user.isModified("password")) {
                        return [2 /*return*/, next()];
                    }
                    _a = user;
                    return [4 /*yield*/, user.encryptPassword(user.password)];
                case 1:
                    _a.password = _b.sent();
                    next();
                    next();
                    return [2 /*return*/];
            }
        });
    });
});
// Compare the entered password to the hashed password in the database
schema.methods.isPasswordMatch = function (enteredPassword) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bcryptjs_1["default"].compare(enteredPassword, this.password)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
// Encrpt password using bcrypt
schema.methods.encryptPassword = function (password) {
    return __awaiter(this, void 0, void 0, function () {
        var salt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bcryptjs_1["default"].genSalt(10)];
                case 1:
                    salt = _a.sent();
                    return [4 /*yield*/, bcryptjs_1["default"].hash(password, salt)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
// Generate reset password token
schema.methods.getResetPasswordToken = function () {
    // Generate token
    var resetToken = crypto.randomBytes(20).toString("hex");
    // Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    // Set expire
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
    return resetToken;
};
exports["default"] = mongoose_1["default"].model("User", schema);
