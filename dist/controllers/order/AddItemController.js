"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddItemController = void 0;
const AddItemService_1 = require("../../services/order/AddItemService");
class AddItemController {
    async handle(req, res) {
        const { amount, order_id, product_id } = req.body;
        const addItemService = new AddItemService_1.AddItemService();
        const item = await addItemService.execute({
            amount,
            order_id,
            product_id,
        });
        return res.json(item);
    }
}
exports.AddItemController = AddItemController;
