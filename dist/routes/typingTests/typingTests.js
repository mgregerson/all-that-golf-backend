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
exports.typingTestsRouter = void 0;
const express_1 = require("express");
const prisma_1 = require("../../lib/prisma");
exports.typingTestsRouter = (0, express_1.Router)();
exports.typingTestsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const typingTests = yield prisma_1.prisma.typingTest.findMany();
        res.json(typingTests);
    }
    catch (error) {
        res.json({ error });
    }
}));
exports.typingTestsRouter.get("/:difficulty", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const typingTests = yield prisma_1.prisma.typingTest.findMany({
            where: {
                difficulty: req.params.difficulty,
            },
        });
        res.json(typingTests);
    }
    catch (error) {
        res.json({ error });
    }
}));
exports.typingTestsRouter.get("/:difficulty/random", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const typingTests = yield prisma_1.prisma.typingTest.findMany({
            where: {
                difficulty: req.params.difficulty,
            },
        });
        const randomIndex = Math.floor(Math.random() * typingTests.length);
        res.json(typingTests[randomIndex]);
    }
    catch (error) {
        res.json({ error });
    }
}));
exports.typingTestsRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const typingTest = yield prisma_1.prisma.user.findUnique({
            where: {
                id: Number(req.params.id),
            },
        });
        res.json(typingTest);
    }
    catch (error) {
        res.json({ error });
    }
}));
exports.typingTestsRouter.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    finally {
    }
}));
