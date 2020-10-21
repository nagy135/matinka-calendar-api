"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var typescript_rest_1 = require("typescript-rest");
require("./handlers");
exports.app = express_1.default();
exports.app.use(cors_1.default());
exports.app.use(body_parser_1.default.json());
typescript_rest_1.Server.buildServices(exports.app);
var port = parseInt(process.env.PORT || "");
if (isNaN(port) || port === 0) {
    port = 4000;
}
exports.app.listen(port, "0.0.0.0", function () {
    console.log("Server started at port: " + port);
});
