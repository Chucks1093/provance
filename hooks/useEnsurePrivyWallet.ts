"use client";

import { useCallback, useEffect, useRef } from "react";
import { useCreateWallet, usePrivy, useWallets } from "@privy-io/react-auth";
import { useAuthStore, type AuthUser } from "@/stores/useAuthStore";

export function useEnsurePrivyWallet() {
   const user = useAuthStore((s) => s.user);
   const setUser = useAuthStore((s) => s.setUser);
   const { createWallet } = useCreateWallet();
   const { ready, authenticated } = usePrivy();
   const { wallets } = useWallets();

   const privyStateRef = useRef({ ready, authenticated });
   useEffect(() => {
      privyStateRef.current = { ready, authenticated };
   }, [ready, authenticated]);

   const waitForPrivy = async () => {
      const deadline = Date.now() + 5000;
      while (Date.now() < deadline) {
         if (privyStateRef.current.ready && privyStateRef.current.authenticated) return;
         await new Promise((r) => setTimeout(r, 200));
      }
      throw new Error("Wallet setup is still initializing. Please try again.");
   };

   const getExistingPrivyAddress = () => {
      const w = wallets.find(
         (wallet) => "walletClientType" in wallet && wallet.walletClientType === "privy"
      );
      return w?.address;
   };

   const ensureWallet = useCallback(async (): Promise<string> => {
      if (user?.wallet_address) return user.wallet_address;

      await waitForPrivy();

      const existing = getExistingPrivyAddress();
      if (existing) {
         await saveWalletAddress(existing, setUser);
         return existing;
      }

      const wallet = await createWallet();
      if (!wallet?.address) throw new Error("Wallet created but address is missing");

      await saveWalletAddress(wallet.address, setUser);
      return wallet.address;
   }, [createWallet, user?.wallet_address, wallets]);

   return { ensureWallet };
}

async function saveWalletAddress(address: string, setUser: (u: AuthUser) => void) {
   const res = await fetch("/api/auth/wallet/address", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ walletAddress: address }),
   });
   if (res.ok) {
      const { user } = await res.json() as { user: AuthUser };
      setUser(user);
   }
}
