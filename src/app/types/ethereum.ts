type NativeCurrency = {
  decimals: number;
  name?: string;
  symbol: string;
};
export type ChainParams = {
  chainId: string;
  chainName: string;
  rpcUrls: string[];
  nativeCurrency: NativeCurrency;
  blockExplorerUrls?: string[];
  iconUrls?: string[];
};
