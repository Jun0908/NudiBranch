'use client'

import * as React from "react"
import { ArrowLeft, ArrowRight, Upload, Check, X } from 'lucide-react'
import { ethers } from 'ethers'
import Navbar from "@/components/header/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useRouter } from 'next/navigation'

// Assuming WhitelistAbi is imported correctly
import WhitelistAbi from '../../contracts/Whitelist.json'

const WHITELIST_CONTRACT_ADDRESS = '0xd7ac369ade1d914857059f50201868c184e3bf94'

const getWhitelistContract = (provider: ethers.providers.Web3Provider) => {
  return new ethers.Contract(WHITELIST_CONTRACT_ADDRESS, WhitelistAbi, provider.getSigner())
}

export default function Component() {
  const [progress, setProgress] = React.useState(25)
  const [provider, setProvider] = React.useState<ethers.providers.Web3Provider | null>(null)
  const [userAddress, setUserAddress] = React.useState<string>('')
  const [whitelisted, setWhitelisted] = React.useState<boolean | null>(null)
  const router = useRouter()

  React.useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum as any)
      setProvider(web3Provider)
      web3Provider.send("eth_requestAccounts", [])
    }
  }, [])

  const checkWhitelist = async () => {
    if (provider && userAddress) {
      try {
        const contract = getWhitelistContract(provider)
        const isWhitelisted = await contract.whitelistedAddresses(userAddress)
        setWhitelisted(isWhitelisted)
      } catch (error) {
        console.error("Error checking whitelist:", error)
      }
    }
  }

  const addAddressToWhitelist = async () => {
    if (provider && userAddress) {
      try {
        const contract = getWhitelistContract(provider)
        const tx = await contract.addToWhitelist(userAddress)
        await tx.wait()
        setWhitelisted(true)
      } catch (error) {
        console.error("Error adding to whitelist:", error)
      }
    }
  }

  const removeAddressFromWhitelist = async () => {
    if (provider && userAddress) {
      try {
        const contract = getWhitelistContract(provider)
        const tx = await contract.removeFromWhitelist(userAddress)
        await tx.wait()
        setWhitelisted(false)
      } catch (error) {
        console.error("Error removing from whitelist:", error)
      }
    }
  }

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto space-y-6">
        <Progress value={progress} className="h-2" />
        
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Step 1 of 4</div>
          <h1 className="text-4xl font-bold tracking-tight">Whitelist Management</h1>
          <p className="text-xl text-muted-foreground">
            Manage access to our exclusive platform
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-lg leading-7">
            Welcome to our exclusive platform's whitelist management system. This interface allows you to check, add, or remove addresses from the whitelist, ensuring controlled access to our services.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Whitelist Check</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="text"
              placeholder="Enter Ethereum address"
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
            />
            <div className="flex space-x-2">
              <Button onClick={checkWhitelist}>Check Whitelist</Button>
              <Button onClick={addAddressToWhitelist}>Add to Whitelist</Button>
              <Button onClick={removeAddressFromWhitelist}>Remove from Whitelist</Button>
            </div>
            {whitelisted !== null && (
              <Alert variant={whitelisted ? "default" : "destructive"}>
                <AlertTitle>{whitelisted ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}</AlertTitle>
                <AlertDescription>
                  Address {userAddress} is {whitelisted ? 'whitelisted' : 'not whitelisted'}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between pt-6">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button onClick={() => router.push('/synthesis-2')} className="gap-2 bg-[#6366F1] hover:bg-[#5558E3]">
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}