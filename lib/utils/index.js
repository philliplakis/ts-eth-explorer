"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.ABI = void 0;
exports.ABI = [
    {
        constant: true,
        inputs: [{ name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "balance", type: "uint256" }],
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "decimals",
        outputs: [{ name: "", type: "uint8" }],
        type: "function",
    },
];
exports.log = {
    write: function (msg) { return console.log(msg); },
    success: function (msg) {
        console.log("\x1b[46m%s\x1b[0m", "----------------------------------");
        console.log(""), console.log("\x1b[33m%s\x1b[0m", msg), console.log("");
    },
    warn: function (msg) { return console.log("\x1b[36m%s\x1b[0m", msg); },
    alert: function (msg) { return console.log("\x1b[33m%s\x1b[0m", msg); },
    error: function (msg) {
        console.log("\x1b[41m%s\x1b[0m", "----------------------------------");
        console.log(""), console.log("\x1b[33m%s\x1b[0m", msg), console.log("");
        console.log("\x1b[41m%s\x1b[0m", "----------------------------------");
    },
};
