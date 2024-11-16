"use client"

import * as React from "react"
import { ArrowLeft, Check, Loader2 } from 'lucide-react'
import { ethers } from "ethers"
import Navbar from "@/components/header/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Assuming IPFS_NFT_ABI is imported correctly
import IPFS_NFT_ABI from '../../contracts/IPFS_NFT.json'

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
]

export default function Component() {
  const [progress, setProgress] = React.useState(100)
  const [account, setAccount] = React.useState<string>("")
  const [tokenId, setTokenId] = React.useState<string>("")
  const [imageUrls, setImageUrls] = React.useState<string[]>(["", "", ""])
  const [isMinting, setIsMinting] = React.useState(false)

  React.useEffect(() => {
    if (window.ethereum) {
      initializeAccount()
    } else {
      console.error("Metamask not found")
    }
  }, [])

  const initializeAccount = async () => {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      setAccount(accounts[0])
    } catch (error) {
      console.error("Wallet connection failed:", error)
    }
  }

  const mintNFT = async (contractIndex: number) => {
    if (!account) {
      alert("Please connect your wallet first")
      return
    }

    setIsMinting(true)
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contracts[contractIndex].address, IPFS_NFT_ABI, signer)
      const newTokenId = Date.now()
      setTokenId(newTokenId.toString())

      const tx = await contract.safeMint(account, newTokenId, contracts[contractIndex].cid)
      await tx.wait()
      alert("NFT minted successfully!")

      const newImageUrls = [...imageUrls]
      newImageUrls[contractIndex] = `https://ipfs.io/ipfs/${contracts[contractIndex].cid}`
      setImageUrls(newImageUrls)
    } catch (error) {
      console.error("Minting failed:", error)
      alert("Failed to mint NFT. Please try again.")
    }
    setIsMinting(false)
  }

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 bg-background">
       <Navbar />
      <div className="max-w-4xl mx-auto space-y-6">
        <Progress value={progress} className="h-2" />
        
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Step 4 of 4</div>
          <h1 className="text-4xl font-bold tracking-tight">Mint Your NFT</h1>
          <p className="text-xl text-muted-foreground">
            Create an NFT from your IPFS-stored image
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-lg leading-7">
            In this final step, you can mint your IPFS-stored image as an NFT. Choose from one of the available contracts below to mint your NFT.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {contracts.map((contract, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>Contract {index + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {imageUrls[index] ? (
                  <img className="w-full h-auto rounded-lg" src={imageUrls[index]} alt={`Minted NFT ${index + 1}`} />
                ) : (
                  <div className="w-full h-48 bg-muted flex items-center justify-center rounded-lg">
                    No Image
                  </div>
                )}
                <Button 
                  className="w-full" 
                  onClick={() => mintNFT(index)}
                  disabled={isMinting}
                >
                  {isMinting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Minting...
                    </>
                  ) : (
                    "Mint NFT"
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {tokenId && (
          <Alert>
            <Check className="h-4 w-4" />
            <AlertDescription>
              NFT minted successfully! 
              <br />
              Token ID: <code className="bg-muted p-1 rounded">{tokenId}</code>
            </AlertDescription>
          </Alert>
        )}

        <div className="flex justify-between pt-6">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button className="gap-2 bg-[#6366F1] hover:bg-[#5558E3]">
            Finish
          </Button>
        </div>
      </div>
    </div>
  )
}