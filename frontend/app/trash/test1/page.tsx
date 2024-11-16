import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Component() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8 space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Create your DAO</h1>
          <div className="h-2 w-full rounded-full bg-muted">
            <div className="h-full w-1/4 rounded-full bg-primary" />
          </div>
          <p className="text-sm text-muted-foreground">Step 1 of 4</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Select Blockchain</h2>
          <p className="text-sm text-muted-foreground">
            The chain you choose is where your tokens and assets are stored. If you already have a token, choose the chain your
            token is minted on. This cannot be changed later.
          </p>
        </div>
        <Tabs defaultValue="testnet" className="w-full">
          <TabsList className="grid w-full max-w-[400px] grid-cols-2">
            <TabsTrigger value="mainnet" disabled className="cursor-not-allowed">
              Mainnet Coming soon
            </TabsTrigger>
            <TabsTrigger value="testnet">Testnet</TabsTrigger>
          </TabsList>
        </Tabs>
        <RadioGroup defaultValue="optimism" className="space-y-4">
          <div className="space-y-4">
            <Label className="sr-only">Select a blockchain network</Label>
            <Card className="relative flex items-center space-x-4 p-4 hover:bg-accent">
              <RadioGroupItem value="optimism" id="optimism" className="absolute right-4" />
              <div className="h-10 w-10 overflow-hidden rounded-full bg-[#FF0420]">
                <div className="flex h-full items-center justify-center text-white font-bold">OP</div>
              </div>
              <div className="space-y-1">
                <Label className="text-base" htmlFor="optimism">
                  Optimism Sepolia Testnet
                </Label>
                <p className="text-sm text-muted-foreground">L2 Blockchain</p>
              </div>
            </Card>
          </div>
        </RadioGroup>
      </div>
      <div className="mt-8 flex justify-between">
        <Button variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button>
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}