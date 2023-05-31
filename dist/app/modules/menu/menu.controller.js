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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMenuByCategories = exports.getAllCategories = exports.getAllCategoriesAndImages = exports.getMenu = void 0;
const menu_service_1 = __importDefault(require("./menu.service"));
const getMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit } = req.query;
        const parsedLimit = limit ? parseInt(limit, 10) : undefined;
        const menu = yield menu_service_1.default.getAllMenuFromDatabase(parsedLimit);
        res.status(200).json({
            success: true,
            message: 'Successfully load data',
            data: menu,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to load data',
        });
    }
});
exports.getMenu = getMenu;
const getAllCategoriesAndImages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield menu_service_1.default.getMenuCategoryAndImageFromDatabase();
        res.status(200).json({
            success: true,
            message: 'Successfully load data',
            data: data,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to load data',
        });
    }
});
exports.getAllCategoriesAndImages = getAllCategoriesAndImages;
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield menu_service_1.default.getAllMenuCategoryFromDatabase();
        res.status(200).json({
            success: true,
            message: 'Successfully load data',
            data: categories,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to load data',
        });
    }
});
exports.getAllCategories = getAllCategories;
const getMenuByCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category } = req.params;
        const { limit } = req.query;
        const parsedLimit = limit ? parseInt(limit, 10) : undefined;
        const menu = yield menu_service_1.default.getMenuByCategoryFromDatabase(category, parsedLimit);
        res.status(200).json({
            success: true,
            message: 'Successfully load data',
            data: menu,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to load data',
        });
    }
});
exports.getMenuByCategories = getMenuByCategories;
exports.default = {
    getMenu: exports.getMenu,
    getAllCategoriesAndImages: exports.getAllCategoriesAndImages,
    getAllCategories: exports.getAllCategories,
    getMenuByCategories: exports.getMenuByCategories,
};
