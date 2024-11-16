'use client'

import * as React from "react"
import { ArrowLeft, ArrowRight } from 'lucide-react'
import * as Progress from '@radix-ui/react-progress'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export default function Component() {
  const [supportThreshold, setSupportThreshold] = React.useState(50)
  const [minParticipation, setMinParticipation] = React.useState(50)

  const handleSupportInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(100, Math.max(0, Number(e.target.value) || 0))
    setSupportThreshold(value)
  }

  const handleParticipationInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(100, Math.max(0, Number(e.target.value) || 0))
    setMinParticipation(value)
  }

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-2">
          <div className="space-y-2">
            <Progress.Root className="relative overflow-hidden bg-secondary h-2 w-full rounded-full">
              <Progress.Indicator
                className="bg-primary h-full w-full transition-all duration-500 ease-in-out rounded-full"
                style={{ transform: `translateX(-${100 - 100}%)` }}
              />
            </Progress.Root>
            <div className="text-sm text-muted-foreground">Step 4 of 4</div>
          </div>
          <CardTitle className="text-2xl font-bold">Select governance settings</CardTitle>
          <CardDescription>
            These are the rules that define how decisions are made in your DAO. How many people have to participate? How much support is needed? How long are proposals open for voting?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-4">
              <Label>Support threshold</Label>
              <div className="flex gap-4 items-center">
                <div className="w-24">
                  <Input
                    type="number"
                    value={supportThreshold}
                    onChange={handleSupportInput}
                    min={0}
                    max={100}
                    className="text-center"
                  />
                </div>
                <div className="flex-1">
                  <Slider
                    value={[supportThreshold]}
                    onValueChange={(value) => setSupportThreshold(value[0])}
                    max={100}
                    step={1}
                  />
                </div>
                <div className="w-12 text-muted-foreground">%</div>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Minimum Participation</Label>
              <div className="flex gap-4 items-center">
                <div className="w-24">
                  <Input
                    type="number"
                    value={minParticipation}
                    onChange={handleParticipationInput}
                    min={0}
                    max={100}
                    className="text-center"
                  />
                </div>
                <div className="flex-1">
                  <Slider
                    value={[minParticipation]}
                    onValueChange={(value) => setMinParticipation(value[0])}
                    max={100}
                    step={1}
                  />
                </div>
                <div className="w-12 text-muted-foreground">%</div>
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