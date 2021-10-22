import dotenv from "dotenv";
dotenv.config();

import Web3 from "web3";
import axios from "axios";
import {
  ABI,
  log,
  GeckoTokenData,
  Balance,
  explorerProgressLog,
} from "./utils";
const INFURA_URL: string = process.env.INFURA_URL as string;

if (!INFURA_URL.length) {
  log.error(`INFURA_URL is missing.`);
  process.exit();
}
const ethAddress = `0x88207b431510DbE0AddBDaE3bD53013813fC8c71`; // < address to query.

const web3: Web3 = new Web3(new Web3.providers.HttpProvider(INFURA_URL));
const uriOfTokens = "https://tokens.coingecko.com/uniswap/all.json";
const wallet: Array<Balance> = new Array();

const verifyWebThree = async (): Promise<boolean> => {
  return await web3.eth.net.isListening();
};

const getBalance = async (address: string): Promise<typeof wallet | null> => {
  console.time("getBalance");
  if (!(await verifyWebThree())) {
    log.error(`Failed to verify web3.`);
    return null;
  }

  const isAddress: Boolean = web3.utils.isAddress(address);
  if (!isAddress) {
    log.error(`Not a valid address.`);
    return null;
  }

  const reqTokens: GeckoTokenData = await axios.get(uriOfTokens);
  const tokens = reqTokens.data.tokens;

  explorerProgressLog(`Calling: ETH`);
  const EtheruemBalance: string = await web3.eth.getBalance(address);
  wallet.push({
    balance: web3.utils.fromWei(EtheruemBalance, "ether"),
    bInt: parseInt(EtheruemBalance),
    name: "Etheruem",
    symbol: "ETH",
  });
  log.success(`ETH: ${web3.utils.fromWei(EtheruemBalance, "ether")}`);

  const blockedSymbols: Array<string> = ["OROX", "ME", "UBSN", "LNX"]; // Symbols that cause out of gas errors
  for (let tokenData of tokens) {
    explorerProgressLog(`Calling: ${tokenData.symbol}`);
    if (tokenData.chainId !== 1) continue; // not mainnet
    if (blockedSymbols.includes(tokenData.symbol)) continue; // known problamatic symbols.
    try {
      const contract = new web3.eth.Contract(ABI, tokenData.address);
      const tokenBalance = await contract.methods.balanceOf(address).call();
      if (!tokenBalance || tokenBalance === "0") continue;
      wallet.push({
        balance: web3.utils.fromWei(tokenBalance),
        bInt: parseInt(tokenBalance),
        name: tokenData.name,
        symbol: tokenData.symbol,
      });
      log.success(`${tokenData.symbol}: ${web3.utils.fromWei(tokenBalance)}`);
    } catch (error) {
      log.error(`Error Calling: ${tokenData.symbol}`);
      console.log(error);
      continue;
    }
  }

  explorerProgressLog(`Completed.`);
  console.timeEnd("getBalance");
  return wallet;
};

getBalance(ethAddress).then((data) => console.log(data));
