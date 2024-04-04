import Web3 from "web3";
import HDWalletProvider from "@truffle/hdwallet-provider";

export async function addAccountsToMetamask(
  mnemonic: string,
  projectId: string
): Promise<void> {
  // 检查 window.ethereum 是否存在
  if (!window.ethereum) {
    throw new Error("window.ethereum is not available.");
  }

  // 使用 HDWalletProvider 连接到以太坊网络
  const provider = new HDWalletProvider({
    mnemonic: mnemonic,
    providerOrUrl: `https://mainnet.infura.io/v3/${projectId}`, // Infura主网节点URL
  });

  // 创建 web3 实例
  const web3 = new Web3(provider as unknown as string); // 使用 provider.engine

  try {
    // 获取账号列表
    const accounts = await web3.eth.getAccounts();

    // 打印账号列表
    console.log("账号列表:");
    console.log(accounts);

    // 请求将账号添加到 Metamask 中
    for (let i = 0; i < accounts.length; i++) {
      if (!window.ethereum) {
        throw new Error("window.ethereum is not available.");
      }

      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x1", // 主网
            chainName: "Ethereum Mainnet",
            nativeCurrency: {
              name: "Ether",
              symbol: "ETH",
              decimals: 18,
            },
            rpcUrls: [`https://mainnet.infura.io/v3/${projectId}`], // Infura主网节点URL
            blockExplorerUrls: ["https://etherscan.io/"],
          },
        ],
      });
      console.log(`账号${i + 1}已添加到 Metamask.`);
    }
  } catch (error) {
    console.error("添加账号到 Metamask 失败:", error);
  } finally {
    // 关闭 provider
    provider.engine.stop();
  }
}
