'use client';

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import ERC6551RegisterABI from '../../contracts/ERC6551Registry.json';// ERC6551RegisterコントラクトのABI
import Navbar from '@/components/header/navbar';

export default function Home() {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [nftContracts, setNftContracts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const connectWallet = async (): Promise<string | null> => {
    if ((window as any).ethereum) {
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      try {
        await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await provider.listAccounts();
        setProvider(provider);
        setAccount(accounts[0]);
        return accounts[0];
      } catch (error) {
        console.error("User denied account access");
        return null;
      }
    } else {
      console.error("No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.");
      return null;
    }
  };

  const fetchNftContracts = async (): Promise<void> => {
    if (!provider) {
      console.error("Provider is not set");
      return;
    }

    const registerAddress = "0x3659ed6702a2827d5c941834ba63516d1a4b5a09c69925cb8bce5db7ef3ba4ea"; // ERC6551Registerコントラクトのアドレス
    const registerContract = new ethers.Contract(registerAddress, ERC6551RegisterABI, provider);

    try {
      const tokenContracts = await registerContract.getAllTokenContracts();
      setNftContracts(tokenContracts);
    } catch (error) {
      console.error("Failed to get NFT contracts:", error);
    }
  };

  useEffect(() => {
    const init = async () => {
      const account = await connectWallet();
      if (!account || !provider) {
        setIsLoading(false);
        return;
      }

      await fetchNftContracts();
      setIsLoading(false);
    };

    init();
  }, [provider]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <h1>NFT Contracts Registered in ERC6551Registry</h1>
      {nftContracts.length > 0 ? (
        <ul>
          {nftContracts.map((contract, index) => (
            <li key={index}>{contract}</li>
          ))}
        </ul>
      ) : (
        <div>No NFT Contracts Found</div>
      )}
    </div>
  );
}
