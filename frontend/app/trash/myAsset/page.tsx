// app/nft-mint/page.tsx
"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import IPFS_NFT_ABI from '../../contracts/IPFS_NFT.json';
import Navbar from '@/components/header/navbar';
import styles from './MintNFTPage.module.css';

declare global {
  interface Window {
    ethereum: any;
  }
}

const contracts = [
  {
    address: "0xB1Af9E247d97a2fdc9d790Be473D8C2314141697",
    cid: "QmcSpTQWQfngQM2mh3KwXqWbGw1FKmpvmccbhgjXWu8nsN"
  },
  {
    address: "0x6ae1c68f83a321eb35d6cbdd4959925725d8b532",
    cid: "QmdHjCAKJ67PwZb4UHtvcsA2frYMEpRQGourLd6NkEsSK3"
  },
  {
    address: "0x9a5e4b8aee1148bfe1f90d09d0670dd30ad77515",
    cid: "QmPz5NQUsuprsieY1LE3gnv4YKN2o4p8LZc5nL1Bn49NsC"
  }
];

export default function MintNFTPage() {
  const [account, setAccount] = useState<string>("");
  const [tokenId, setTokenId] = useState<string>("");
  const [imageUrls, setImageUrls] = useState<string[]>(["", "", ""]);

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

  const mintNFT = async (contractIndex: number) => {
    if (!account) {
      alert("Please connect your wallet first");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contracts[contractIndex].address, IPFS_NFT_ABI, signer);
      const newTokenId = Date.now(); // ユニークなトークンIDとして現在のタイムスタンプを使用
      setTokenId(newTokenId.toString());

      const tx = await contract.safeMint(account, newTokenId, contracts[contractIndex].cid);
      await tx.wait();
      alert("NFT minted successfully!");

      const newImageUrls = [...imageUrls];
      newImageUrls[contractIndex] = `https://ipfs.io/ipfs/${contracts[contractIndex].cid}`;
      setImageUrls(newImageUrls);
    } catch (error) {
      console.error("Minting failed:", error);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.buttonContainer}>
        {contracts.map((contract, index) => (
          <div key={index} className={styles.imageContainer}>
            {imageUrls[index] ? (
              <img className={styles.image} src={imageUrls[index]} alt="Minted NFT" />
            ) : (
              <div className={styles.noImage}>No Image</div>
            )}
            <button className={styles.button} onClick={() => mintNFT(index)}>Mint NFT</button>
          </div>
        ))}
      </div>
    </div>
  );
}

