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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const services_1 = require("./services");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(400).json({
                error: "Please fill all required fields",
            });
        }
        const user = yield (0, services_1.register)(username, email, password);
        return res.json({
            user: {
                name: user.username,
                email: user.email,
                id: user.id,
            },
        });
    }
    catch (error) {
        return res.json({ error });
    }
}));
exports.authRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({
                error: "Please fill in all required fields",
            });
        }
        const foundUser = yield (0, services_1.login)(email, password);
        if (foundUser) {
            return res.json(foundUser);
        }
        else {
            throw new Error("Password is not correct");
        }
    }
    catch (error) {
        return res.json({ error });
    }
}));
