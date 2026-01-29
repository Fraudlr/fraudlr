/**
 * @fileoverview New Case Page
 * 
 * Page for creating a new fraud analysis case.
 * Features:
 * - Case name and description input
 * - CSV file upload
 * - AI module selection (Benford, M-Score)
 * - ChatGPT-style interface for interaction
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
import {
  Upload,
  FileSpreadsheet,
  Send,
  Bot,
  User,
  Loader2,
  X,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

/**
 * Message type for chat interface
 */
interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: Date
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
  const [isCreating, setIsCreating] = React.useState(false)
  const [showCaseCard, setShowCaseCard] = React.useState(true)
  
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
   * Handle case creation
   */
  const handleCreateCase = async () => {
    if (!caseName.trim()) {
      addMessage("assistant", "Please provide a name for your case before proceeding.")
      return
    }

    setShowCaseCard(false)
    setIsCreating(true)
    addMessage("user", `Create case: "${caseName}"`)
    if (file) {
      addMessage("assistant", "Creating your case and starting analysis...")
    } else {
      addMessage("assistant", "Creating your case. You can upload a CSV file later for analysis.")
    }

    try {
      // Create case via API
      const formData = new FormData()
      formData.append("name", caseName)
      formData.append("description", description)
      if (file) {
        formData.append("file", file)
      }

      const response = await fetch("/api/cases", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        addMessage(
          "assistant",
          "✅ Case created successfully! I'm now analyzing your data using Benford's Law and M-Score algorithms. You'll be redirected to the case details shortly."
        )
        
        // Redirect to case details after a brief delay
        setTimeout(() => {
          router.push(`/dashboard/cases/${data.id}`)
        }, 2000)
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
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
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
