"use client";

import { useState } from "react";
import { importByPrivateKey, addXterio } from "./lib/wallet";
import { listAccounts } from "./lib/listAccounts";
import { createAccount } from "./lib/account";

export default function Home() {
  const [mnemonic, setMnemonic] = useState("");
  const [projectId, setProjectId] = useState("");
  const importAccount = async () => {
    try {
      await importByPrivateKey(mnemonic);
      console.log("账号添加完成！");
    } catch (error) {
      console.error("添加账号到 Metamask 失败:", error);
    }
  };
  const pasteMnemonic = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setMnemonic(text);
    } catch (error) {
      console.error(error);
    }
  };
  const pasteProjectId = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setProjectId(text);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
      <div className="w-full flex items-center justify-between gap-4 rounded-full border border-violet-700 px-8 py-2">
        <input
          className="w-full bg-transparent outline-none"
          value={mnemonic}
          type="text"
          onChange={(e) => {
            setMnemonic(e.target.value);
          }}
          placeholder="input your MNEMONIC"
        />
        <button onClick={pasteMnemonic}>
          <img width={30} height={30} src="/paste.svg" alt="paste" />
        </button>
      </div>
      <div className="w-full flex items-center justify-between gap-4 rounded-full border border-teal-700 px-8 py-2">
        <input
          className="w-full bg-transparent outline-none"
          value={projectId}
          onChange={(e) => {
            setProjectId(e.target.value);
          }}
          type="text"
          placeholder="input your infura PROJECT_ID"
        />
        <button onClick={pasteProjectId}>
          <img width={30} height={30} src="/paste.svg" alt="paste" />
        </button>
      </div>

      <button
        onClick={importAccount}
        className="rounded-full px-4 py-2 shadow-3xl shadow-orange-600 bg-slate-800 text-white w-full"
      >
        import
      </button>
      <button
        onClick={listAccounts.bind(null, mnemonic, projectId)}
        className="rounded-full px-4 py-2 shadow-3xl shadow-orange-600 bg-pink-500 text-white w-full"
      >
        list accounts
      </button>
      <button
        onClick={() => {
          const account = createAccount();
          console.log(account);
        }}
        className="rounded-full px-4 py-2 shadow-3xl shadow-orange-600 bg-pink-500 text-white w-full"
      >
        Generate New Account
      </button>
      <button
        onClick={async () => {
          await addXterio();
        }}
        className="rounded-full px-4 py-2 shadow-3xl shadow-orange-600 bg-pink-500 text-white w-full"
      >
        Add Xterio Chain
      </button>
    </main>
  );
}
