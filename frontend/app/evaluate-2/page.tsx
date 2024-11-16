'use client'

import * as React from "react"
import Navbar from "@/components/header/navbar"
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

export default function Component() {
  const [prompt, setPrompt] = React.useState("")
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [generatedImages, setGeneratedImages] = React.useState<string[]>([])
  const maxPromptLength = 128
  const router = useRouter()

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= maxPromptLength) {
      setPrompt(e.target.value)
    }
  }

  const generateImages = async () => {
    setIsGenerating(true)
    // Using demo images instead of placeholders
    const images = [
      "./demo-image-1.png",
      "./demo-image-2.png",
      "./demo-image-3.png",
      "./demo-image-4.png"
    ]
    await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate delay
    setGeneratedImages(images)
    setIsGenerating(false)
  }

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <Navbar />
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-2">
          <div className="space-y-2">
            <Progress value={50} className="h-2" />
            <div className="text-sm text-muted-foreground">Step 2 of 4</div>
          </div>
          <CardTitle className="text-2xl font-bold">Evaluating Quality</CardTitle>
          <CardDescription>
            Implementing FID for Objective Quality and Diversity Assessment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="prompt">Prompt</Label>
              <div className="relative">
                <Input
                  id="prompt"
                  placeholder="A programmer sitting at a desk and coding"
                  value={prompt}
                  onChange={handlePromptChange}
                  className="pr-16"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  {prompt.length}/{maxPromptLength}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-end">
                <Button
                  onClick={generateImages}
                  disabled={isGenerating}
                  className="w-full sm:w-auto"
                >
                  {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isGenerating ? 'Generating...' : 'Generate Images'}
                </Button>
              </div>
              
              {generatedImages.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {generatedImages.map((image, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden bg-muted">
                      <img
                        src={image}
                        alt={`Generated image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => router.push('/evaluate-1')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button onClick={() => router.push('/evaluate-3')}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
