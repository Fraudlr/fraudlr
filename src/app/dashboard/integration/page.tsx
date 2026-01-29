/**
 * @fileoverview Integration Page
 * 
 * Manage external data source integrations.
 * Features:
 * - API endpoint connections
 * - SQL database connections
 * - Integration status and management
 */

import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Plug,
  Database,
  Globe,
  Plus,
  Lock,
} from "lucide-react"

/**
 * Integration Page Component
 * 
 * Displays integration options and connected services.
 */
export default async function IntegrationPage() {
  // Get authenticated user
  const user = await getCurrentUser()
  
  if (!user) {
    redirect("/login")
  }

  // Check if user has Pro tier for integrations
  // TEMPORARY: For development purposes - bypassing upgrade feature for all users (current and new sign-ups)
  // TODO: Re-enable tier check when ready for production
  const hasIntegrationAccess = true // user.tier === "pro" || user.tier === "standard"

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Integrations</h1>
        <p className="text-muted-foreground mt-1">
          Connect external data sources for automated fraud analysis
        </p>
      </div>

      {/* Tier Restriction Notice */}
      {!hasIntegrationAccess && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="flex items-center gap-4 p-6">
            <Lock className="h-8 w-8 text-primary" />
            <div className="flex-1">
              <h3 className="font-semibold">Upgrade Required</h3>
              <p className="text-sm text-muted-foreground">
                External integrations are available on Standard and Pro plans. 
                Upgrade to connect your data sources.
              </p>
            </div>
            <Button>Upgrade Now</Button>
          </CardContent>
        </Card>
      )}

      {/* Integration Options */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* API Integration */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Globe className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <CardTitle>API Integration</CardTitle>
                <CardDescription>
                  Connect to external REST APIs
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Connect to external APIs to automatically import transaction data 
              for fraud analysis. Supports REST APIs with JSON responses.
            </p>
            
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Custom authentication headers
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Scheduled data pulls
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Real-time webhooks (Pro)
              </li>
            </ul>

            <Button 
              className="w-full" 
              variant="outline"
              disabled={!hasIntegrationAccess}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add API Connection
            </Button>
          </CardContent>
        </Card>

        {/* SQL Integration */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Database className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <CardTitle>SQL Database</CardTitle>
                <CardDescription>
                  Connect to SQL databases
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Connect directly to your SQL database to query transaction data. 
              Supports PostgreSQL, MySQL, and SQL Server.
            </p>
            
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Secure encrypted connections
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Custom SQL queries
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Scheduled sync (Pro)
              </li>
            </ul>

            <Button 
              className="w-full" 
              variant="outline"
              disabled={!hasIntegrationAccess}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add SQL Connection
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Connected Integrations */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plug className="h-5 w-5" />
            Connected Integrations
          </CardTitle>
          <CardDescription>
            Your active data source connections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="p-4 rounded-full bg-muted mb-4">
              <Plug className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No integrations yet</h3>
            <p className="text-muted-foreground text-sm max-w-md">
              {hasIntegrationAccess
                ? "Connect an API or SQL database to start importing data automatically."
                : "Upgrade your plan to connect external data sources."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
