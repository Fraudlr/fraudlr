/**
 * @fileoverview Integration Page
 * 
 * Manage external data source integrations.
 * Features:
 * - API endpoint connections
 * - SQL database connections
 * - Integration status and management
 */

"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Plug,
  Database,
  Globe,
  Plus,
  Lock,
  Trash2,
  Calendar,
  Pencil,
} from "lucide-react"

/**
 * API Integration Entry Type
 */
export interface ApiIntegration {
  id: string
  type: "api" | "sql"
  datasetName: string
  endpointUrl: string
  httpMethod: string
  authToken: string
  apiKey: string
  jsonPayload: string
  sourceName: string
  createdAt: string
}

/**
 * Integration Page Component
 * 
 * Displays integration options and connected services.
 */
export default function IntegrationPage() {
  const router = useRouter()
  
  // For now, bypass auth check in client component - will be handled by middleware
  const hasIntegrationAccess = true

  // Modal state
  const [isApiModalOpen, setIsApiModalOpen] = React.useState(false)
  const [editingId, setEditingId] = React.useState<string | null>(null)
  
  // Integrations state
  const [integrations, setIntegrations] = React.useState<ApiIntegration[]>([])

  // Form state for API integration
  const [apiForm, setApiForm] = React.useState({
    datasetName: "",
    endpointUrl: "",
    httpMethod: "GET",
    authToken: "",
    apiKey: "",
    jsonPayload: "",
    sourceName: "",
  })

  // Load integrations from localStorage on mount
  React.useEffect(() => {
    const stored = localStorage.getItem("fraudlr-integrations")
    if (stored) {
      try {
        setIntegrations(JSON.parse(stored))
      } catch (e) {
        console.error("Failed to parse integrations:", e)
      }
    }
  }, [])

  // Save integrations to localStorage
  const saveIntegrations = (newIntegrations: ApiIntegration[]) => {
    localStorage.setItem("fraudlr-integrations", JSON.stringify(newIntegrations))
    setIntegrations(newIntegrations)
  }

  // Handle form field changes
  const handleApiFormChange = (field: string, value: string) => {
    setApiForm((prev) => ({ ...prev, [field]: value }))
  }

  // Reset form
  const resetApiForm = () => {
    setApiForm({
      datasetName: "",
      endpointUrl: "",
      httpMethod: "GET",
      authToken: "",
      apiKey: "",
      jsonPayload: "",
      sourceName: "",
    })
    setEditingId(null)
  }

  // Open modal for creating new integration
  const handleAddNew = () => {
    resetApiForm()
    setIsApiModalOpen(true)
  }

  // Open modal for editing existing integration
  const handleEdit = (integration: ApiIntegration) => {
    setApiForm({
      datasetName: integration.datasetName,
      endpointUrl: integration.endpointUrl,
      httpMethod: integration.httpMethod,
      authToken: integration.authToken,
      apiKey: integration.apiKey,
      jsonPayload: integration.jsonPayload,
      sourceName: integration.sourceName,
    })
    setEditingId(integration.id)
    setIsApiModalOpen(true)
  }

  // Create or update API integration entry
  const handleSaveApiEntry = () => {
    if (!apiForm.datasetName.trim()) {
      return
    }

    if (editingId) {
      // Update existing integration
      const updatedIntegrations = integrations.map((integration) =>
        integration.id === editingId
          ? {
              ...integration,
              datasetName: apiForm.datasetName,
              endpointUrl: apiForm.endpointUrl,
              httpMethod: apiForm.httpMethod,
              authToken: apiForm.authToken,
              apiKey: apiForm.apiKey,
              jsonPayload: apiForm.jsonPayload,
              sourceName: apiForm.sourceName,
            }
          : integration
      )
      saveIntegrations(updatedIntegrations)
    } else {
      // Create new integration
      const newIntegration: ApiIntegration = {
        id: crypto.randomUUID(),
        type: "api",
        datasetName: apiForm.datasetName,
        endpointUrl: apiForm.endpointUrl,
        httpMethod: apiForm.httpMethod,
        authToken: apiForm.authToken,
        apiKey: apiForm.apiKey,
        jsonPayload: apiForm.jsonPayload,
        sourceName: apiForm.sourceName,
        createdAt: new Date().toISOString(),
      }
      saveIntegrations([...integrations, newIntegration])
    }

    resetApiForm()
    setIsApiModalOpen(false)
  }

  // Delete integration
  const handleDeleteIntegration = (id: string) => {
    saveIntegrations(integrations.filter((i) => i.id !== id))
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

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
              onClick={handleAddNew}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add to List
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
          {integrations.length === 0 ? (
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
          ) : (
            <div className="space-y-4">
              {integrations.map((integration) => (
                <div
                  key={integration.id}
                  className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      integration.type === "api" 
                        ? "bg-blue-500/10" 
                        : "bg-purple-500/10"
                    }`}>
                      {integration.type === "api" ? (
                        <Globe className="h-5 w-5 text-blue-500" />
                      ) : (
                        <Database className="h-5 w-5 text-purple-500" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{integration.datasetName}</h4>
                        <Badge 
                          variant="secondary" 
                          className={
                            integration.type === "api" 
                              ? "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20" 
                              : "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20"
                          }
                        >
                          {integration.type.toUpperCase()}
                        </Badge>
                        {integration.type === "api" && integration.httpMethod && (
                          <Badge 
                            variant="outline" 
                            className="text-[10px] px-1.5 py-0 font-mono"
                          >
                            {integration.httpMethod}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Source: {integration.sourceName || "Not specified"}
                        {integration.type === "api" && integration.endpointUrl && (
                          <span className="ml-2 text-xs font-mono opacity-70">
                            {integration.endpointUrl}
                          </span>
                        )}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(integration.createdAt)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-primary"
                      onClick={() => handleEdit(integration)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => handleDeleteIntegration(integration.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* API Integration Modal */}
      <Dialog open={isApiModalOpen} onOpenChange={setIsApiModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-500" />
              {editingId ? "Edit API Integration" : "Add API Integration"}
            </DialogTitle>
            <DialogDescription>
              {editingId 
                ? "Update your API integration details below." 
                : "Configure your external API connection. Fill in the details below to connect your data source."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Dataset Name */}
            <div className="space-y-2">
              <Label htmlFor="datasetName">
                API Dataset Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="datasetName"
                value={apiForm.datasetName}
                onChange={(e) => handleApiFormChange("datasetName", e.target.value)}
                placeholder="e.g., Transaction Data API"
                className="bg-background"
              />
              <p className="text-xs text-muted-foreground">
                A descriptive name to identify this API integration
              </p>
            </div>

            {/* Source Name */}
            <div className="space-y-2">
              <Label htmlFor="sourceName">Source Name</Label>
              <Input
                id="sourceName"
                value={apiForm.sourceName}
                onChange={(e) => handleApiFormChange("sourceName", e.target.value)}
                placeholder="e.g., Payment Gateway, Banking System"
                className="bg-background"
              />
              <p className="text-xs text-muted-foreground">
                The name of the external system or provider
              </p>
            </div>

            {/* Endpoint URL */}
            <div className="space-y-2">
              <Label htmlFor="endpointUrl">Endpoint URL</Label>
              <Input
                id="endpointUrl"
                value={apiForm.endpointUrl}
                onChange={(e) => handleApiFormChange("endpointUrl", e.target.value)}
                placeholder="https://api.example.com/v1/transactions"
                className="bg-background font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                The base URL for the API endpoint
              </p>
            </div>

            {/* HTTP Method */}
            <div className="space-y-2">
              <Label htmlFor="httpMethod">HTTP Method</Label>
              <Select
                value={apiForm.httpMethod}
                onValueChange={(value) => handleApiFormChange("httpMethod", value)}
              >
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select HTTP method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PUT">PUT</SelectItem>
                  <SelectItem value="PATCH">PATCH</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                The HTTP method used for API requests
              </p>
            </div>

            {/* Authentication Section */}
            <div className="border-t pt-4">
              <h4 className="text-sm font-semibold mb-3">Authentication</h4>
              
              {/* Auth Token */}
              <div className="space-y-2 mb-4">
                <Label htmlFor="authToken">Bearer Token / Auth Token</Label>
                <Input
                  id="authToken"
                  type="password"
                  value={apiForm.authToken}
                  onChange={(e) => handleApiFormChange("authToken", e.target.value)}
                  placeholder="Enter your authentication token"
                  className="bg-background font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  JWT token or bearer token for authorization
                </p>
              </div>

              {/* API Key */}
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  value={apiForm.apiKey}
                  onChange={(e) => handleApiFormChange("apiKey", e.target.value)}
                  placeholder="Enter your API key"
                  className="bg-background font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  API key for header-based authentication (X-API-Key)
                </p>
              </div>
            </div>

            {/* Request Configuration */}
            <div className="border-t pt-4">
              <h4 className="text-sm font-semibold mb-3">Request Configuration</h4>
              
              {/* JSON Payload */}
              <div className="space-y-2">
                <Label htmlFor="jsonPayload">JSON Payload Template</Label>
                <Textarea
                  id="jsonPayload"
                  value={apiForm.jsonPayload}
                  onChange={(e) => handleApiFormChange("jsonPayload", e.target.value)}
                  placeholder={`{
  "startDate": "{{start_date}}",
  "endDate": "{{end_date}}",
  "limit": 1000
}`}
                  rows={6}
                  className="bg-background font-mono text-sm resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  JSON body template for POST requests. Use {"{{variable}}"} for dynamic values.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsApiModalOpen(false)
              resetApiForm()
            }}>
              Cancel
            </Button>
            <Button 
              onClick={handleSaveApiEntry}
              disabled={!apiForm.datasetName.trim()}
            >
              {editingId ? "Update Entry" : "Create Entry"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
