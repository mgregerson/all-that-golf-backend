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
exports.register = exports.login = void 0;
const bcrypt_1 = require("bcrypt");
const prisma_1 = require("../../lib/prisma");
const jsonwebtoken_1 = require("jsonwebtoken");
function login(email, password) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const foundUser = yield prisma_1.prisma.user.findUnique({
                where: {
                    email,
                },
            });
            console.log(foundUser, "foundUser");
            if (!foundUser) {
                throw new Error("A user with this username does not exist.");
            }
            const isMatch = (0, bcrypt_1.compareSync)(password, foundUser.password);
            console.log(isMatch, "isMatch");
            if (isMatch) {
                const token = (0, jsonwebtoken_1.sign)({ _id: (_a = foundUser.id) === null || _a === void 0 ? void 0 : _a.toString(), username: foundUser.username }, process.env.SECRET_KEY, {
                    expiresIn: "2 days",
                });
                return {
                    user: {
                        id: foundUser.id,
                        username: foundUser.username,
                        email: foundUser.email,
                    },
                    token,
                };
            }
            else {
                throw new Error("Password is not correct");
            }
        }
        catch (error) {
            throw error;
        }
    });
}
exports.login = login;
function register(username, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = yield (0, bcrypt_1.hash)(password, 12);
        const user = yield prisma_1.prisma.user.create({
            data: {
                username,
                email: email.toLowerCase(),
                password: hashedPassword,
            },
        });
        return user;
    });
}
exports.register = register;
