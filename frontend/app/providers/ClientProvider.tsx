'use client';
import "@rainbow-me/rainbowkit/styles.css";
import { useMemo } from 'react';
import { configureChains, createConfig, WagmiConfig, Chain } from 'wagmi';
import { mainnet, goerli, sepolia, polygon, polygonMumbai, zkSync, zkSyncTestnet } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import {
  connectorsForWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { metaMaskWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import { rainbowWeb3AuthConnector } from '@/lib/RainbowWeb3authConnector';

// Custom Chains

const mantaPacificSepoliaTestnet: Chain = {
  id: 3441006,
  name: 'Manta Pacific Sepolia Testnet',
  network: 'manta-pacific-sepolia-testnet',
  nativeCurrency: {
    name: 'Manta Token',
    symbol: 'MANTA',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://pacific-rpc.sepolia-testnet.manta.network/http'] },
    public: { http: ['https://pacific-rpc.sepolia-testnet.manta.network/http'] },
  },
  blockExplorers: {
    default: { name: 'Manta Pacific Sepolia Testnet Explorer', url: 'https://pacific-explorer.sepolia-testnet.manta.network' },
  },
  testnet: true,
};

const mantaPacific: Chain = {
  id: 169,
  name: 'Manta Pacific',
  network: 'manta-pacific',
  nativeCurrency: {
    name: 'Manta Token',
    symbol: 'MANTA',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://pacific-rpc.manta.network/http'] },
    public: { http: ['https://pacific-rpc.manta.network/http'] },
  },
  blockExplorers: {
    default: { name: 'Manta Pacific Explorer', url: 'https://pacific-explorer.manta.network' },
  },
  testnet: false,
};

const arbitrumTestnet: Chain = {
  id: 421614, // Arbitrum Sepolia TestnetのチェーンID（仮）
  name: 'Arbitrum Sepolia Testnet',
  network: 'arbitrum-sepolia-testnet',
  nativeCurrency: {
    name: 'Arbitrum Token',
    symbol: 'ARB',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://sepolia-rollup.arbitrum.io/rpc'] },
    public: { http: ['https://sepolia-rollup.arbitrum.io/rpc'] },
  },
  blockExplorers: {
    default: { name: 'Arbitrum Sepolia Testnet Explorer', url: 'https://arbitrum-sepolia-explorer.example.com' },
  },
  testnet: true,
};

const baseTestnet: Chain = {
  id: 84532, // Base Sepolia TestnetのチェーンID（仮）
  name: 'Base Sepolia Testnet',
  network: 'base-sepolia-testnet',
  nativeCurrency: {
    name: 'Base Token',
    symbol: 'BASE',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://sepolia.base.org'] },
    public: { http: ['https://sepolia.base.org'] },
  },
  blockExplorers: {
    default: { name: 'Base Sepolia Testnet Explorer', url: 'https://base-sepolia-explorer.example.com' },
  },
  testnet: true,
};

const bitkubTestnet: Chain = {
  id: 25925, // Bitkub TestnetのチェーンID（仮）
  name: 'Bitkub Testnet',
  network: 'bitkub-testnet',
  nativeCurrency: {
    name: 'Bitkub Token',
    symbol: 'KUB',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://rpc-testnet.bitkubchain.io'] },
    public: { http: ['https://rpc-testnet.bitkubchain.io'] },
  },
  blockExplorers: {
    default: { name: 'Bitkub Testnet Explorer', url: 'https://bitkub-explorer.testnet.example.com' },
  },
  testnet: true,
};

const flareTestnet: Chain = {
  id: 114, // Flare TestnetのチェーンID（仮）
  name: 'Flare Testnet',
  network: 'flare-testnet',
  nativeCurrency: {
    name: 'Flare Token',
    symbol: 'FLR',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://flare-testnet-coston2.rpc.thirdweb.com'] },
    public: { http: ['https://flare-testnet-coston2.rpc.thirdweb.com'] },
  },
  blockExplorers: {
    default: { name: 'Flare Testnet Explorer', url: 'https://flare-explorer.testnet.example.com' },
  },
  testnet: true,
};

const flowTestnet: Chain = {
  id: 545, // Flow TestnetのチェーンID（仮）
  name: 'Flow Testnet',
  network: 'flow-testnet',
  nativeCurrency: {
    name: 'Flow Token',
    symbol: 'FLOW',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://testnet.evm.nodes.onflow.org'] },
    public: { http: ['https://testnet.evm.nodes.onflow.org'] },
  },
  blockExplorers: {
    default: { name: 'Flow Testnet Explorer', url: 'https://flow-explorer.testnet.example.com' },
  },
  testnet: true,
};


const mantleTestnet: Chain = {
  id: 5003, // Mantle TestnetのチェーンID（仮）
  name: 'Mantle Testnet',
  network: 'mantle-testnet',
  nativeCurrency: {
    name: 'Mantle Token',
    symbol: 'MNT',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://rpc.sepolia.mantle.xyz'] },
    public: { http: ['https://rpc.sepolia.mantle.xyz'] },
  },
  blockExplorers: {
    default: { name: 'Mantle Testnet Explorer', url: 'https://mantle-explorer.testnet.example.com' },
  },
  testnet: true,
};

const polygonAmoy: Chain = {
  id: 80002, // Polygon Amoy TestnetのチェーンID（仮）
  name: 'Polygon Amoy Testnet',
  network: 'polygon-amoy-testnet',
  nativeCurrency: {
    name: 'Matic Token',
    symbol: 'MATIC',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://rpc-amoy.polygon.technology'] },
    public: { http: ['https://rpc-amoy.polygon.technology'] },
  },
  blockExplorers: {
    default: { name: 'Polygon Amoy Testnet Explorer', url: 'https://polygon-amoy-explorer.example.com' },
  },
  testnet: true,
};

const morphTestnet: Chain = {
  id: 2810, // Morph TestnetのチェーンID（仮）
  name: 'Morph Testnet',
  network: 'morph-testnet',
  nativeCurrency: {
    name: 'Morph Token',
    symbol: 'MORPH',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://rpc-holesky.morphl2.io'] },
    public: { http: ['https://rpc-holesky.morphl2.io'] },
  },
  blockExplorers: {
    default: { name: 'Morph Testnet Explorer', url: 'https://morph-explorer.testnet.example.com' },
  },
  testnet: true,
};

const rootstockTestnet: Chain = {
  id: 31, // Rootstock TestnetのチェーンID
  name: 'Rootstock Testnet',
  network: 'rootstock-testnet',
  nativeCurrency: {
    name: 'Rootstock Token',
    symbol: 'RBTC',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://mycrypto.testnet.rsk.co'] },
    public: { http: ['https://mycrypto.testnet.rsk.co'] },
  },
  blockExplorers: {
    default: { name: 'Rootstock Testnet Explorer', url: 'https://rootstock-explorer.testnet.example.com' },
  },
  testnet: true,
};

const scrollTestnet: Chain = {
  id: 534351, // Scroll TestnetのチェーンID（仮）
  name: 'Scroll Testnet',
  network: 'scroll-testnet',
  nativeCurrency: {
    name: 'Scroll Token',
    symbol: 'SCRL',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://sepolia-rpc.scroll.io'] },
    public: { http: ['https://sepolia-rpc.scroll.io'] },
  },
  blockExplorers: {
    default: { name: 'Scroll Testnet Explorer', url: 'https://scroll-explorer.testnet.example.com' },
  },
  testnet: true,
};

const zircuitTestnet: Chain = {
  id: 48899, // Zircuit TestnetのチェーンID（仮）
  name: 'Zircuit Testnet',
  network: 'zircuit-testnet',
  nativeCurrency: {
    name: 'Zircuit Token',
    symbol: 'ZIRC',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://zircuit1-testnet.p2pify.com/'] },
    public: { http: ['https://zircuit1-testnet.p2pify.com/'] },
  },
  blockExplorers: {
    default: { name: 'Zircuit Testnet Explorer', url: 'https://zircuit-explorer.testnet.example.com' },
  },
  testnet: true,
};

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  const { chains, publicClient } = useMemo(() => configureChains(
    [
    sepolia,
    //arbitrumTestnet,
    //baseTestnet,
    bitkubTestnet,
    flareTestnet,
    flowTestnet,
    //mantleTestnet,
    polygonAmoy,
    //morphTestnet,
    //rootstockTestnet,
    scrollTestnet,
    //zircuitTestnet,
    ],
    [
      alchemyProvider({ 
        apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ?? '', 
      }),
      publicProvider(),
    ]
  ), []);

  const connectors = useMemo(() => connectorsForWallets([
    {
      groupName: 'Recommended',
      wallets: [
        walletConnectWallet({ chains }),
        metaMaskWallet({ chains }),
        rainbowWeb3AuthConnector({ chains }) as any,
      ],
    },
  ]), [chains]);

  const wagmiConfig = useMemo(() => createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  }), [connectors, publicClient]);

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
