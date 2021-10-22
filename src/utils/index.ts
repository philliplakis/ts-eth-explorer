import { AbiItem } from "web3-utils";
import * as readline from "readline";

export const ABI: Array<AbiItem> = [
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

export const log = {
  write: (msg: string) => console.log(msg),
  success: (msg: string) => {
    console.log("");
    console.log("\x1b[36m%s\x1b[0m", "***", msg, "\x1b[36m***\x1b[0m");
  },
  warn: (msg: string) => console.log("\x1b[36m%s\x1b[0m", msg),
  alert: (msg: string) => console.log("\x1b[33m%s\x1b[0m", msg),
  error: (msg: string) => {
    console.log("\x1b[41m%s\x1b[0m", "----------------------------------");
    console.log(""), console.log("\x1b[33m%s\x1b[0m", msg), console.log("");
    console.log("\x1b[41m%s\x1b[0m", "----------------------------------");
  },
};

export function explorerProgressLog(msg: string) {
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
  process.stdout.write(msg);
}

export interface GeckoTokenData {
  data: {
    tokens: Array<{
      chainId: number;
      address: string;
      name: string;
      symbol: string;
      decimals: number;
      logoURI: string;
    }>;
  };
}

export interface Balance {
  balance: string;
  bInt: number;
  name: string;
  symbol: string;
}
