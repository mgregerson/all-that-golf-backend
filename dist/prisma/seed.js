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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
function generateTypingTestText(wordCount) {
    // Replace this with your logic to generate 300 words of text for typing tests.
    // You can use lorem ipsum text or any other method.
    // For simplicity, we'll generate a repeating pattern.
    const pattern = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ";
    const repetitions = Math.ceil(wordCount / pattern.split(" ").length);
    const text = pattern.repeat(repetitions);
    return text.slice(0, wordCount); // Trim to the desired word count
}
function typingTests() {
    return __awaiter(this, void 0, void 0, function* () {
        const typingTestTemplates = [
            {
                title: "Easy Typing Test 1",
                text: generateTypingTestText(300),
                difficulty: "easy",
            },
            {
                title: "Easy Typing Test 2",
                text: generateTypingTestText(300),
                difficulty: "easy",
            },
            {
                title: "Medium Typing Test 1",
                text: generateTypingTestText(300),
                difficulty: "medium",
            },
            {
                title: "Medium Typing Test 2",
                text: generateTypingTestText(300),
                difficulty: "medium",
            },
            {
                title: "Hard Typing Test 1",
                text: generateTypingTestText(300),
                difficulty: "hard",
            },
            {
                title: "Hard Typing Test 2",
                text: generateTypingTestText(300),
                difficulty: "hard",
            },
        ];
        for (const template of typingTestTemplates) {
            const existingTest = yield prisma.typingTest.findFirst({
                where: {
                    title: template.title,
                },
            });
            if (!existingTest) {
                yield prisma.typingTest.create({
                    data: {
                        title: template.title,
                        text: template.text,
                        difficulty: template.difficulty,
                    },
                });
                console.log(`Typing test "${template.title}" created.`);
            }
            else {
                console.log(`Typing test "${template.title}" already exists, skipping.`);
            }
        }
        console.log("Typing tests seeded successfully");
    });
}
function users() {
    return __awaiter(this, void 0, void 0, function* () {
        const BCRYPT_WORK_FACTOR = 12;
        const existingUser = yield prisma.user.findUnique({
            where: { username: "testuser" },
        });
        if (existingUser) {
            // User with the username already exists; you can update here if needed
            const updatedUser = yield prisma.user.update({
                where: { id: existingUser.id },
                data: {
                    email: "newemail@test.com",
                    firstName: "newfirstname",
                    lastName: "newlastname",
                },
            });
            console.log("User updated:", updatedUser);
        }
        else {
            // User with the username doesn't exist; you can create here
            const hashedPassword = yield bcrypt_1.default.hash("password", BCRYPT_WORK_FACTOR);
            const newUser = yield prisma.user.create({
                data: {
                    email: "test@test.com",
                    username: "testuser",
                    password: hashedPassword,
                    firstName: "test",
                    lastName: "user",
                },
            });
            console.log("User created:", newUser);
        }
    });
}
users()
    .catch((error) => {
    console.error(error);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
typingTests()
    .catch((error) => {
    console.error(error);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
