"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddItemService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class AddItemService {
    async execute({ amount, order_id, product_id }) {
        const item = await prisma_1.default.item.create({
            data: {
                amount,
                order_id: order_id,
                product_id: product_id,
            }
        });
        return item;
    }
}
exports.AddItemService = AddItemService;
