'use client';

import * as React from "react"
import { useState, useEffect } from "react"
import { ethers } from "ethers"
import Navbar from "@/components/header/navbar"
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import * as Progress from '@radix-ui/react-progress'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SecureETHDistributorAbi from "../../contracts/SendToken.json"; // Adjust the ABI import path

const CONTRACT_ADDRESS = "0x5d3c5c80aa78c5a0eee0f747188fe552f439ef08";

export default function User() {
  const router = useRouter();
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [balance, setBalance] = useState<string>("0");
  const [hasClaimed, setHasClaimed] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
      setLoading(true);
      try {
        await contract.claimETH();
        setHasClaimed(true);
        await fetchBalance();
      } catch (error) {
        console.error("Claim Error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchBalance();
    checkClaimStatus();
  }, [contract]);

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <Navbar />
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold">User Dashboard</CardTitle>
          <CardDescription>
            Thank you for participating in the survey. You can now claim your reward.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Contract Balance:</span>
              <span className="text-2xl font-bold">{balance} ETH</span>
            </div>
            <Button
              onClick={claimETH}
              disabled={hasClaimed === true || loading}
              className={`w-full ${loading ? "opacity-50 cursor-not-allowed" : "bg-[#6366F1] hover:bg-[#5558DD]"}`}
            >
              {loading ? "Processing..." : hasClaimed ? "Already Claimed" : "Claim 0.01 ETH"}
            </Button>
            {hasClaimed !== null && (
              <p className="text-center text-muted-foreground">
                {hasClaimed ? "You have already claimed your ETH." : "You can claim your ETH."}
              </p>
            )}
          </div>

          <div className="flex justify-start pt-4">
            <Button variant="outline" className="w-[100px]" onClick={() => router.push('/evaluate-3')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

