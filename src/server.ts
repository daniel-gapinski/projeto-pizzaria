import express, {Request, Response, NextFunction } from "express";
import "express-async-errors";
import router from "./routes";
import cors from "cors";
import path from "path";
import fileUpload from "express-fileupload";

const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 } //Até 50mb
}));
app.use(router);

//Criando middleware para poder acessar a imagem do produto que foi cadastrado
app.use(
    "/files",
    express.static(path.resolve(__dirname, "..", "tmp")),
)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error) {
        //Se for uma instância do tipo Error, lançar excessão
        res.status(400).json({
            error: err.message,
        })
    }
    //Se não for erro de instância, retornar server error
    return res.status(500).json({
        status: "error",
        message: "Internal server error!",
    });
    
});

app.listen(process.env.PORT, () => {
   console.log("Servidor online!"); 
});