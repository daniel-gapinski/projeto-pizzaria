"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListByCategoryController = void 0;
const ListByCategoryService_1 = require("../../services/product/ListByCategoryService");
class ListByCategoryController {
    async handle(req, res) {
        const category_id = req.query.category_id;
        const listByCategoryService = new ListByCategoryService_1.ListByCategoryService();
        const products = await listByCategoryService.execute({
            category_id,
        });
        return res.json(products);
    }
}
exports.ListByCategoryController = ListByCategoryController;
