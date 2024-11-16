import { useState, useEffect } from "react";
import { ethers } from "ethers";
import IPFS_NFT_ABI from '../contracts/ABI/IPFS_NFT.json';
import Header from "./Header";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
  const [imageUrls, setImageUrls] = useState<string[]>(Array(contracts.length).fill(""));

  useEffect(() => {
    if (window.ethereum) {
      initializeAccount();
    } else {
      alert("Metamask not found. Please install Metamask to continue.");
    }
  }, []);

  const initializeAccount = async () => {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    } catch (error) {
      console.error("Wallet connection failed:", error);
      alert("Failed to connect wallet. Please try again.");
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
      const newTokenId = Date.now(); // 一時的なToken IDの生成
      setTokenId(newTokenId.toString());

      const tx = await contract.safeMint(account, newTokenId, contracts[contractIndex].cid);
      await tx.wait();
      alert("NFT minted successfully!");

      const newImageUrls = [...imageUrls];
      newImageUrls[contractIndex] = `https://ipfs.io/ipfs/${contracts[contractIndex].cid}`;
      setImageUrls(newImageUrls);
    } catch (error) {
      console.error("Minting failed:", error);
      alert("Minting failed. Please try again later.");
    }
  };

  return (
    <>
    <Header />
    <Navbar />
    <Hero />
    <div>
      <div>
        {contracts.map((contract, index) => (
          <div key={index}>
            {imageUrls[index] ? (
              <img src={imageUrls[index]} alt="Minted NFT" />
            ) : (
              <div>No Image</div>
            )}
            <button onClick={() => mintNFT(index)}>Mint NFT</button>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
}
