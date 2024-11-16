import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function Component() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Proposals</h1>
        <div className="flex gap-3">
          <Button variant="outline">Verify Identity</Button>
          <Button>Create Proposal</Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-muted/50 text-muted-foreground">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <div className="space-y-1.5">
            <h2 className="text-2xl font-semibold">Staking</h2>
            <p className="text-muted-foreground">
              Staking 20% of DAO funds for 6 months
            </p>
            <p className="text-sm text-muted-foreground">
              Published by{" "}
              <span className="font-mono">0x1234...5678</span>
            </p>
          </div>
          <Badge variant="secondary" className="h-fit">
            Active
          </Badge>
        </CardHeader>
      </Card>
    </div>
  )
}