"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("./auth/auth");
const users_1 = require("./users/users");
const typingTests_1 = require("./typingTests/typingTests");
const auth_2 = require("../middleware/auth");
exports.routes = express_1.default.Router();
exports.routes.use("/auth", auth_1.authRouter);
exports.routes.use("/users", auth_2.auth, users_1.usersRouter);
exports.routes.use("/typingtests", auth_2.auth, typingTests_1.typingTestsRouter);
