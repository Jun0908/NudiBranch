'use client'

import * as React from "react"
import Navbar from "@/components/header/navbar"
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react'
import * as Progress from '@radix-ui/react-progress'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Component() {
  const [fidData, setFidData] = React.useState<any | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const router = useRouter()

  const fetchFidData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/demo/fid.json')
      if (!response.ok) throw new Error('Failed to fetch data')
      const result = await response.json()
      setFidData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <Navbar />
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-2">
          <div className="space-y-2">
            <Progress.Root className="relative overflow-hidden bg-secondary h-2 w-full rounded-full">
              <Progress.Indicator
                className="bg-primary h-full w-full transition-all duration-500 ease-in-out rounded-full"
                style={{ transform: `translateX(-${100 - 25}%)` }}
              />
            </Progress.Root>
            <div className="text-sm text-muted-foreground">Step 1 of 4</div>
          </div>
          <CardTitle className="text-2xl font-bold">Evaluating Quality</CardTitle>
          <CardDescription>
            Implementing FID for Objective Quality and Diversity Assessment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <p>
              FID (Frechet Inception Distance) is a metric for assessing the quality of generated content. 
              It analyzes distributional similarity between generated and real-world content, helping to 
              identify quality gaps and ensure diversity across language and cultural dimensions.
            </p>
            <p>
              Next, we'll calculate the FID score for your DAO content to evaluate its quality and diversity.
            </p>
          </div>
          <div className="rounded-lg border p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">FID Data</h2>
              <Button 
                onClick={fetchFidData} 
                disabled={isLoading}
                variant="outline"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Fetch Data
              </Button>
            </div>
            
            {error ? (
              <div className="text-destructive text-sm" role="alert">{error}</div>
            ) : (
              <div className="space-y-4">
                {isLoading ? (
                  <div className="h-8 w-24 animate-pulse bg-muted rounded" />
                ) : (
                  fidData ? (
                    <div>
                      <div className="text-3xl font-bold">FID Score: {fidData.FID.toFixed(2)}</div>
                      <div className="space-y-2 mt-4">
                        {fidData.progress.map((step: any, index: number) => (
                          <div key={index} className="space-y-1">
                            <p className="text-sm font-medium">{step.description}</p>
                            <p className="text-sm text-muted-foreground">
                              Completed Tasks: {step.completed_tasks}, 
                              Total Time: {step.total_time}, 
                              Avg Time per Task: {step.average_time_per_task}
                            </p>
                            <Progress.Root className="relative overflow-hidden bg-secondary h-2 w-full rounded-full">
                              <Progress.Indicator
                                className="bg-primary h-full transition-all duration-500 ease-in-out rounded-full"
                                style={{ transform: `translateX(-${100 - parseInt(step.progress_bar)}%)` }}
                              />
                            </Progress.Root>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : 'Click the button to fetch data'
                )}
              </div>
            )}
          </div>
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={() => router.push('/landing')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button onClick={() => router.push('/evaluate-2')}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


