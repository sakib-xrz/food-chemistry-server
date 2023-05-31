"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const menu_model_1 = require("./menu.model");
const getAllMenuFromDatabase = (limit) => __awaiter(void 0, void 0, void 0, function* () {
    let menuQuery = menu_model_1.Menu.find();
    if (limit) {
        menuQuery = menuQuery.limit(limit);
    }
    const menu = yield menuQuery.exec();
    return menu;
});
const getMenuCategoryAndImageFromDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield menu_model_1.Menu.aggregate([
        {
            $group: {
                _id: '$category',
                image: { $first: '$image' },
            },
        },
        {
            $project: {
                _id: 0,
                category: '$_id',
                image: 1,
            },
        },
    ]);
    return categories;
});
const getAllMenuCategoryFromDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield menu_model_1.Menu.distinct('category');
    return categories;
});
const getMenuByCategoryFromDatabase = (category, limit) => __awaiter(void 0, void 0, void 0, function* () {
    let menuQuery = menu_model_1.Menu.find({ category });
    if (limit) {
        menuQuery = menuQuery.limit(limit);
    }
    const menu = yield menuQuery.exec();
    return menu;
});
exports.default = {
    getAllMenuFromDatabase,
    getMenuCategoryAndImageFromDatabase,
    getAllMenuCategoryFromDatabase,
    getMenuByCategoryFromDatabase,
};
