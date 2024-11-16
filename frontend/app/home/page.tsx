"use client";

//import { useState } from "react";
import { ethers } from "ethers";
import { useEffect, useState } from 'react';
import IPFS_NFT_ABI from '../../contracts/IPFS_NFT.json';
import Navbar from '@/components/header/navbar';

declare global {
  interface Window {
    ethereum: any;
  }
}

// コントラクトアドレス
const contractAddress = "0xB1Af9E247d97a2fdc9d790Be473D8C2314141697";
const presetCid = "QmcSpTQWQfngQM2mh3KwXqWbGw1FKmpvmccbhgjXWu8nsN"; // 固定されたCID

export default function MintNFTPage() {
  const [account, setAccount] = useState<string>("");
  const [tokenId, setTokenId] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    if (window.ethereum) {
      initializeAccount();
    } else {
      console.error("Metamask not found");
    }
  }, []);

  const initializeAccount = async () => {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  const mintNFT = async () => {
    if (!account) {
      alert("Please connect your wallet first");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, IPFS_NFT_ABI, signer);
      const newTokenId = Date.now(); // ユニークなトークンIDとして現在のタイムスタンプを使用
      setTokenId(newTokenId.toString());

      const tx = await contract.safeMint(account, newTokenId, presetCid);
      await tx.wait();
      alert("NFT minted successfully!");
      setImageUrl(`https://ipfs.io/ipfs/${presetCid}`);
    } catch (error) {
      console.error("Minting failed:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <button onClick={mintNFT}>Mint NFT</button>

      {imageUrl && (
        <div>
          <h3>Token ID: {tokenId}</h3>
          <img src={imageUrl} alt="Minted NFT" />
        </div>
      )}
    </div>
  );
}
