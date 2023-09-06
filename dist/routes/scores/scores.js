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
exports.scoresRouter = void 0;
const express_1 = require("express");
const prisma_1 = require("../../lib/prisma");
exports.scoresRouter = (0, express_1.Router)();
exports.scoresRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const typingTests = yield prisma_1.prisma.typingTest.findMany();
        res.json(typingTests);
    }
    catch (error) {
        res.json({ error });
    }
}));
exports.scoresRouter.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, typingTest, wpm, accuracy, timeTaken, mistakes, wordsCorrect, totalWords, } = req.body;
        const newScore = yield prisma_1.prisma.score.create({
            data: {
                user: { connect: { id: user } },
                typingTest: { connect: { id: typingTest } },
                wpm,
                accuracy,
                timeTaken,
                mistakes,
                wordsCorrect,
                totalWords,
            },
        });
        res.json(newScore);
    }
    catch (error) {
        res.json({ error });
    }
}));
