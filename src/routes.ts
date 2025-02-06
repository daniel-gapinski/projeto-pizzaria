import { Router } from "express";
import multer from "multer";

import  { CreateUserController }  from "./controllers/user/CreateUserController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { AddItemController } from "./controllers/order/AddItemController";

import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";
import { ListOrdersController } from "./services/order/ListOrdersController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";

import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";

import { SendOrderController } from "./controllers/order/SendOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";

import { isAtutenticated } from "./middlewares/isAtutenticated";

import uploadConfig from "./config/multer";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

// -- Rotas User -- //
router.post("/users", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
//Middleware isAtutenticated para pegar o token e verificar os dados do usuário logado para deixar prosseguir
router.get("/me", isAtutenticated, new DetailUserController().handle);


// -- Rotas Categories -- //
router.post("/category", isAtutenticated, new CreateCategoryController().handle);
router.get("/categories", isAtutenticated, new ListCategoryController().handle);

// -- Rotas Product -- //
//router.post("/product", isAtutenticated, upload.single("file"), new CreateProductController().handle);
router.post("/product", isAtutenticated, new CreateProductController().handle);
router.get("/category/product", isAtutenticated, new ListByCategoryController().handle);

// -- Rotas Order -- //
router.post("/order", isAtutenticated, new CreateOrderController().handle);
router.delete("/order", isAtutenticated, new RemoveOrderController().handle);
router.post("/order/add", isAtutenticated, new AddItemController().handle);
router.delete("/order/remove", isAtutenticated, new RemoveItemController().handle);
router.put("/order/send", isAtutenticated, new SendOrderController().handle);
router.get("/orders", isAtutenticated, new ListOrdersController().handle);
router.get("/order/detail", isAtutenticated, new DetailOrderController().handle);
router.put("/order/finish", isAtutenticated, new FinishOrderController().handle);

export default router;
