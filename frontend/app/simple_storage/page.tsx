'use client';

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
//import ERC6551Account from '../../contracts/ERC6551Account.json'; // ABIのインポート
import Navbar from "@/components/header/navbar";

interface Metadata {
  image: string;
  api: string;
}


const SIMPLE_STORAGE_ABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "data",
          "type": "uint256"
        }
      ],
      "name": "DataStored",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "get",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "x",
          "type": "uint256"
        }
      ],
      "name": "set",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

const SIMPLE_STORAGE_ADDRESS = "0x7058fd7f0cad8169b9b7ab91349fee551a4b2294";

export default function Home() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [value, setValue] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState<number>(0);
  const [isClient, setIsClient] = useState(false); // Client-side rendering flag

  useEffect(() => {
    setIsClient(true); // Set flag to true on client-side
  }, []);

  useEffect(() => {
    if (isConnected) {
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      setProvider(provider);
    }
  }, [isConnected]);

  const getValue = async () => {
    if (provider) {
      const contract = new ethers.Contract(SIMPLE_STORAGE_ADDRESS, SIMPLE_STORAGE_ABI, provider);
      const value = await contract.get();
      setValue(value.toNumber());
    }
  };

  const setValueOnChain = async () => {
    if (provider) {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(SIMPLE_STORAGE_ADDRESS, SIMPLE_STORAGE_ABI, signer);
      const tx = await contract.set(inputValue);
      await tx.wait();
      getValue();
    }
  };

  const isValidAddress = (address: string): boolean => {
    try {
      ethers.utils.getAddress(address);
      return true;
    } catch {
      return false;
    }
  };

  if (!isClient) {
    return null; // Prevents server-side rendering issues
  }

  return (
    <div>
      <Navbar />
      <h1>Simple Storage</h1>
      {isConnected ? (
        <div>
          <p>Connected as {address}</p>
          <button onClick={() => disconnect()}>Disconnect</button>
          <div>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(Number(e.target.value))}
            />
            <button onClick={setValueOnChain}>Set Value</button>
          </div>
          <div>
            <button onClick={getValue}>Get Value</button>
            {value !== null && <p>Stored Value: {value}</p>}
          </div>
        </div>
      ) : (
        <button onClick={() => connect()}>Connect Wallet</button>
      )}
    </div>
  );
}
