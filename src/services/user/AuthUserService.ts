import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService {

    async execute({email, password }: AuthRequest) {
        
        //Verificar se o email existe
        const user = await prismaClient.user.findFirst({
            where: {
                email: email,
            }
        });

        if(!user) {
            throw new Error("Usuário ou senha incorretos!");
        }

        //Verificar se a senha está correta
        const passwordMath = await compare(password, user.password);

        if(!passwordMath) {
            throw new Error("Senha incorreta!");
        }

        //Se o email existir e a senha estiver correta, gerar token JWT e retornar os dados do usuário
        const token = sign(
            {
                name: user.name,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: "30d", //Tempo para expirar o token (default: 30 dias)
            }
        )

        return { 
            id: user.id,
            name: user.name,
            email: user.email,
            token: token,
        }
    }
}

export { AuthUserService };