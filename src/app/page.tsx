"use client";

import { useState } from "react";
import { addAccountsToMetamask } from "./lib/autoAdd";

export default function Home() {
  const [mnemonic, setMnemonic] = useState("");
  const [projectId, setProjectId] = useState("");
  const handleAutoAdd = async () => {
    try {
      await addAccountsToMetamask(mnemonic, projectId);
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
          type="password"
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
        onClick={handleAutoAdd}
        className="rounded-full px-4 py-2 shadow-3xl shadow-orange-600 bg-slate-800 text-white w-full"
      >
        auto add
      </button>
    </main>
  );
}
