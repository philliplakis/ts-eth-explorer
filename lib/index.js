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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var web3_1 = __importDefault(require("web3"));
// import axios from "axios";
var utils_1 = require("./utils");
var INFURA_URL = process.env.INFURA_URL;
if (!INFURA_URL.length) {
    utils_1.log.error("INFURA_URL is missing.");
    process.exit();
}
var web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(INFURA_URL));
// const uriOfTokens = "https://tokens.coingecko.com/uniswap/all.json";
var ethAddress = "0x88207b431510DbE0AddBDaE3bD53013813fC8c71";
var tokenAddresses = [
    "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9",
    "0x2b591e99afe9f32eaa6214f7b7629768c40eeb39",
    "0x6B175474E89094C44Da98b954EedeAC495271d0F", // DAI
];
var verifyWebThree = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, web3.eth.net.isListening()];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var getBalance = function (address) { return __awaiter(void 0, void 0, void 0, function () {
    var isAddress, EtheruemBalance, _i, tokenAddresses_1, tokenAddress, contract, tokenBalance;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, verifyWebThree()];
            case 1:
                if (!(_a.sent())) {
                    utils_1.log.error("Failed to verify web3");
                    return [2 /*return*/];
                }
                isAddress = web3.utils.isAddress(address);
                if (!isAddress) {
                    utils_1.log.error("Not a valid address");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, web3.eth.getBalance(address)];
            case 2:
                EtheruemBalance = _a.sent();
                utils_1.log.success("ETH: " + web3.utils.fromWei(EtheruemBalance, "ether"));
                _i = 0, tokenAddresses_1 = tokenAddresses;
                _a.label = 3;
            case 3:
                if (!(_i < tokenAddresses_1.length)) return [3 /*break*/, 6];
                tokenAddress = tokenAddresses_1[_i];
                contract = new web3.eth.Contract(utils_1.ABI, tokenAddress);
                return [4 /*yield*/, contract.methods.balanceOf(address).call()];
            case 4:
                tokenBalance = _a.sent();
                utils_1.log.success("" + web3.utils.fromWei(tokenBalance, "ether"));
                _a.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6: return [2 /*return*/];
        }
    });
}); };
getBalance(ethAddress);
