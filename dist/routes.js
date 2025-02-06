"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const CreateCategoryController_1 = require("./controllers/category/CreateCategoryController");
const CreateProductController_1 = require("./controllers/product/CreateProductController");
const CreateOrderController_1 = require("./controllers/order/CreateOrderController");
const AddItemController_1 = require("./controllers/order/AddItemController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const DetailUserController_1 = require("./controllers/user/DetailUserController");
const ListCategoryController_1 = require("./controllers/category/ListCategoryController");
const ListOrdersController_1 = require("./services/order/ListOrdersController");
const DetailOrderController_1 = require("./controllers/order/DetailOrderController");
const RemoveOrderController_1 = require("./controllers/order/RemoveOrderController");
const RemoveItemController_1 = require("./controllers/order/RemoveItemController");
const SendOrderController_1 = require("./controllers/order/SendOrderController");
const FinishOrderController_1 = require("./controllers/order/FinishOrderController");
const isAtutenticated_1 = require("./middlewares/isAtutenticated");
const multer_2 = __importDefault(require("./config/multer"));
const ListByCategoryController_1 = require("./controllers/product/ListByCategoryController");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)(multer_2.default.upload("./tmp"));
// -- Rotas User -- //
router.post("/users", new CreateUserController_1.CreateUserController().handle);
router.post("/session", new AuthUserController_1.AuthUserController().handle);
//Middleware isAtutenticated para pegar o token e verificar os dados do usuário logado para deixar prosseguir
router.get("/me", isAtutenticated_1.isAtutenticated, new DetailUserController_1.DetailUserController().handle);
// -- Rotas Categories -- //
router.post("/category", isAtutenticated_1.isAtutenticated, new CreateCategoryController_1.CreateCategoryController().handle);
router.get("/categories", isAtutenticated_1.isAtutenticated, new ListCategoryController_1.ListCategoryController().handle);
// -- Rotas Product -- //
//router.post("/product", isAtutenticated, upload.single("file"), new CreateProductController().handle);
router.post("/product", isAtutenticated_1.isAtutenticated, new CreateProductController_1.CreateProductController().handle);
router.get("/category/product", isAtutenticated_1.isAtutenticated, new ListByCategoryController_1.ListByCategoryController().handle);
// -- Rotas Order -- //
router.post("/order", isAtutenticated_1.isAtutenticated, new CreateOrderController_1.CreateOrderController().handle);
router.delete("/order", isAtutenticated_1.isAtutenticated, new RemoveOrderController_1.RemoveOrderController().handle);
router.post("/order/add", isAtutenticated_1.isAtutenticated, new AddItemController_1.AddItemController().handle);
router.delete("/order/remove", isAtutenticated_1.isAtutenticated, new RemoveItemController_1.RemoveItemController().handle);
router.put("/order/send", isAtutenticated_1.isAtutenticated, new SendOrderController_1.SendOrderController().handle);
router.get("/orders", isAtutenticated_1.isAtutenticated, new ListOrdersController_1.ListOrdersController().handle);
router.get("/order/detail", isAtutenticated_1.isAtutenticated, new DetailOrderController_1.DetailOrderController().handle);
router.put("/order/finish", isAtutenticated_1.isAtutenticated, new FinishOrderController_1.FinishOrderController().handle);
exports.default = router;
