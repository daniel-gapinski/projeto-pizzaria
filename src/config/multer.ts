import crypto from "crypto";
import multer from "multer";
import { extname, resolve } from "path";

export default {
    upload(folder: string) {
        return {
            storage: multer.diskStorage({
                destination: resolve(__dirname, "..", "..", folder), //Destino de onde a iamgem será salva
                filename: (request, file, callback) => {
                    const fileHash = crypto.randomBytes(16).toString("hex");
                    const fileName = `${fileHash}-${file.originalname}`;

                    return callback(null, fileName); // Error como null no primeiro parâmetro e o nome do arqvuivo no segundo
                }
            })
        }
    }
}