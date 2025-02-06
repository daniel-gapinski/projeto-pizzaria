import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {

    async execute({ name, email, password }: UserRequest) {

        //Verificar se o usuário enviou um email
        if(!email) {
            throw new Error("Email incorreto!");
        }
        //Verificar se o e-mail já foi cadastrado na plataforma
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email,
            }
        })
        if(userAlreadyExists){
            throw new Error("Usuário já cadastrado!");
        }

        //Criptografar senha do usuário para o db
        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
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


        return { user }
    }
}

export { CreateUserService };