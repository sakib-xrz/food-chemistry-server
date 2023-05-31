"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const menu_route_1 = __importDefault(require("./app/modules/menu/menu.route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Application Route 
app.use('/api/v1/menu', menu_route_1.default);
app.get('/', (req, res) => {
    res.send('Working Successfully');
});
exports.default = app;
