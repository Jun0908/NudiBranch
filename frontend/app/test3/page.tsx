'use client'

import * as React from "react"
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import * as Progress from '@radix-ui/react-progress'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Component() {
  const [tokenName, setTokenName] = React.useState("")
  const [tokenSymbol, setTokenSymbol] = React.useState("")
  const maxLength = 128

  const handleTokenNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= maxLength) {
      setTokenName(e.target.value)
    }
  }

  const handleTokenSymbolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= maxLength) {
      setTokenSymbol(e.target.value)
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-2">
          <div className="space-y-2">
            <Progress.Root className="relative overflow-hidden bg-secondary h-2 w-full rounded-full">
              <Progress.Indicator
                className="bg-primary h-full w-full transition-all duration-500 ease-in-out rounded-full"
                style={{ transform: `translateX(-${100 - 75}%)` }}
              />
            </Progress.Root>
            <div className="text-sm text-muted-foreground">Step 3 of 4</div>
          </div>
          <CardTitle className="text-2xl font-bold">Define membership</CardTitle>
          <CardDescription>
            Decide the type of voting your DAO uses. You can change these settings with a vote.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Who can participate in Governance?</h2>
            <div className="bg-secondary/50 p-4 rounded-lg flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-medium">Token Holders</h3>
                <p className="text-sm text-muted-foreground">
                  Tokens act as voting chips. The more tokens you hold, the more weight your vote has. 1 token equals 1 vote.
                </p>
              </div>
              <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                <Check className="h-3 w-3 text-primary-foreground" />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="token-name">Token name</Label>
              <div className="relative">
                <Input
                  id="token-name"
                  placeholder="Token name"
                  value={tokenName}
                  onChange={handleTokenNameChange}
                  className="pr-16"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  {tokenName.length}/{maxLength}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="token-symbol">Token symbol</Label>
              <div className="relative">
                <Input
                  id="token-symbol"
                  placeholder="abbreviation of the token"
                  value={tokenSymbol}
                  onChange={handleTokenSymbolChange}
                  className="pr-16"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  {tokenSymbol.length}/{maxLength}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}