"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
class CreateUserService {
    async execute({ name, email, password }) {
        //Verificar se o usuário enviou um email
        if (!email) {
            throw new Error("Email incorreto!");
        }
        //Verificar se o e-mail já foi cadastrado na plataforma
        const userAlreadyExists = await prisma_1.default.user.findFirst({
            where: {
                email: email,
            }
        });
        if (userAlreadyExists) {
            throw new Error("Usuário já cadastrado!");
        }
        //Criptografar senha do usuário para o db
        const passwordHash = await (0, bcryptjs_1.hash)(password, 8);
        const user = await prisma_1.default.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
            },
            //Retornar apenas informações selecionadas. Ex.: Não retornar a senha para o usuário
            select: {
                id: true,
                name: true,
                email: true,
            }
        });
        return { user };
    }
}
exports.CreateUserService = CreateUserService;
