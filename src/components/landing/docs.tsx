/**
 * @fileoverview API Documentation Section Component
 * 
 * Displays basic API documentation for the Fraudlr platform.
 * Uses a simplified Swagger-like format with code examples.
 * 
 * Note: For a full Swagger UI implementation, you would integrate
 * the swagger-ui-react package with an OpenAPI specification.
 */

import { 
  Code2, 
  Lock, 
  Zap, 
  FileJson,
  Terminal
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

/**
 * API endpoint documentation data
 */
const endpoints = [
  {
    method: "POST",
    path: "/api/auth/signup",
    description: "Create a new user account",
    auth: false,
  },
  {
    method: "POST",
    path: "/api/auth/login",
    description: "Authenticate and receive JWT token",
    auth: false,
  },
  {
    method: "GET",
    path: "/api/auth/me",
    description: "Get current user information",
    auth: true,
  },
  {
    method: "POST",
    path: "/api/cases",
    description: "Create a new fraud analysis case",
    auth: true,
  },
  {
    method: "GET",
    path: "/api/cases",
    description: "List all cases for current user",
    auth: true,
  },
  {
    method: "POST",
    path: "/api/cases/:id/analyze",
    description: "Run AI analysis on a case",
    auth: true,
  },
]

/**
 * Docs Component
 * 
 * Displays API documentation with code examples and endpoint listing.
 */
export function Docs() {
  return (
    <section 
      id="docs" 
      className="py-24 bg-gradient-to-b from-background to-background/95"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#F3F3F3] mb-4">
            Developer{" "}
            <span className="text-[#FD4D53]">Documentation</span>
          </h2>
          <p className="text-lg text-[#D9D9D9] max-w-2xl mx-auto">
            Integrate Fraudlr's powerful fraud detection capabilities into your 
            applications with our simple RESTful API.
          </p>
        </div>

        {/* Quick Start Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {[
            { icon: Zap, title: "Quick Setup", desc: "Get started in minutes" },
            { icon: Lock, title: "Secure", desc: "JWT authentication" },
            { icon: FileJson, title: "REST API", desc: "JSON responses" },
            { icon: Code2, title: "SDKs", desc: "Coming soon" },
          ].map((item, index) => (
            <Card key={index} className="bg-[#0F0F0F] border-[#545454]/30 text-center">
              <CardContent className="pt-6">
                <item.icon className="h-8 w-8 text-[#FD4D53] mx-auto mb-4" />
                <h3 className="text-[#F3F3F3] font-semibold">{item.title}</h3>
                <p className="text-sm text-[#545454]">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* API Documentation Tabs */}
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="endpoints" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-[#0F0F0F] border border-[#545454]/30">
              <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
              <TabsTrigger value="authentication">Authentication</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
            </TabsList>
            
            {/* Endpoints Tab */}
            <TabsContent value="endpoints" className="mt-6">
              <Card className="bg-[#0F0F0F] border-[#545454]/30">
                <CardHeader>
                  <CardTitle className="text-[#F3F3F3]">API Endpoints</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {endpoints.map((endpoint, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-4 p-4 bg-[#0F0F0F] border border-[#545454]/30 rounded-lg"
                      >
                        {/* HTTP Method Badge */}
                        <span className={`px-3 py-1 rounded text-xs font-bold ${
                          endpoint.method === "GET" 
                            ? "bg-green-500/20 text-green-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}>
                          {endpoint.method}
                        </span>
                        
                        {/* Endpoint Path */}
                        <code className="text-[#D9D9D9] font-mono text-sm flex-1">
                          {endpoint.path}
                        </code>
                        
                        {/* Auth Required Indicator */}
                        {endpoint.auth && (
                          <Lock className="h-4 w-4 text-[#545454]" />
                        )}
                        
                        {/* Description */}
                        <span className="text-sm text-[#545454] hidden md:block">
                          {endpoint.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Authentication Tab */}
            <TabsContent value="authentication" className="mt-6">
              <Card className="bg-[#0F0F0F] border-[#545454]/30">
                <CardHeader>
                  <CardTitle className="text-[#F3F3F3]">Authentication</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-[#F3F3F3] font-semibold mb-2">JWT Bearer Token</h4>
                    <p className="text-[#D9D9D9] text-sm mb-4">
                      Fraudlr uses JWT (JSON Web Tokens) for API authentication. 
                      After logging in, include the token in the Authorization header.
                    </p>
                    <div className="bg-black rounded-lg p-4 overflow-x-auto">
                      <code className="text-[#FD4D53] text-sm font-mono">
                        Authorization: Bearer &lt;your-jwt-token&gt;
                      </code>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-[#F3F3F3] font-semibold mb-2">Token Expiration</h4>
                    <p className="text-[#D9D9D9] text-sm">
                      Tokens expire after 7 days. Use the refresh endpoint to obtain 
                      a new token before expiration.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Examples Tab */}
            <TabsContent value="examples" className="mt-6">
              <Card className="bg-[#0F0F0F] border-[#545454]/30">
                <CardHeader>
                  <CardTitle className="text-[#F3F3F3] flex items-center gap-2">
                    <Terminal className="h-5 w-5" />
                    Code Examples
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Login Example */}
                  <div>
                    <h4 className="text-[#F3F3F3] font-semibold mb-2">Login Request</h4>
                    <div className="bg-black rounded-lg p-4 overflow-x-auto">
                      <pre className="text-sm font-mono">
                        <code className="text-[#D9D9D9]">
{`curl -X POST https://api.fraudlr.com/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@example.com",
    "password": "your-password"
  }'`}
                        </code>
                      </pre>
                    </div>
                  </div>
                  
                  {/* Create Case Example */}
                  <div>
                    <h4 className="text-[#F3F3F3] font-semibold mb-2">Create Analysis Case</h4>
                    <div className="bg-black rounded-lg p-4 overflow-x-auto">
                      <pre className="text-sm font-mono">
                        <code className="text-[#D9D9D9]">
{`curl -X POST https://api.fraudlr.com/api/cases \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Q4 Transaction Analysis",
    "description": "Quarterly fraud check"
  }'`}
                        </code>
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
