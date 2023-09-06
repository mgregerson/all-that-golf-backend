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
exports.usersRouter = void 0;
const express_1 = require("express");
const prisma_1 = require("../../lib/prisma");
exports.usersRouter = (0, express_1.Router)();
exports.usersRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma_1.prisma.user.findMany();
        res.json(users);
    }
    catch (error) {
        res.json({ error });
    }
}));
exports.usersRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_1.prisma.user.findUnique({
            where: {
                id: Number(req.params.id),
            },
        });
        res.json(user);
    }
    catch (error) {
        res.json({ error });
    }
}));
exports.usersRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield prisma_1.prisma.user.update({
            where: {
                id: Number(req.params.id),
            },
            data: req.body,
        });
        res.json(updatedUser);
    }
    catch (error) {
        res.json({ error });
    }
}));
exports.usersRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield prisma_1.prisma.user.delete({
            where: {
                id: Number(req.params.id),
            },
        });
        res.json(deletedUser);
    }
    catch (error) {
        res.json({ error });
    }
}));
