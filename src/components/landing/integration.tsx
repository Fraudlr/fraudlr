/**
 * @fileoverview Integration Section Component
 * 
 * Showcases the platform's integration capabilities.
 * Features overlapping cards demonstrating API and SQL integration options.
 * Inspired by Linear.app's "Project updates" section design.
 */

import { Globe, Database } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

/**
 * Integration Section Component
 * 
 * Displays integration capabilities with visual card examples
 * and detailed feature descriptions.
 */
export function Integration() {
  return (
    <section id="integration" className="py-24 px-6 bg-[#0F0F0F]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Stacked Cards */}
          <div className="space-y-6">
            {/* API Integration Card */}
            <Card className="bg-card border-border shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Globe className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">API Integration</CardTitle>
                    <CardDescription className="text-sm">
                      Connect to external REST APIs
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Connect to external APIs to automatically import transaction data 
                  for fraud analysis. Supports REST APIs with JSON responses.
                </p>
                
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Custom authentication headers
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Scheduled data pulls
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Real-time webhooks
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* SQL Database Card */}
            <Card className="bg-card border-border shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Database className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">SQL Database</CardTitle>
                    <CardDescription className="text-sm">
                      Connect to SQL databases
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Connect directly to your SQL database to query transaction data. 
                  Supports PostgreSQL, MySQL, and SQL Server.
                </p>
                
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    Secure encrypted connections
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    Custom SQL queries
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    Automated data sync
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-6 lg:pl-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
                Seamless <span className="text-red-500">Integration</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Connect external data sources for automated fraud analysis
              </p>
            </div>

            <div className="space-y-4 text-muted-foreground">
              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Automated Data Ingestion
                  </h3>
                  <p className="text-sm">
                    Import transaction data directly from your existing systems without manual uploads. 
                    Set up once and let Fraudlr automatically pull and analyze your data.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    REST API Support
                  </h3>
                  <p className="text-sm">
                    Connect to any REST API endpoint with custom authentication headers, 
                    support for OAuth, API keys, and scheduled or real-time data synchronization.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Direct SQL Connections
                  </h3>
                  <p className="text-sm">
                    Query your databases directly with support for PostgreSQL, MySQL, and SQL Server. 
                    Write custom queries or use our templates to extract the data you need.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Secure & Encrypted
                  </h3>
                  <p className="text-sm">
                    All connections use enterprise-grade encryption. Your credentials are stored securely, 
                    and data transfers are protected with SSL/TLS protocols.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    No Data Migration
                  </h3>
                  <p className="text-sm">
                    Keep your data where it belongs. Fraudlr connects to your existing infrastructure, 
                    eliminating the need for costly and time-consuming data migrations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
