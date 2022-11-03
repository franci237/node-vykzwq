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
const promises_1 = __importDefault(require("node:fs/promises"));
const node_url_1 = __importDefault(require("node:url"));
const PORT = 8080;
node_http_1.default.createServer((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // http://localhost:8080/estate.html
    if (!req.url)
        return res.end();
    const parsedUrl = node_url_1.default.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    try {
        const data = yield promises_1.default.readFile(`pages${pathname}`);
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end(data);
    }
    catch (err) {
        console.error(`Error reading ${pathname}`, err);
        res.writeHead(500);
        if (err instanceof Error)
            return res.end(err.message);
    }
    // fs.readFile(`pages${pathname}`, (err, data) => {
    // 	if (err) {
    // 		console.error(`Error reading ${pathname}`, err)
    // 		res.writeHead(500)
    // 		return res.end(err.message)
    // 	}
    // 	res.writeHead(200, {
    // 		'Content-Type': 'text/html'
    // 	})
    // 	res.end(data)
    // })
}))
    .listen(PORT)
    .on('listening', () => console.log(`Server ready at http://localhost:${PORT}`));
