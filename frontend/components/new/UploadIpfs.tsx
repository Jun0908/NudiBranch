import React, { useState, useRef } from 'react';
import { NFTStorage } from 'nft.storage';
import { ethers } from 'ethers';
import MyNFTABI from "../contracts/ABI/MyNFT.json";
import Navbar from "./components/Navbar";

// 型定義を追加
declare global {
  interface Window {
    ethereum?: any;
  }
}

function UploadFile() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [musicSrc, setMusicSrc] = useState<string | null>(null);
  const [ipfsImageCid, setIpfsImageCid] = useState<string | null>(null);
  const [ipfsMusicCid, setIpfsMusicCid] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const musicInputRef = useRef<HTMLInputElement>(null);
  const CONTRACT_ADDRESS = "0xC633bf60370011EC2b985724273cC73258Fe66Db";
  const CONTRACT_ABI = MyNFTABI; // .abiは不要
  const [mintHash, setMintHash] = useState<string | null>(null);

  const apiKey = '4f20e181.274945f287e24bbaa43a9145300c7a4b';
  const client = new NFTStorage({ token: apiKey });

  const uploadToNFTStorage = async (file: File, setType: (cid: string) => void) => {
    try {
      const cid = await client.storeBlob(file);
      console.log('CID:', cid);
      setType(cid);
    } catch (error) {
      console.error('Error uploading file to NFT Storage:', error);
    }
  };

  const handleImageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.match('image.*')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
        uploadToNFTStorage(file, setIpfsImageCid);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMusicInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.match('audio.*')) {
      setMusicSrc(URL.createObjectURL(file));
      uploadToNFTStorage(file, setIpfsMusicCid);
    }
  };

  const mintNFT = async () => {
    if (!ipfsImageCid || !ipfsMusicCid) {
      console.error("Both image and music CIDs are required");
      return;
    }
  
    try {
      if (!window.ethereum) {
        console.error("MetaMask is not installed");
        return;
      }
  
      console.log("Starting the minting process");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
  
      console.log("Creating contract instance with address:", CONTRACT_ADDRESS);
      console.log("Using ABI:", CONTRACT_ABI);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  
      console.log("Minting NFT with image CID:", ipfsImageCid, "and music CID:", ipfsMusicCid);
      const transaction = await contract.createNFT(ipfsImageCid, ipfsMusicCid);
      await transaction.wait();
      setMintHash(transaction.hash);
      console.log("NFT Minted:", transaction.hash);
    } catch (error) {
      console.error("Error minting NFT:", error);
    }
  };

  const handleGalleryButton = async () => {
    try {
      const response = await fetch('/api/triggerWorkflow');
      if (!response.ok) {
        throw new Error('GitHub Actionsのトリガーに失敗しました');
      }
      console.log('GitHub Actionsが正常にトリガーされました');
    } catch (error) {
      console.error('GitHub Actionsのトリガー中にエラーが発生しました', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', height: '100vh' }}>
       <Navbar />
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="imageInput" style={{ marginRight: '10px' }}>Upload the image to IPFS</label>
        <input 
          id="imageInput"
          type="file" 
          accept="image/*" 
          onChange={handleImageInput} 
          onClick={() => { if (imageInputRef.current) imageInputRef.current.value = '' }}
          ref={imageInputRef} 
        />
        {imageSrc && <img src={imageSrc} alt="Uploaded content" style={{ display: 'block', margin: '10px auto', width: '200px', height: '200px' }} />}
        {ipfsImageCid && <p>Image CID: {ipfsImageCid}</p>}
      </div>
  
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="musicInput" style={{ marginRight: '10px' }}>Upload the music to IPFS</label>
        <input 
          id="musicInput"
          type="file" 
          accept="audio/*" 
          onChange={handleMusicInput} 
          onClick={() => { if (musicInputRef.current) musicInputRef.current.value = '' }}
          ref={musicInputRef} 
        />
        {musicSrc && <audio controls src={musicSrc} style={{ display: 'block', margin: '10px auto' }} />}
        {ipfsMusicCid && (
          <div>
            <p>Music CID: {ipfsMusicCid}</p>
          </div>
        )}
      </div>
  
      {ipfsImageCid && ipfsMusicCid && (
        <div style={{ marginBottom: '20px', border: '2px solid black', padding: '5px' }}>
          <button onClick={mintNFT} style={{ border: 'none', background: 'none' }}>
            Mint NFT
          </button>
        </div>
      )}
  
      <div style={{ marginBottom: '20px' }}>
        {mintHash && (
          <p>Mint completed! Transaction hash: {mintHash}</p>
        )}
      </div>
      {ipfsImageCid && ipfsMusicCid && (
      <div style={{ marginBottom: '20px', border: '2px solid black', padding: '5px' }}>
        <button onClick={handleGalleryButton} style={{ border: 'none', background: 'none' }}>
          Gallery
        </button>
      </div>
      )}
    </div>
  );
}

export default UploadFile;

