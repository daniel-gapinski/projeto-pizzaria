"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAtutenticated = isAtutenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
function isAtutenticated(req, res, next) {
    //Receber o token
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).end();
    }
    //String de informações: usando vírgula para ignorar o "Bearer" e chamando de token a segunda informação
    const [, token] = authToken.split(" ");
    //console.log(token);
    //console.log(authToken)
    try {
        //Sub é o ID do usuário que está retornando
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET); //vai devolver o tipo PayLoad
        //console.log(sub);
        //Recuperar o id do token e colocar dentro da variável user_id dentro do req. Foi criado uma tipagem própria no @types para não dar erro e ajustado no typeRoots do tsconfig.json
        req.user_id = sub;
        return next();
    }
    catch (err) {
        return res.status(401).end();
    }
}
