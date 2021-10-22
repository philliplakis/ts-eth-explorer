import { AbiItem } from "web3-utils";
export declare const ABI: Array<AbiItem>;
export declare const log: {
    write: (msg: string) => void;
    success: (msg: string) => void;
    warn: (msg: string) => void;
    alert: (msg: string) => void;
    error: (msg: string) => void;
};
