/**
 * @fileoverview New Case Page
 * 
 * Page for creating a new fraud analysis case.
 * Features:
 * - Case name and description input
 * - CSV file upload
 * - AI module selection (Benford, M-Score)
 * - ChatGPT-style interface for interaction
 * - Data Point integration selection
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Upload,
  FileSpreadsheet,
  Send,
  Bot,
  User,
  Loader2,
  X,
  Globe,
  Database,
  BarChart3,
  ShieldAlert,
  AlertTriangle,
  Copy,
  PenLine,
  Coins,
  CalendarX2,
  FileText,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  parseCSV,
  analyzeFraudIndicators,
  type AnalysisResult,
} from "@/lib/csv-analysis"

/**
 * API Integration Entry Type (matching integration page)
 */
interface ApiIntegration {
  id: string
  type: "api" | "sql"
  datasetName: string
  endpointUrl: string
  authToken: string
  apiKey: string
  jsonPayload: string
  sourceName: string
  createdAt: string
}

/**
 * Message type for chat interface
 */
interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: Date
  /** Optional rich analysis payload rendered as KPI cards + risk score */
  analysis?: AnalysisResult
}

/**
 * New Case Page Component
 * 
 * Provides a ChatGPT-style interface for creating and analyzing cases.
 */
export default function NewCasePage() {
  const router = useRouter()
  
  // Form state
  const [caseName, setCaseName] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [file, setFile] = React.useState<File | null>(null)
  const [selectedDataPoint, setSelectedDataPoint] = React.useState<string>("")
  const [integrations, setIntegrations] = React.useState<ApiIntegration[]>([])
  const [isCreating, setIsCreating] = React.useState(false)
  const [showCaseCard, setShowCaseCard] = React.useState(true)
  const [analysisResult, setAnalysisResult] = React.useState<AnalysisResult | null>(null)
  
  // Chat state
  const [messages, setMessages] = React.useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm Fraudlr AI. I'll help you analyze your financial data for potential fraud. Start by giving your case a name. You can optionally upload a CSV file now or add it later.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = React.useState("")
  const [isProcessing, setIsProcessing] = React.useState(false)
  
  // Ref for auto-scrolling chat
  const scrollRef = React.useRef<HTMLDivElement>(null)

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

  /**
   * Handle file selection
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type !== "text/csv" && !selectedFile.name.endsWith(".csv")) {
        addMessage("assistant", "Please upload a CSV file. Other formats are not supported yet.")
        return
      }
      setFile(selectedFile)
      addMessage("assistant", `Great! I've received your file: "${selectedFile.name}". Click "Create Case" to start the analysis, or you can create the case without a file and upload it later.`)
    }
  }

  /**
   * Remove selected file
   */
  const removeFile = () => {
    setFile(null)
    addMessage("assistant", "File removed. You can upload a new file when ready.")
  }

  /**
   * Add a message to the chat
   */
  const addMessage = (role: "user" | "assistant", content: string) => {
    setMessages((prev) => [
      ...prev,
      { role, content, timestamp: new Date() },
    ])
    
    // Auto-scroll to bottom
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  /**
   * Handle chat input submission
   */
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput("")
    addMessage("user", userMessage)
    
    setIsProcessing(true)
    
    // Simulate AI response (in production, this would call an AI API)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    // Provide contextual responses
    if (userMessage.toLowerCase().includes("benford")) {
      addMessage(
        "assistant",
        "Benford's Law analysis examines the distribution of first digits in your data. In naturally occurring datasets, the digit 1 appears as the leading digit about 30% of the time, while 9 appears only about 5% of the time. Deviations from this pattern can indicate data manipulation or fraud."
      )
    } else if (userMessage.toLowerCase().includes("m-score") || userMessage.toLowerCase().includes("mscore")) {
      addMessage(
        "assistant",
        "The Beneish M-Score is a mathematical model that uses financial ratios to detect potential earnings manipulation. An M-Score greater than -2.22 suggests a higher probability of manipulation. I'll calculate this based on the financial data in your CSV."
      )
    } else if (userMessage.toLowerCase().includes("help")) {
      addMessage(
        "assistant",
        "Here's how to get started:\n\n1. Enter a name for your case (e.g., 'Q4 2025 Analysis')\n2. Add an optional description\n3. Optionally upload a CSV file with transaction data (you can add it later too)\n4. Click 'Create Case' to get started\n\nOnce you upload data, I can perform fraud analysis and answer your questions!"
      )
    } else {
      addMessage(
        "assistant",
        "I understand you're asking about '" + userMessage + "'. Once you create a case and upload data, I'll be able to provide more specific insights. Would you like to know more about Benford's Law or M-Score analysis?"
      )
    }
    
    setIsProcessing(false)
  }

  /**
   * Read file as text (promisified FileReader)
   */
  const readFileAsText = (f: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = () => reject(reader.error)
      reader.readAsText(f)
    })
  }

  /**
   * Handle case creation
   */
  const handleCreateCase = async () => {
    if (!caseName.trim()) {
      addMessage("assistant", "Please provide a name for your case before proceeding.")
      return
    }

    // Get selected integration details
    const selectedIntegration = selectedDataPoint 
      ? integrations.find(i => i.id === selectedDataPoint) 
      : null

    setShowCaseCard(false)
    setIsCreating(true)
    addMessage("user", `Create case: "${caseName}"${selectedIntegration ? ` with ${selectedIntegration.datasetName} data point` : ""}`)
    
    if (selectedIntegration) {
      addMessage("assistant", `Creating your case with ${selectedIntegration.type.toUpperCase()} data point: ${selectedIntegration.datasetName}...`)
    } else if (file) {
      addMessage("assistant", "Creating your case and starting analysis...")
    } else {
      addMessage("assistant", "Creating your case. You can upload a CSV file later for analysis.")
    }

    // ──────────────────────────────────────────
    // CSV Fraud Indicator Analysis
    // ──────────────────────────────────────────
    let analysis: AnalysisResult | null = null

    if (file) {
      try {
        addMessage("assistant", "📊 Parsing your CSV file and running fraud indicator analysis...")
        const text = await readFileAsText(file)
        const parsed = parseCSV(text)

        if (parsed.rows.length === 0) {
          addMessage("assistant", "⚠️ The CSV file appears to be empty or could not be parsed. Continuing with case creation.")
        } else {
          analysis = analyzeFraudIndicators(parsed)
          setAnalysisResult(analysis)

          // Push a rich message with the analysis payload
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant" as const,
              content: "__ANALYSIS__",
              timestamp: new Date(),
              analysis,
            },
          ])

          // Scroll to bottom after rendering
          setTimeout(() => {
            scrollRef.current?.scrollIntoView({ behavior: "smooth" })
          }, 200)
        }
      } catch (err) {
        console.error("CSV analysis error:", err)
        addMessage("assistant", "⚠️ Could not analyse the CSV file. Continuing with case creation.")
      }
    }

    try {
      // Create case via API
      const formData = new FormData()
      formData.append("name", caseName)
      formData.append("description", description)
      if (file) {
        formData.append("file", file)
      }
      // Include data point information
      if (selectedDataPoint && selectedIntegration) {
        formData.append("dataPointId", selectedDataPoint)
        formData.append("dataPointType", selectedIntegration.type)
        formData.append("dataPointName", selectedIntegration.datasetName)
      }
      // Include risk score from analysis
      if (analysis) {
        formData.append("riskScore", String(analysis.riskScore))
      }

      const response = await fetch("/api/cases", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        
        // Build success message
        let successMessage = "✅ Case created successfully!"
        if (selectedIntegration) {
          successMessage += ` Connected to ${selectedIntegration.type.toUpperCase()} data point: ${selectedIntegration.datasetName}.`
        }
        if (analysis) {
          successMessage += ` Fraud Risk Score of ${analysis.riskScore} (${analysis.riskLevel}) has been saved.`
        }
        successMessage += " The case has been saved to your Case History. You can continue reviewing the analysis here."
        
        addMessage("assistant", successMessage)
      } else {
        const error = await response.json()
        addMessage(
          "assistant",
          `❌ Error creating case: ${error.message || "Please try again."}`
        )
      }
    } catch (error) {
      addMessage(
        "assistant",
        "❌ An error occurred while creating the case. Please try again."
      )
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6">
      {/* Left Panel - Case Form */}
      {showCaseCard && (
      <Card className="w-80 shrink-0 bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            New Case
          </CardTitle>
          <CardDescription>
            Create a new fraud analysis case
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Case Name */}
          <div className="space-y-2">
            <Label htmlFor="caseName">Case Name *</Label>
            <Input
              id="caseName"
              value={caseName}
              onChange={(e) => setCaseName(e.target.value)}
              placeholder="e.g., Q4 Transaction Analysis"
              className="bg-background border-border"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description..."
              rows={3}
              className="bg-background border-border resize-none"
            />
          </div>

          {/* Data Point Selection */}
          <div className="space-y-2">
            <Label htmlFor="dataPoint">Data Point</Label>
            <Select
              value={selectedDataPoint}
              onValueChange={setSelectedDataPoint}
            >
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Select integration..." />
              </SelectTrigger>
              <SelectContent>
                {integrations.length === 0 ? (
                  <div className="px-2 py-4 text-sm text-muted-foreground text-center">
                    No integrations available.
                    <br />
                    <span className="text-xs">Add integrations in Settings → Integrations</span>
                  </div>
                ) : (
                  integrations.map((integration) => (
                    <SelectItem key={integration.id} value={integration.id}>
                      <div className="flex items-center gap-2">
                        {integration.type === "api" ? (
                          <Globe className="h-3.5 w-3.5 text-blue-500" />
                        ) : (
                          <Database className="h-3.5 w-3.5 text-purple-500" />
                        )}
                        <span>{integration.datasetName}</span>
                        <Badge 
                          variant="secondary" 
                          className={`text-[10px] px-1.5 py-0 ${
                            integration.type === "api" 
                              ? "bg-blue-500/10 text-blue-500" 
                              : "bg-purple-500/10 text-purple-500"
                          }`}
                        >
                          {integration.type.toUpperCase()}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Link an API or SQL data source to this case
            </p>
          </div>

          {/* Selected Data Point Badge */}
          {selectedDataPoint && (
            <div className="flex items-center gap-2 p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <Globe className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-blue-500 flex-1">
                {integrations.find(i => i.id === selectedDataPoint)?.datasetName}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 text-blue-500 hover:text-blue-600"
                onClick={() => setSelectedDataPoint("")}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}

          {/* File Upload */}
          <div className="space-y-2">
            <Label>Upload CSV (Optional)</Label>
            {file ? (
              <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg border border-primary/20">
                <FileSpreadsheet className="h-5 w-5 text-primary" />
                <span className="flex-1 text-sm truncate">{file.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={removeFile}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="relative">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center gap-2 p-6 border-2 border-dashed border-border rounded-lg hover:border-primary/50 transition-colors">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Click to upload CSV
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Create Button */}
          <Button
            className="w-full"
            onClick={handleCreateCase}
            disabled={isCreating || !caseName.trim()}
          >
            {isCreating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Case"
            )}
          </Button>
        </CardContent>
      </Card>
      )}

      {/* Right Panel - Chat Interface */}
      <Card className="flex-1 flex flex-col bg-card border-border">
        <CardHeader className="border-b border-border shrink-0">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            Fraudlr AI Assistant
          </CardTitle>
          <CardDescription>
            Ask questions about fraud detection and analysis
          </CardDescription>
        </CardHeader>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}

                {/* ── Rich analysis card ── */}
                {message.analysis ? (
                  <div className="max-w-[90%] space-y-4">
                    {/* Header */}
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-sm font-semibold flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-primary" />
                        Fraud Indicator Analysis — {message.analysis.totalRows} rows analysed
                      </p>
                    </div>

                    {/* KPI Indicator Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {message.analysis.indicators.map((ind, i) => {
                        const icons = [Copy, PenLine, Coins, CalendarX2, FileText]
                        const colors = [
                          "text-blue-500 bg-blue-500/10",
                          "text-purple-500 bg-purple-500/10",
                          "text-amber-500 bg-amber-500/10",
                          "text-rose-500 bg-rose-500/10",
                          "text-teal-500 bg-teal-500/10",
                        ]
                        const Icon = icons[i] ?? AlertTriangle
                        const color = colors[i] ?? "text-muted-foreground bg-muted"
                        return (
                          <div
                            key={ind.label}
                            className="rounded-xl border border-border bg-card p-4 flex flex-col gap-2"
                          >
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <span className="text-xs text-muted-foreground">{ind.label}</span>
                            <span className="text-2xl font-bold">{ind.count}</span>
                            <span className="text-[10px] text-muted-foreground">Weight: {ind.weight}</span>
                          </div>
                        )
                      })}
                    </div>

                    {/* Fraud Risk Score Card */}
                    <div
                      className={`rounded-xl border p-5 space-y-3 ${
                        message.analysis.riskColor === "red"
                          ? "border-red-500/40 bg-red-500/5"
                          : message.analysis.riskColor === "orange"
                          ? "border-orange-500/40 bg-orange-500/5"
                          : "border-yellow-500/40 bg-yellow-500/5"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold flex items-center gap-2">
                          <ShieldAlert className={`h-5 w-5 ${
                            message.analysis.riskColor === "red" ? "text-red-500" :
                            message.analysis.riskColor === "orange" ? "text-orange-500" : "text-yellow-500"
                          }`} />
                          Fraud Risk Score
                        </span>
                        <Badge
                          className={`text-xs font-bold px-3 py-1 ${
                            message.analysis.riskColor === "red"
                              ? "bg-red-500/20 text-red-500 hover:bg-red-500/30"
                              : message.analysis.riskColor === "orange"
                              ? "bg-orange-500/20 text-orange-500 hover:bg-orange-500/30"
                              : "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30"
                          }`}
                        >
                          {message.analysis.riskLevel} Flag
                        </Badge>
                      </div>

                      <div className="text-4xl font-extrabold tracking-tight">
                        {message.analysis.riskScore}
                        <span className="text-base font-normal text-muted-foreground"> / 10</span>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full h-2.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            message.analysis.riskColor === "red"
                              ? "bg-red-500"
                              : message.analysis.riskColor === "orange"
                              ? "bg-orange-500"
                              : "bg-yellow-500"
                          }`}
                          style={{ width: `${(message.analysis.riskScore / 10) * 100}%` }}
                        />
                      </div>

                      {/* Scale legend */}
                      <div className="flex justify-between text-[10px] text-muted-foreground">
                        <span>0</span>
                        <span className="text-yellow-500">Medium (0-3)</span>
                        <span className="text-orange-500">High (3-6)</span>
                        <span className="text-red-500">Highest (6-10)</span>
                        <span>10</span>
                      </div>

                      <p className="text-xs text-muted-foreground">
                        Score = average weight ({(message.analysis.indicators.reduce((s, i) => s + i.weight, 0) / message.analysis.indicators.length).toFixed(2)}) × total indicators ({message.analysis.totalIndicators}). Higher score indicates more fraudulent activity.
                      </p>
                    </div>
                  </div>
                ) : (
                  /* ── Normal text message ── */
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                )}

                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
            {isProcessing && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        {/* Chat Input */}
        <div className="p-4 border-t border-border shrink-0">
          <form onSubmit={handleChatSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about fraud detection..."
              className="flex-1 bg-background border-border"
              disabled={isProcessing}
            />
            <Button type="submit" size="icon" disabled={isProcessing || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}
