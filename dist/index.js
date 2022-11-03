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
const node_http_1 = __importDefault(require("node:http"));
const node_url_1 = __importDefault(require("node:url"));
const user_service_1 = require("./user/user.service");
const PORT = 8080;
node_http_1.default
    .createServer((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.url)
        return res.end();
    const parsedUrl = node_url_1.default.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const x = pathname === null || pathname === void 0 ? void 0 : pathname.split('/');
    // GET http://localhost:8080/users
    // GET http://localhost:8080/users/1 [id=1]
    if (pathname === null || pathname === void 0 ? void 0 : pathname.startsWith('/users')) {
        res.writeHead(200, {
            'Content-Type': 'application/json',
        });
        const users = yield (0, user_service_1.findAllUsers)();
        res.end(JSON.stringify(users));
    }
    else {
        res.writeHead(404);
        res.end();
    }
}))
    .listen(8080)
    .on('listening', () => console.log(`Server ready at http://localhost:${PORT}`));
