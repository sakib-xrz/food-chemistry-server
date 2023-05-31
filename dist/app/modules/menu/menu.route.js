"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const menu_controller_1 = __importDefault(require("./menu.controller"));
const router = express_1.default.Router();
router.get('/get-menus', menu_controller_1.default.getMenu);
router.get('/get-categories-and-images', menu_controller_1.default.getAllCategoriesAndImages);
router.get('/get-categories', menu_controller_1.default.getAllCategories);
router.get('/get-menu/:category', menu_controller_1.default.getMenuByCategories);
exports.default = router;
