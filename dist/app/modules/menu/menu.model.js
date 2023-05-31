"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
const mongoose_1 = require("mongoose");
const menuSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    recipe: { type: String },
    image: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
});
exports.Menu = (0, mongoose_1.model)('Menu', menuSchema);
