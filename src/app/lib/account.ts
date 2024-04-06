import { ethers } from "ethers";
export const createAccount = () => {
  return ethers.Wallet.createRandom();
};

export const createAccounts = (quantity: number) => {
  const newAccounts = new Array(quantity).fill(undefined);
  return newAccounts.map(() => createAccount());
};


