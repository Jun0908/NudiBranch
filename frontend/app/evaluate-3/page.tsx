'use client'

import * as React from "react"
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Navbar from "@/components/header/navbar"
import * as Progress from "@radix-ui/react-progress"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function Component() {
  const [fidelity, setFidelity] = React.useState("")
  const [alignment, setAlignment] = React.useState("")

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <Navbar />
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
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Evaluating Quality</CardTitle>
            <Button variant="default" className="bg-black hover:bg-black/90">
              Verify Identity
            </Button>
          </div>
          <CardDescription>
            Incorporating Human Subjective Evaluation for Fidelity and Alignment
          </CardDescription>
          <p className="text-sm text-muted-foreground">
            Combining FID with human evaluations addresses fidelity and alignment issues. Diverse panels of reviewers provide nuanced insights, helping models better align with cultural and contextual expectations. Studies indicate that incorporating human reviews can considerably improve alignment accuracy, ensuring reliable and relevant outputs.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-teal-500">Fidelity</CardTitle>
                <CardDescription>
                  Does the image look like an AI-generated photo or a real photo?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={fidelity} onValueChange={setFidelity}>
                  <div className="space-y-3">
                    <Label className="flex items-center space-x-3">
                      <RadioGroupItem value="1" />
                      <span>1. AI-generated photo</span>
                    </Label>
                    <Label className="flex items-center space-x-3">
                      <RadioGroupItem value="2" />
                      <span>2. Probably an AI generated photo, but photorealistic</span>
                    </Label>
                    <Label className="flex items-center space-x-3">
                      <RadioGroupItem value="3" />
                      <span>3. Neutral</span>
                    </Label>
                    <Label className="flex items-center space-x-3">
                      <RadioGroupItem value="4" />
                      <span>4. Probably a real photo, but with irregular textures and shapes</span>
                    </Label>
                    <Label className="flex items-center space-x-3">
                      <RadioGroupItem value="5" />
                      <span>5. Real photo</span>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-teal-500">Alignment</CardTitle>
                <CardDescription>
                  How well does the image match the description?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={alignment} onValueChange={setAlignment}>
                  <div className="space-y-3">
                    <Label className="flex items-center space-x-3">
                      <RadioGroupItem value="1" />
                      <span>1. Does not match at all</span>
                    </Label>
                    <Label className="flex items-center space-x-3">
                      <RadioGroupItem value="2" />
                      <span>2. Has significant discrepancies</span>
                    </Label>
                    <Label className="flex items-center space-x-3">
                      <RadioGroupItem value="3" />
                      <span>3. Has several minor discrepancies</span>
                    </Label>
                    <Label className="flex items-center space-x-3">
                      <RadioGroupItem value="4" />
                      <span>4. Has a few minor discrepancies</span>
                    </Label>
                    <Label className="flex items-center space-x-3">
                      <RadioGroupItem value="5" />
                      <span>5. Matches exactly</span>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" className="w-24">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button className="w-24 bg-[#6366F1] hover:bg-[#5558DD]">
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}