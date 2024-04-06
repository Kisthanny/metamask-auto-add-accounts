import bip32 from "bip32";
import bip39 from "bip39";
import Wallet from "ethereumjs-wallet";
import { ethers } from "ethers";
import { ChainParams } from "@/app/types/ethereum";
import { integerToHex } from "./math";

export async function getAccountsFromMnemonic(
  mnemonic: string,
  quantity: number
) {
  try {
    const ethereum = window.ethereum;
    if (ethereum === undefined) {
      throw new Error("请先安装Metamask");
    }
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const root = bip32.fromSeed(seed);
    const accounts = [];

    for (let i = 0; i < quantity; i++) {
      // 生成钱包
      const child = root.derivePath(`m/44'/60'/0'/0/${i}`);
      const wallet = new ethers.Wallet(child.privateKey);

      // 将私钥添加到 MetaMask 插件中
      await ethereum.request({
        method: "wallet_importRawKey",
        params: [`0x${wallet.privateKey}`, ""], // 第二个参数为密码，此处为空
      });

      accounts.push(wallet.address); // 获取钱包地址并添加到结果数组中
    }

    console.log(`成功导入 ${quantity} 个账户到 MetaMask 插件中。`);
    return accounts;
  } catch (error) {
    console.error("导入账户失败:", error);
    return [];
  }
}

export async function importByPrivateKey(privateKey: string) {
  try {
    const ethereum = window.ethereum;
    if (ethereum === undefined) {
      throw new Error("请先安装Metamask");
    }
    await ethereum.request({
      method: "eth_requestAccounts",
      params: [privateKey, ""],
    });
    console.log("done");
  } catch (error) {
    console.error("导入账户失败:", error);
  }
}

export async function addChain(chainParams: ChainParams) {
  try {
    const ethereum = window.ethereum;
    if (ethereum === undefined) {
      throw new Error("请先安装Metamask");
    }
    await ethereum.request({
      method: "wallet_addEthereumChain",
      params: [chainParams],
    });
    console.log("done");
  } catch (error) {
    console.error("导入账户失败:", error);
  }
}

export async function addXterio() {
  const res = await addChain({
    chainId: integerToHex(112358),
    chainName: "Xterio Chain",
    rpcUrls: ["https://xterio.alt.technology"],
    nativeCurrency: {
      decimals: 18,
      name: "BNB",
      symbol: "BNB",
    },
  });
  console.log(res);
}
