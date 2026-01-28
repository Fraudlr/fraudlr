/**
 * @fileoverview Developers Page
 * 
 * Comprehensive API documentation and developer resources for Fraudlr.
 * Includes API reference, authentication guides, code examples, and best practices.
 * 
 * Inspired by modern developer portals with sidebar navigation and detailed guides.
 */

"use client"

import * as React from "react"
import Link from "next/link"
import { 
  Code2, 
  Lock, 
  Zap, 
  FileJson,
  Terminal,
  AlertCircle,
  CheckCircle2,
  Book,
  Webhook,
  Activity,
  ChevronRight,
  Menu,
  X
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

/**
 * Navigation sections for the sidebar
 */
const navSections = [
  {
    title: "Getting Started",
    items: [
      { label: "Overview", href: "#overview" },
      { label: "Quick Start", href: "#quick-start" },
      { label: "Authentication", href: "#authentication" },
    ]
  },
  {
    title: "API Reference",
    items: [
      { label: "Endpoints", href: "#endpoints" },
      { label: "Request Format", href: "#request-format" },
      { label: "Response Format", href: "#response-format" },
      { label: "Error Handling", href: "#error-handling" },
    ]
  },
  {
    title: "Guides",
    items: [
      { label: "Code Examples", href: "#examples" },
      { label: "Rate Limiting", href: "#rate-limiting" },
      { label: "Best Practices", href: "#best-practices" },
    ]
  },
  {
    title: "Resources",
    items: [
      { label: "Webhooks (Coming Soon)", href: "#webhooks" },
      { label: "SDKs (Coming Soon)", href: "#sdks" },
    ]
  }
]

/**
 * API endpoint documentation with detailed information
 */
const endpoints = [
  {
    method: "POST",
    path: "/api/auth/signup",
    description: "Create a new user account",
    auth: false,
    request: {
      email: "string (required)",
      password: "string (required)",
      name: "string (required)"
    },
    response: {
      id: "string",
      email: "string",
      name: "string",
      createdAt: "timestamp"
    }
  },
  {
    method: "POST",
    path: "/api/auth/login",
    description: "Authenticate and receive JWT token",
    auth: false,
    request: {
      email: "string (required)",
      password: "string (required)"
    },
    response: {
      token: "string",
      user: {
        id: "string",
        email: "string",
        name: "string"
      }
    }
  },
  {
    method: "GET",
    path: "/api/auth/me",
    description: "Get current authenticated user information",
    auth: true,
    request: null,
    response: {
      id: "string",
      email: "string",
      name: "string",
      createdAt: "timestamp"
    }
  },
  {
    method: "POST",
    path: "/api/cases",
    description: "Create a new fraud analysis case",
    auth: true,
    request: {
      name: "string (required)",
      description: "string (optional)",
      priority: "LOW | MEDIUM | HIGH (optional)"
    },
    response: {
      id: "string",
      name: "string",
      description: "string",
      status: "PENDING | IN_PROGRESS | COMPLETED",
      priority: "LOW | MEDIUM | HIGH",
      createdAt: "timestamp"
    }
  },
  {
    method: "GET",
    path: "/api/cases",
    description: "List all cases for the current user",
    auth: true,
    request: null,
    response: {
      cases: "Array<Case>",
      total: "number"
    }
  },
  {
    method: "GET",
    path: "/api/cases/:id",
    description: "Get detailed information about a specific case",
    auth: true,
    request: null,
    response: {
      id: "string",
      name: "string",
      description: "string",
      status: "string",
      priority: "string",
      analysis: "object | null",
      createdAt: "timestamp",
      updatedAt: "timestamp"
    }
  },
]

/**
 * HTTP status codes and their meanings
 */
const statusCodes = [
  { code: "200", meaning: "OK", description: "Request successful" },
  { code: "201", meaning: "Created", description: "Resource created successfully" },
  { code: "400", meaning: "Bad Request", description: "Invalid request parameters" },
  { code: "401", meaning: "Unauthorized", description: "Missing or invalid authentication token" },
  { code: "403", meaning: "Forbidden", description: "Insufficient permissions" },
  { code: "404", meaning: "Not Found", description: "Resource not found" },
  { code: "429", meaning: "Too Many Requests", description: "Rate limit exceeded" },
  { code: "500", meaning: "Server Error", description: "Internal server error" },
]

/**
 * Developers Page Component
 */
export default function DevelopersPage() {
  const [activeSection, setActiveSection] = React.useState("overview")
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  // Handle smooth scrolling to sections
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setSidebarOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-background to-background/95">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#F3F3F3] mb-6">
              Fraudlr <span className="text-[#FD4D53]">Developers</span>
            </h1>
            <p className="text-xl text-[#D9D9D9] mb-8">
              Build powerful fraud detection solutions with our comprehensive REST API. 
              Integrate advanced AI-powered analysis into your applications.
            </p>
            
            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                asChild
                className="bg-[#FD4D53] hover:bg-[#FD4D53]/90 text-white"
              >
                <a href="#quick-start">Get Started</a>
              </Button>
              <Button 
                asChild
                variant="outline"
                className="border-[#545454] text-[#F3F3F3] hover:bg-[#545454]/20"
              >
                <a href="#endpoints">View API Reference</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex gap-8 relative">
          {/* Mobile Sidebar Toggle */}
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full border-[#545454] bg-[#0F0F0F] shadow-lg"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>

          {/* Sidebar Navigation */}
          <aside className={`
            lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] 
            fixed inset-y-0 left-0 z-30 w-64 
            transform transition-transform duration-300 ease-in-out
            lg:transform-none
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            bg-[#0F0F0F] lg:bg-transparent
            border-r border-[#545454]/30 lg:border-0
            overflow-y-auto
            pt-20 lg:pt-0
            px-4 lg:px-0
          `}>
            <nav className="space-y-6">
              {navSections.map((section, idx) => (
                <div key={idx}>
                  <h3 className="text-[#F3F3F3] font-semibold mb-3 text-sm uppercase tracking-wider">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx}>
                        <a
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href)}
                          className="text-[#D9D9D9] hover:text-[#FD4D53] text-sm flex items-center gap-2 transition-colors py-1"
                        >
                          <ChevronRight className="h-3 w-3" />
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0 space-y-16 pb-16">
            {/* Overview Section */}
            <section id="overview" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-[#F3F3F3] mb-6">Overview</h2>
              <Card className="bg-[#0F0F0F] border-[#545454]/30">
                <CardContent className="pt-6">
                  <p className="text-[#D9D9D9] mb-4">
                    The Fraudlr API is a RESTful API that allows you to integrate fraud detection 
                    and analysis capabilities into your applications. Our API is designed to be simple, 
                    predictable, and easy to integrate.
                  </p>
                  <p className="text-[#D9D9D9] mb-4">
                    All API requests are made to <code className="text-[#FD4D53] bg-black px-2 py-1 rounded">
                    https://api.fraudlr.com</code> and all responses are returned in JSON format.
                  </p>
                  
                  <div className="mt-6 grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 p-4 bg-black/30 rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />
                      <div>
                        <h4 className="text-[#F3F3F3] font-semibold mb-1">REST-based</h4>
                        <p className="text-sm text-[#D9D9D9]">Standard HTTP methods and status codes</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-black/30 rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />
                      <div>
                        <h4 className="text-[#F3F3F3] font-semibold mb-1">JSON responses</h4>
                        <p className="text-sm text-[#D9D9D9]">All data returned in JSON format</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-black/30 rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />
                      <div>
                        <h4 className="text-[#F3F3F3] font-semibold mb-1">Secure</h4>
                        <p className="text-sm text-[#D9D9D9]">JWT-based authentication</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-black/30 rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />
                      <div>
                        <h4 className="text-[#F3F3F3] font-semibold mb-1">Rate limited</h4>
                        <p className="text-sm text-[#D9D9D9]">Fair usage policies applied</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Quick Start Section */}
            <section id="quick-start" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-[#F3F3F3] mb-6">Quick Start</h2>
              
              <div className="grid md:grid-cols-4 gap-4 mb-8">
                {[
                  { icon: Zap, title: "1. Sign Up", desc: "Create your account" },
                  { icon: Lock, title: "2. Authenticate", desc: "Get your JWT token" },
                  { icon: FileJson, title: "3. Make Requests", desc: "Call API endpoints" },
                  { icon: Code2, title: "4. Integrate", desc: "Build your solution" },
                ].map((step, index) => (
                  <Card key={index} className="bg-[#0F0F0F] border-[#545454]/30">
                    <CardContent className="pt-6 text-center">
                      <step.icon className="h-8 w-8 text-[#FD4D53] mx-auto mb-3" />
                      <h3 className="text-[#F3F3F3] font-semibold mb-1">{step.title}</h3>
                      <p className="text-sm text-[#545454]">{step.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-[#0F0F0F] border-[#545454]/30">
                <CardHeader>
                  <CardTitle className="text-[#F3F3F3]">Your First Request</CardTitle>
                  <CardDescription className="text-[#D9D9D9]">
                    Here's a complete example of authenticating and creating a case
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="curl" className="w-full">
                    <TabsList className="bg-black border border-[#545454]/30">
                      <TabsTrigger value="curl">cURL</TabsTrigger>
                      <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                      <TabsTrigger value="python">Python</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="curl" className="mt-4">
                      <div className="bg-black rounded-lg p-4 overflow-x-auto">
                        <pre className="text-sm font-mono">
                          <code className="text-[#D9D9D9]">{`# 1. Login to get token
curl -X POST https://api.fraudlr.com/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@example.com",
    "password": "your-password"
  }'

# 2. Create a case with the token
curl -X POST https://api.fraudlr.com/api/cases \\
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Transaction Analysis",
    "description": "Analyzing suspicious transactions",
    "priority": "HIGH"
  }'`}</code>
                        </pre>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="javascript" className="mt-4">
                      <div className="bg-black rounded-lg p-4 overflow-x-auto">
                        <pre className="text-sm font-mono">
                          <code className="text-[#D9D9D9]">{`// 1. Login to get token
const loginResponse = await fetch('https://api.fraudlr.com/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'your-password'
  })
});
const { token } = await loginResponse.json();

// 2. Create a case with the token
const caseResponse = await fetch('https://api.fraudlr.com/api/cases', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${token}\`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Transaction Analysis',
    description: 'Analyzing suspicious transactions',
    priority: 'HIGH'
  })
});
const newCase = await caseResponse.json();`}</code>
                        </pre>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="python" className="mt-4">
                      <div className="bg-black rounded-lg p-4 overflow-x-auto">
                        <pre className="text-sm font-mono">
                          <code className="text-[#D9D9D9]">{`import requests

# 1. Login to get token
login_response = requests.post(
    'https://api.fraudlr.com/api/auth/login',
    json={
        'email': 'user@example.com',
        'password': 'your-password'
    }
)
token = login_response.json()['token']

# 2. Create a case with the token
case_response = requests.post(
    'https://api.fraudlr.com/api/cases',
    headers={'Authorization': f'Bearer {token}'},
    json={
        'name': 'Transaction Analysis',
        'description': 'Analyzing suspicious transactions',
        'priority': 'HIGH'
    }
)
new_case = case_response.json()`}</code>
                        </pre>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </section>

            {/* Authentication Section */}
            <section id="authentication" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-[#F3F3F3] mb-6">Authentication</h2>
              
              <Card className="bg-[#0F0F0F] border-[#545454]/30 mb-6">
                <CardHeader>
                  <CardTitle className="text-[#F3F3F3] flex items-center gap-2">
                    <Lock className="h-5 w-5 text-[#FD4D53]" />
                    JWT Bearer Authentication
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[#D9D9D9]">
                    Fraudlr uses JSON Web Tokens (JWT) for API authentication. To authenticate your requests:
                  </p>
                  
                  <ol className="list-decimal list-inside space-y-3 text-[#D9D9D9]">
                    <li>Create an account via the signup endpoint or web interface</li>
                    <li>Login with your credentials to receive a JWT token</li>
                    <li>Include the token in the Authorization header of subsequent requests</li>
                  </ol>

                  <div className="bg-black rounded-lg p-4 mt-4">
                    <p className="text-[#545454] text-xs mb-2">AUTHORIZATION HEADER</p>
                    <code className="text-[#FD4D53] text-sm font-mono">
                      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
                    </code>
                  </div>

                  <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
                      <div>
                        <h4 className="text-blue-400 font-semibold mb-1">Token Expiration</h4>
                        <p className="text-sm text-[#D9D9D9]">
                          Tokens are valid for 7 days. After expiration, you'll need to login again 
                          to obtain a new token. Store tokens securely and never expose them in client-side code.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Endpoints Section */}
            <section id="endpoints" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-[#F3F3F3] mb-6">API Endpoints</h2>
              
              <div className="space-y-4">
                {endpoints.map((endpoint, index) => (
                  <Collapsible key={index}>
                    <Card className="bg-[#0F0F0F] border-[#545454]/30">
                      <CollapsibleTrigger className="w-full">
                        <CardHeader className="cursor-pointer hover:bg-[#545454]/10 transition-colors">
                          <div className="flex items-center gap-4">
                            <span className={`px-3 py-1 rounded text-xs font-bold ${
                              endpoint.method === "GET" 
                                ? "bg-green-500/20 text-green-400"
                                : "bg-blue-500/20 text-blue-400"
                            }`}>
                              {endpoint.method}
                            </span>
                            <code className="text-[#D9D9D9] font-mono text-sm flex-1 text-left">
                              {endpoint.path}
                            </code>
                            {endpoint.auth && (
                              <Lock className="h-4 w-4 text-[#545454]" />
                            )}
                            <ChevronRight className="h-4 w-4 text-[#545454]" />
                          </div>
                          <p className="text-sm text-[#545454] text-left mt-2">
                            {endpoint.description}
                          </p>
                        </CardHeader>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent>
                        <CardContent className="border-t border-[#545454]/30 pt-6">
                          <div className="space-y-6">
                            {/* Request Format */}
                            {endpoint.request && (
                              <div>
                                <h4 className="text-[#F3F3F3] font-semibold mb-3">Request Body</h4>
                                <div className="bg-black rounded-lg p-4 overflow-x-auto">
                                  <pre className="text-sm font-mono">
                                    <code className="text-[#D9D9D9]">
                                      {JSON.stringify(endpoint.request, null, 2)}
                                    </code>
                                  </pre>
                                </div>
                              </div>
                            )}
                            
                            {/* Response Format */}
                            <div>
                              <h4 className="text-[#F3F3F3] font-semibold mb-3">Response</h4>
                              <div className="bg-black rounded-lg p-4 overflow-x-auto">
                                <pre className="text-sm font-mono">
                                  <code className="text-[#D9D9D9]">
                                    {JSON.stringify(endpoint.response, null, 2)}
                                  </code>
                                </pre>
                              </div>
                            </div>

                            {/* Authentication Notice */}
                            {endpoint.auth && (
                              <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                                <p className="text-sm text-yellow-400 flex items-center gap-2">
                                  <Lock className="h-4 w-4" />
                                  This endpoint requires authentication. Include your JWT token in the Authorization header.
                                </p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                ))}
              </div>
            </section>

            {/* Request Format Section */}
            <section id="request-format" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-[#F3F3F3] mb-6">Request Format</h2>
              <Card className="bg-[#0F0F0F] border-[#545454]/30">
                <CardContent className="pt-6 space-y-4">
                  <p className="text-[#D9D9D9]">
                    All API requests must include the following headers:
                  </p>
                  
                  <div className="bg-black rounded-lg p-4">
                    <pre className="text-sm font-mono">
                      <code className="text-[#D9D9D9]">{`Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_HERE (for protected endpoints)`}</code>
                    </pre>
                  </div>

                  <p className="text-[#D9D9D9]">
                    Request bodies should be valid JSON and match the schema defined for each endpoint.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Response Format Section */}
            <section id="response-format" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-[#F3F3F3] mb-6">Response Format</h2>
              <Card className="bg-[#0F0F0F] border-[#545454]/30">
                <CardContent className="pt-6 space-y-4">
                  <p className="text-[#D9D9D9]">
                    All responses are returned in JSON format with appropriate HTTP status codes.
                  </p>
                  
                  <div>
                    <h4 className="text-[#F3F3F3] font-semibold mb-3">Success Response</h4>
                    <div className="bg-black rounded-lg p-4">
                      <pre className="text-sm font-mono">
                        <code className="text-[#D9D9D9]">{`{
  "id": "case_123",
  "name": "Transaction Analysis",
  "status": "PENDING",
  "createdAt": "2026-01-28T10:00:00Z"
}`}</code>
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[#F3F3F3] font-semibold mb-3">Error Response</h4>
                    <div className="bg-black rounded-lg p-4">
                      <pre className="text-sm font-mono">
                        <code className="text-[#D9D9D9]">{`{
  "error": "Validation Error",
  "message": "Name is required",
  "statusCode": 400
}`}</code>
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Error Handling Section */}
            <section id="error-handling" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-[#F3F3F3] mb-6">Error Handling</h2>
              
              <Card className="bg-[#0F0F0F] border-[#545454]/30 mb-6">
                <CardHeader>
                  <CardTitle className="text-[#F3F3F3]">HTTP Status Codes</CardTitle>
                  <CardDescription className="text-[#D9D9D9]">
                    The API uses standard HTTP status codes to indicate success or failure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {statusCodes.map((status, index) => (
                      <div 
                        key={index}
                        className="flex items-start gap-4 p-3 bg-black/30 rounded-lg"
                      >
                        <span className={`px-3 py-1 rounded text-xs font-bold ${
                          status.code.startsWith('2') 
                            ? "bg-green-500/20 text-green-400"
                            : status.code.startsWith('4')
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                        }`}>
                          {status.code}
                        </span>
                        <div className="flex-1">
                          <h4 className="text-[#F3F3F3] font-semibold">{status.meaning}</h4>
                          <p className="text-sm text-[#D9D9D9]">{status.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Code Examples Section */}
            <section id="examples" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-[#F3F3F3] mb-6">Code Examples</h2>
              
              <div className="space-y-6">
                {/* Example 1: Authentication Flow */}
                <Card className="bg-[#0F0F0F] border-[#545454]/30">
                  <CardHeader>
                    <CardTitle className="text-[#F3F3F3] flex items-center gap-2">
                      <Terminal className="h-5 w-5" />
                      Complete Authentication Flow
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="javascript" className="w-full">
                      <TabsList className="bg-black border border-[#545454]/30">
                        <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                        <TabsTrigger value="python">Python</TabsTrigger>
                        <TabsTrigger value="curl">cURL</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="javascript" className="mt-4">
                        <div className="bg-black rounded-lg p-4 overflow-x-auto">
                          <pre className="text-sm font-mono">
                            <code className="text-[#D9D9D9]">{`// Complete authentication and case creation flow
async function createFraudCase() {
  try {
    // 1. Login
    const loginRes = await fetch('https://api.fraudlr.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'user@example.com',
        password: 'your-password'
      })
    });
    
    if (!loginRes.ok) throw new Error('Login failed');
    const { token } = await loginRes.json();
    
    // 2. Create case
    const caseRes = await fetch('https://api.fraudlr.com/api/cases', {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${token}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Q1 Analysis',
        description: 'Quarterly fraud detection',
        priority: 'HIGH'
      })
    });
    
    const newCase = await caseRes.json();
    console.log('Case created:', newCase);
    
    return newCase;
  } catch (error) {
    console.error('Error:', error.message);
  }
}`}</code>
                          </pre>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="python" className="mt-4">
                        <div className="bg-black rounded-lg p-4 overflow-x-auto">
                          <pre className="text-sm font-mono">
                            <code className="text-[#D9D9D9]">{`import requests
from typing import Dict, Optional

class FraudlrAPI:
    def __init__(self, base_url: str = 'https://api.fraudlr.com'):
        self.base_url = base_url
        self.token: Optional[str] = None
    
    def login(self, email: str, password: str) -> Dict:
        """Authenticate and store token"""
        response = requests.post(
            f'{self.base_url}/api/auth/login',
            json={'email': email, 'password': password}
        )
        response.raise_for_status()
        data = response.json()
        self.token = data['token']
        return data
    
    def create_case(self, name: str, description: str = '', priority: str = 'MEDIUM') -> Dict:
        """Create a new fraud analysis case"""
        if not self.token:
            raise ValueError('Not authenticated. Call login() first.')
        
        response = requests.post(
            f'{self.base_url}/api/cases',
            headers={'Authorization': f'Bearer {self.token}'},
            json={
                'name': name,
                'description': description,
                'priority': priority
            }
        )
        response.raise_for_status()
        return response.json()

# Usage
api = FraudlrAPI()
api.login('user@example.com', 'your-password')
case = api.create_case('Q1 Analysis', 'Quarterly fraud detection', 'HIGH')
print(f"Created case: {case['id']}")`}</code>
                          </pre>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="curl" className="mt-4">
                        <div className="bg-black rounded-lg p-4 overflow-x-auto">
                          <pre className="text-sm font-mono">
                            <code className="text-[#D9D9D9]">{`# 1. Login and save token
TOKEN=$(curl -s -X POST https://api.fraudlr.com/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"user@example.com","password":"your-password"}' \\
  | jq -r '.token')

# 2. Create case using token
curl -X POST https://api.fraudlr.com/api/cases \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Q1 Analysis",
    "description": "Quarterly fraud detection",
    "priority": "HIGH"
  }'`}</code>
                          </pre>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                {/* Example 2: Listing and Filtering Cases */}
                <Card className="bg-[#0F0F0F] border-[#545454]/30">
                  <CardHeader>
                    <CardTitle className="text-[#F3F3F3]">Retrieving Case Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="javascript" className="w-full">
                      <TabsList className="bg-black border border-[#545454]/30">
                        <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                        <TabsTrigger value="python">Python</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="javascript" className="mt-4">
                        <div className="bg-black rounded-lg p-4 overflow-x-auto">
                          <pre className="text-sm font-mono">
                            <code className="text-[#D9D9D9]">{`// Get all cases
const getAllCases = async (token) => {
  const response = await fetch('https://api.fraudlr.com/api/cases', {
    headers: { 'Authorization': \`Bearer \${token}\` }
  });
  return await response.json();
};

// Get specific case
const getCase = async (token, caseId) => {
  const response = await fetch(\`https://api.fraudlr.com/api/cases/\${caseId}\`, {
    headers: { 'Authorization': \`Bearer \${token}\` }
  });
  return await response.json();
};`}</code>
                          </pre>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="python" className="mt-4">
                        <div className="bg-black rounded-lg p-4 overflow-x-auto">
                          <pre className="text-sm font-mono">
                            <code className="text-[#D9D9D9]">{`def get_all_cases(token: str) -> Dict:
    """Retrieve all cases for the authenticated user"""
    response = requests.get(
        'https://api.fraudlr.com/api/cases',
        headers={'Authorization': f'Bearer {token}'}
    )
    response.raise_for_status()
    return response.json()

def get_case(token: str, case_id: str) -> Dict:
    """Retrieve a specific case by ID"""
    response = requests.get(
        f'https://api.fraudlr.com/api/cases/{case_id}',
        headers={'Authorization': f'Bearer {token}'}
    )
    response.raise_for_status()
    return response.json()`}</code>
                          </pre>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Rate Limiting Section */}
            <section id="rate-limiting" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-[#F3F3F3] mb-6">Rate Limiting</h2>
              
              <Card className="bg-[#0F0F0F] border-[#545454]/30">
                <CardContent className="pt-6 space-y-4">
                  <p className="text-[#D9D9D9]">
                    To ensure fair usage and system stability, the Fraudlr API implements rate limiting:
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-black/30 rounded-lg">
                      <Activity className="h-6 w-6 text-[#FD4D53] mb-2" />
                      <h4 className="text-[#F3F3F3] font-semibold mb-1">Standard Tier</h4>
                      <p className="text-2xl font-bold text-[#FD4D53]">100</p>
                      <p className="text-sm text-[#D9D9D9]">requests per minute</p>
                    </div>
                    <div className="p-4 bg-black/30 rounded-lg">
                      <Activity className="h-6 w-6 text-[#FD4D53] mb-2" />
                      <h4 className="text-[#F3F3F3] font-semibold mb-1">Pro Tier</h4>
                      <p className="text-2xl font-bold text-[#FD4D53]">500</p>
                      <p className="text-sm text-[#D9D9D9]">requests per minute</p>
                    </div>
                    <div className="p-4 bg-black/30 rounded-lg">
                      <Activity className="h-6 w-6 text-[#FD4D53] mb-2" />
                      <h4 className="text-[#F3F3F3] font-semibold mb-1">Enterprise</h4>
                      <p className="text-2xl font-bold text-[#FD4D53]">Custom</p>
                      <p className="text-sm text-[#D9D9D9]">tailored to your needs</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-[#F3F3F3] font-semibold mb-3">Rate Limit Headers</h4>
                    <p className="text-[#D9D9D9] mb-3">
                      All API responses include headers indicating your current rate limit status:
                    </p>
                    <div className="bg-black rounded-lg p-4">
                      <pre className="text-sm font-mono">
                        <code className="text-[#D9D9D9]">{`X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1706437200`}</code>
                      </pre>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg mt-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5" />
                      <div>
                        <h4 className="text-yellow-400 font-semibold mb-1">Rate Limit Exceeded</h4>
                        <p className="text-sm text-[#D9D9D9]">
                          When you exceed your rate limit, you'll receive a 429 status code. 
                          Implement exponential backoff in your applications to handle this gracefully.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Best Practices Section */}
            <section id="best-practices" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-[#F3F3F3] mb-6">Best Practices</h2>
              
              <div className="space-y-4">
                <Card className="bg-[#0F0F0F] border-[#545454]/30">
                  <CardHeader>
                    <CardTitle className="text-[#F3F3F3] flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                      Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-2 text-[#D9D9D9]">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-[#FD4D53] mt-1" />
                        <span>Never expose your JWT tokens in client-side code or public repositories</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-[#FD4D53] mt-1" />
                        <span>Use environment variables to store sensitive credentials</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-[#FD4D53] mt-1" />
                        <span>Implement token refresh logic before expiration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-[#FD4D53] mt-1" />
                        <span>Always use HTTPS for API requests in production</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-[#0F0F0F] border-[#545454]/30">
                  <CardHeader>
                    <CardTitle className="text-[#F3F3F3] flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                      Error Handling
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-2 text-[#D9D9D9]">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-[#FD4D53] mt-1" />
                        <span>Always check HTTP status codes before processing responses</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-[#FD4D53] mt-1" />
                        <span>Implement proper error handling for network failures</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-[#FD4D53] mt-1" />
                        <span>Use try-catch blocks or equivalent error handling in your language</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-[#FD4D53] mt-1" />
                        <span>Log errors for debugging but avoid logging sensitive data</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-[#0F0F0F] border-[#545454]/30">
                  <CardHeader>
                    <CardTitle className="text-[#F3F3F3] flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                      Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-2 text-[#D9D9D9]">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-[#FD4D53] mt-1" />
                        <span>Implement caching for frequently accessed data</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-[#FD4D53] mt-1" />
                        <span>Use batch operations when available to reduce API calls</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-[#FD4D53] mt-1" />
                        <span>Respect rate limits and implement exponential backoff</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 text-[#FD4D53] mt-1" />
                        <span>Monitor your API usage and optimize requests</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Webhooks Section (Coming Soon) */}
            <section id="webhooks" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-[#F3F3F3] mb-6">Webhooks</h2>
              <Card className="bg-[#0F0F0F] border-[#545454]/30">
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <Webhook className="h-12 w-12 text-[#545454] mx-auto mb-4" />
                    <h3 className="text-[#F3F3F3] font-semibold mb-2">Coming Soon</h3>
                    <p className="text-[#D9D9D9]">
                      Webhook support for real-time notifications is currently in development.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* SDKs Section (Coming Soon) */}
            <section id="sdks" className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-[#F3F3F3] mb-6">SDKs</h2>
              <Card className="bg-[#0F0F0F] border-[#545454]/30">
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <Code2 className="h-12 w-12 text-[#545454] mx-auto mb-4" />
                    <h3 className="text-[#F3F3F3] font-semibold mb-2">Coming Soon</h3>
                    <p className="text-[#D9D9D9] mb-4">
                      Official SDKs for popular languages are in development:
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <span className="px-3 py-1 bg-black/30 rounded text-[#D9D9D9] text-sm">JavaScript/TypeScript</span>
                      <span className="px-3 py-1 bg-black/30 rounded text-[#D9D9D9] text-sm">Python</span>
                      <span className="px-3 py-1 bg-black/30 rounded text-[#D9D9D9] text-sm">Go</span>
                      <span className="px-3 py-1 bg-black/30 rounded text-[#D9D9D9] text-sm">Ruby</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Support Section */}
            <section className="scroll-mt-24">
              <Card className="bg-gradient-to-br from-[#FD4D53]/10 to-transparent border-[#FD4D53]/30">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold text-[#F3F3F3] mb-4">Need Help?</h3>
                  <p className="text-[#D9D9D9] mb-6">
                    Our developer support team is here to help you build amazing fraud detection solutions.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button 
                      asChild
                      className="bg-[#FD4D53] hover:bg-[#FD4D53]/90 text-white"
                    >
                      <Link href="/#contact">Contact Support</Link>
                    </Button>
                    <Button 
                      asChild
                      variant="outline"
                      className="border-[#545454] text-[#F3F3F3] hover:bg-[#545454]/20"
                    >
                      <Link href="/dashboard">View Dashboard</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  )
}
