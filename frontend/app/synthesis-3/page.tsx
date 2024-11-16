"use client"

import * as React from "react"
import { ArrowLeft, ArrowRight, Upload, Check } from 'lucide-react'
import * as Client from '@web3-storage/w3up-client'
import Navbar from "@/components/header/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"

export default function Component() {
  const [progress, setProgress] = React.useState(75)
  const [generatedImage, setGeneratedImage] = React.useState("https://picsum.photos/300/300")
  const [cid, setCid] = React.useState<string | null>(null)
  const [isStoring, setIsStoring] = React.useState(false)
  const [imageName, setImageName] = React.useState("")
  const [email, setEmail] = React.useState('')
  const [client, setClient] = React.useState<any>(null)
  const [file, setFile] = React.useState<File | null>(null)

  const isValidEmail = (email: string): email is `${string}@${string}` => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const initializeClient = async () => {
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.')
      return
    }

    setIsStoring(true)
    try {
      const clientInstance = await Client.create()
      await clientInstance.login(email)
      const spaces = await clientInstance.spaces()
      let space
      if (spaces.length > 0) {
        space = spaces[0]
      } else {
        space = await clientInstance.createSpace('my-space')
      }
      await clientInstance.setCurrentSpace(space.did())
      setClient(clientInstance)
      alert('Client initialized, logged in, and space set!')
    } catch (error) {
      console.error('Error initializing client or setting space:', error)
      alert('Error initializing client. Please try again.')
    }
    setIsStoring(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (client && file) {
      setIsStoring(true)
      try {
        const uploadedCid = await client.uploadFile(file)
        setCid(uploadedCid.toString())
        alert(`File uploaded! CID: ${uploadedCid}`)
      } catch (error) {
        console.error('Error uploading file:', error)
        alert('Error uploading file. Please try again.')
      }
      setIsStoring(false)
    } else {
      alert('Client not initialized or no file selected.')
    }
  }

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 bg-background">
       <Navbar />
      <div className="max-w-4xl mx-auto space-y-6">
        <Progress value={progress} className="h-2" />
        
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Step 3 of 4</div>
          <h1 className="text-4xl font-bold tracking-tight">Store Image on IPFS</h1>
          <p className="text-xl text-muted-foreground">
            Save your generated image to Storacha IPFS
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-lg leading-7">
            In this step, you can store your generated image on IPFS using Storacha IPFS. This will provide a permanent, decentralized storage solution for your creation.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Generated Image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <img src={generatedImage} alt="Generated image" className="w-full h-auto rounded-lg" />
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button 
              className="w-full" 
              onClick={initializeClient}
              disabled={isStoring || !isValidEmail(email)}
            >
              Initialize Client
            </Button>
            <Input
              type="file"
              onChange={handleFileChange}
            />
            <Button 
              className="w-full" 
              onClick={handleUpload}
              disabled={isStoring || !file || !client}
            >
              <Upload className="w-4 h-4 mr-2" />
              {isStoring ? "Storing..." : "Store on IPFS"}
            </Button>
          </CardContent>
        </Card>

        {cid && (
          <Alert>
            <Check className="h-4 w-4" />
            <AlertDescription>
              Image stored successfully on IPFS! 
              <br />
              IPFS CID: <code className="bg-muted p-1 rounded">{cid}</code>
              <br />
              Gateway URL: <a href={`https://w3s.link/ipfs/${cid}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                https://w3s.link/ipfs/{cid}
              </a>
            </AlertDescription>
          </Alert>
        )}

        <div className="flex justify-between pt-6">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button className="gap-2 bg-[#6366F1] hover:bg-[#5558E3]">
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}