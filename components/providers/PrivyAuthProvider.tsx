"use client";

import { PrivyProvider, useSyncJwtBasedAuthState } from "@privy-io/react-auth";
import { type ReactNode, useCallback } from "react";
import { useAuthStore } from "@/stores/useAuthStore";

const goatMainnet = {
   id: 2345,
   name: "GOAT Network",
   nativeCurrency: { name: "Bitcoin", symbol: "BTC", decimals: 18 },
   rpcUrls: { default: { http: ["https://rpc.goat.network"] } },
   blockExplorers: {
      default: { name: "GOAT Explorer", url: "https://explorer.goat.network" },
   },
} as const;

let cachedToken: { value: string; fetchedAt: number } | undefined;

async function getPrivyAuthToken(): Promise<string | undefined> {
   const user = useAuthStore.getState().user;
   if (!user || user.provider === "wallet") return undefined;

   if (cachedToken && Date.now() - cachedToken.fetchedAt < 30_000) {
      return cachedToken.value;
   }

   try {
      const res = await fetch("/api/auth/privy/token");
      if (!res.ok) return undefined;
      const { token } = await res.json() as { token: string };
      cachedToken = { value: token, fetchedAt: Date.now() };
      return token;
   } catch {
      return undefined;
   }
}

function PrivyJwtBridge({ children }: { children: ReactNode }) {
   const provider = useAuthStore((s) => s.user?.provider);
   const isWalletUser = provider === "wallet";

   useSyncJwtBasedAuthState({
      enabled: Boolean(process.env.NEXT_PUBLIC_PRIVY_APP_ID) && !isWalletUser,
      getExternalJwt: getPrivyAuthToken,
      subscribe: useCallback((onAuthStateChange: () => void) => {
         return useAuthStore.subscribe(() => onAuthStateChange());
      }, []),
   });

   return <>{children}</>;
}

export default function PrivyAuthProvider({ children }: { children: ReactNode }) {
   const provider = useAuthStore((s) => s.user?.provider);

   if (!process.env.NEXT_PUBLIC_PRIVY_APP_ID || provider === "wallet") {
      return <>{children}</>;
   }

   return (
      <PrivyProvider
         appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}
         config={{
            appearance: { theme: "dark", accentColor: "#d95e28" },
            supportedChains: [goatMainnet],
            defaultChain: goatMainnet,
            customAuth: {
               isLoading: false,
               getCustomAccessToken: getPrivyAuthToken,
            },
         }}
      >
         <PrivyJwtBridge>{children}</PrivyJwtBridge>
      </PrivyProvider>
   );
}
