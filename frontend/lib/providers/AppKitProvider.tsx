"use client";

import { AppKitProvider as ReownAppKitProvider } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { celo, celoAlfajores } from "viem/chains";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

// Get project ID from environment variable
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";

// Create Wagmi adapter with Celo networks
const wagmiAdapter = new WagmiAdapter({
  networks: [celoAlfajores, celo],
  projectId,
});

// Create metadata object
const metadata = {
  name: "CarIn",
  description: "Decentralized parking spot booking on Celo",
  url: typeof window !== "undefined" ? window.location.origin : "https://carin.app",
  icons: [
    typeof window !== "undefined"
      ? `${window.location.origin}/icon.png`
      : "https://carin.app/icon.png",
  ],
};

// AppKit configuration options
const appKitOptions = {
  adapters: [wagmiAdapter],
  networks: [celoAlfajores, celo],
  projectId,
  metadata,
  features: {
    analytics: true,
    email: false,
    socials: [],
  },
  themeMode: "light" as const,
  defaultNetwork: celoAlfajores,
};

// Create React Query client
const queryClient = new QueryClient();

export function AppKitProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ReownAppKitProvider {...appKitOptions}>{children}</ReownAppKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

