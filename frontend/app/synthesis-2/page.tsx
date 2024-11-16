"use client"

import * as React from "react"
import { ArrowLeft, ArrowRight, Upload } from 'lucide-react'
import Navbar from "@/components/header/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function Component() {
  const [progress, setProgress] = React.useState(50)
  const [imageDescription, setImageDescription] = React.useState("")
  const [width, setWidth] = React.useState("")
  const [height, setHeight] = React.useState("")
  const [generatedImage, setGeneratedImage] = React.useState<string | null>(null)
  const [isGenerating, setIsGenerating] = React.useState(false)

  const generateImage = async () => {
    setIsGenerating(true)
    // Simulating image generation with a timeout
    setTimeout(() => {
      setGeneratedImage(`https://picsum.photos/${width || 300}/${height || 300}`)
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto space-y-6">
        <Progress value={progress} className="h-2" />
        
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Step 2 of 4</div>
          <h1 className="text-4xl font-bold tracking-tight">Text to Image</h1>
          <p className="text-xl text-muted-foreground">
            Generate AI images using distributed GPUs
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-lg leading-7">
            Welcome to our AI image generation platform. Harness the power of distributed GPUs to bring your textual descriptions to life as stunning visual creations.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Image Generation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea 
              placeholder="Enter your image description here..." 
              className="min-h-[100px]"
              value={imageDescription}
              onChange={(e) => setImageDescription(e.target.value)}
            />
            <div className="flex items-center space-x-2">
              <Input 
                type="number" 
                placeholder="Width" 
                className="w-24"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
              />
              <span>x</span>
              <Input 
                type="number" 
                placeholder="Height" 
                className="w-24"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <Button 
              className="w-full" 
              onClick={generateImage}
              disabled={isGenerating}
            >
              <Upload className="w-4 h-4 mr-2" />
              {isGenerating ? "Generating..." : "Generate Image"}
            </Button>
          </CardContent>
        </Card>

        {generatedImage && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Image</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={generatedImage} alt="Generated image" className="w-full h-auto rounded-lg" />
            </CardContent>
          </Card>
        )}

        {generatedImage && (
          <Alert>
            <AlertDescription>
              Image generated successfully! You can now download or share your creation.
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