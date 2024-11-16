import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import WhitelistAbi from '../contracts/ABI/Whitelist.json';
import Header from "./Header";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// コントラクトアドレスを指定
const WHITELIST_CONTRACT_ADDRESS = '0xd7ac369ade1d914857059f50201868c184e3bf94';

const getWhitelistContract = (provider: ethers.providers.Web3Provider) => {
  return new ethers.Contract(WHITELIST_CONTRACT_ADDRESS, WhitelistAbi, provider.getSigner());
};

export default function Whitelist() {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [userAddress, setUserAddress] = useState<string>('');
  const [whitelisted, setWhitelisted] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(web3Provider);
      web3Provider.send("eth_requestAccounts", []);
    }
  }, []);

  const checkWhitelist = async () => {
    if (provider && userAddress) {
      try {
        const contract = getWhitelistContract(provider);
        const isWhitelisted = await contract.whitelistedAddresses(userAddress);
        setWhitelisted(isWhitelisted);
      } catch (error) {
        console.error("Error checking whitelist:", error);
      }
    }
  };

  const addAddressToWhitelist = async () => {
    if (provider && userAddress) {
      try {
        const contract = getWhitelistContract(provider);
        const tx = await contract.addToWhitelist(userAddress);
        await tx.wait();
        setWhitelisted(true);
      } catch (error) {
        console.error("Error adding to whitelist:", error);
      }
    }
  };

  const removeAddressFromWhitelist = async () => {
    if (provider && userAddress) {
      try {
        const contract = getWhitelistContract(provider);
        const tx = await contract.removeFromWhitelist(userAddress);
        await tx.wait();
        setWhitelisted(false);
      } catch (error) {
        console.error("Error removing from whitelist:", error);
      }
    }
  };

  return (
    <>
      <Header />
      <Navbar />
      <Hero />
      
      <div style={{ padding: '2rem' }}>
        <h1>Whitelist DApp</h1>
        <input
          type="text"
          placeholder="Enter address"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
        />
        <button onClick={checkWhitelist}>Check Whitelist</button>
        <button onClick={addAddressToWhitelist}>Add to Whitelist</button>
        <button onClick={removeAddressFromWhitelist}>Remove from Whitelist</button>
  
        {whitelisted !== null && (
          <p>
            Address {userAddress} is {whitelisted ? 'whitelisted' : 'not whitelisted'}
          </p>
        )}
      </div>
      
      <Footer />
    </>
  );
}
