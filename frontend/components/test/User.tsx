import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import SecureETHDistributorAbi from '../contracts/ABI/SendToken.json';
import Header from "./Header";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const CONTRACT_ADDRESS = "0x5d3c5c80aa78c5a0eee0f747188fe552f439ef08";

export default function User() {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [balance, setBalance] = useState<string>("0");
  const [hasClaimed, setHasClaimed] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(web3Provider);
      setContract(new ethers.Contract(CONTRACT_ADDRESS, SecureETHDistributorAbi, web3Provider.getSigner()));
    }
  }, []);

  const fetchBalance = async () => {
    if (contract) {
      const balance = await contract.getBalance();
      setBalance(ethers.utils.formatEther(balance));
    }
  };

  const checkClaimStatus = async () => {
    if (contract && provider) {
      const userAddress = await provider.getSigner().getAddress();
      const claimed = await contract.hasClaimed(userAddress);
      setHasClaimed(claimed);
    }
  };

  const claimETH = async () => {
    if (contract && !hasClaimed) {
      try {
        await contract.claimETH();
        setHasClaimed(true);
        await fetchBalance();
      } catch (error) {
        console.error("Claim Error:", error);
      }
    }
  };

  useEffect(() => {
    fetchBalance();
    checkClaimStatus();
  }, [contract]);

  return (
    <>
      <Header />
      <Navbar />
      <Hero />
    <div style={{ padding: '2rem' }}>
      <h1>User Dashboard</h1>
      <p>Contract Balance: {balance} ETH</p>
      <button onClick={claimETH} disabled={hasClaimed === true}>
        {hasClaimed ? "Already Claimed" : "Claim 0.01 ETH"}
      </button>
      {hasClaimed !== null && (
        <p>{hasClaimed ? "You have already claimed your ETH." : "You can claim your ETH."}</p>
      )}
    </div>
    <Footer />
    </>
  );
}
