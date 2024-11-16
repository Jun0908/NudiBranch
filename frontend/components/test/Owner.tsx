import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import SecureETHDistributorAbi from '../contracts/ABI/SendToken.json';
import Header from "./Header";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const CONTRACT_ADDRESS = "0x5d3c5c80aa78c5a0eee0f747188fe552f439ef08";
const OWNER_ADDRESS = process.env.NEXT_PUBLIC_OWNER_ADDRESS;

export default function Owner() {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [balance, setBalance] = useState<string>("0");
  const [newOwner, setNewOwner] = useState<string>("");

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

  const depositETH = async () => {
    if (provider && contract) {
      try {
        const tx = await contract.deposit({
          value: ethers.utils.parseEther("0.1"), // 0.1 ETHをデポジット
          gasLimit: ethers.utils.hexlify(100000), // ガスリミットを手動で設定
        });
        await tx.wait();
        await fetchBalance();
      } catch (error) {
        console.error("Deposit Error:", error);
      }
    }
  };

  const withdrawAll = async () => {
    if (contract) {
      try {
        await contract.withdrawAll();
        await fetchBalance();
      } catch (error) {
        console.error("Withdraw Error:", error);
      }
    }
  };

  const transferOwnership = async () => {
    if (contract) {
      try {
        await contract.transferOwnership(newOwner);
        alert(`Ownership transferred to ${newOwner}`);
      } catch (error) {
        console.error("Transfer Ownership Error:", error);
      }
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [contract]);

  return (
    <>
    <Header />
    <Navbar />
    <Hero />
    <div style={{ padding: '2rem' }}>
      <h1>Owner Dashboard</h1>
      <p>Contract Balance: {balance} ETH</p>
      <button onClick={depositETH}>Deposit 0.1 ETH</button>
      <button onClick={withdrawAll}>Withdraw All</button>
      <div>
        <input
          type="text"
          placeholder="New owner address"
          value={newOwner}
          onChange={(e) => setNewOwner(e.target.value)}
        />
        <button onClick={transferOwnership}>Transfer Ownership</button>
      </div>
    </div>
    <Footer />
    </>
  );
}
