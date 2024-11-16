'use client'

import * as React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"

export default function Component() {
  const [daoName, setDaoName] = React.useState("")
  const [daoDescription, setDaoDescription] = React.useState("")
  const maxNameLength = 32
  const maxDescriptionLength = 128

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= maxNameLength) {
      setDaoName(e.target.value)
    }
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxDescriptionLength) {
      setDaoDescription(e.target.value)
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-2">
          <div className="space-y-2">
            <Progress value={50} className="h-2" />
            <div className="text-sm text-muted-foreground">Step 2 of 4</div>
          </div>
          <CardTitle className="text-2xl font-bold">Create your DAO</CardTitle>
          <CardDescription>
            Name and define your DAO so new contributors know they&apos;ve come to the right place. This information is
            displayed on the DAOExplore page and can be changed with a vote.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="dao-name">DAO Name</Label>
            <div className="relative">
              <Input
                id="dao-name"
                placeholder="Enter DAO name"
                value={daoName}
                onChange={handleNameChange}
                className="pr-16"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                {daoName.length}/{maxNameLength}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dao-description">DAO Description</Label>
            <div className="relative">
              <Textarea
                id="dao-description"
                placeholder="Your DAO Description"
                value={daoDescription}
                onChange={handleDescriptionChange}
                className="min-h-[150px] resize-none pr-16"
              />
              <span className="absolute right-3 bottom-3 text-sm text-muted-foreground">
                {daoDescription.length}/{maxDescriptionLength}
              </span>
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