'use client';

import Link from "next/link"
import { ArrowRight } from 'lucide-react'
import Navbar from "@/components/header/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Component() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-white to-blue-50 p-4">
      
      {/* Navbar を追加 */}
      <Navbar />
      
      <div className="mx-auto w-full max-w-6xl space-y-12 text-center">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Nudibranch</h1>
          <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl">Preserving diverse LLMs ensures quality, reduces bias, and embraces diversity.</p>
        </div>
        
        <div className="space-y-4">
          
          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="relative overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl">Evaluating Quality </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-500">FID (Frechet Inception Distance) & Human Subjective Evaluation.</p>
                <Button className="group" variant="default">
                  Evaluate
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
            
            <Card className="relative overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl">Text to Images</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-500">Generate AI ＆ images using distributed GPUs</p>
                <Button className="group" variant="default">
                  Synthesis
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
