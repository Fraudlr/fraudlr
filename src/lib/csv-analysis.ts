/**
 * @fileoverview CSV Parsing & Fraud Indicator Analysis Engine
 *
 * Provides utilities to:
 * - Parse raw CSV text into structured data
 * - Run 5 fraud indicator checks (Duplicate IDs, Manual Entries,
 *   Round Numbers, Weekend Dates, Duplicate Invoices)
 * - Calculate a weighted Fraud Risk Score (0-10)
 */

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────

export interface ParsedCSV {
  headers: string[]
  rows: Record<string, string>[]
}

export interface IndicatorResult {
  label: string
  count: number
  weight: number
  /** Row indices (0-based) that triggered this indicator */
  flaggedRows: number[]
  details: string[]
}

export interface AnalysisResult {
  indicators: IndicatorResult[]
  totalIndicators: number
  riskScore: number
  riskLevel: "Medium" | "High" | "Highest"
  riskColor: string
  totalRows: number
}

// ──────────────────────────────────────────────
// Weights
// ──────────────────────────────────────────────

const WEIGHTS = {
  duplicateIds: 0.5,
  manualEntries: 0.5,
  roundNumbers: 0.9,
  weekendDates: 0.5,
  duplicateInvoices: 0.7,
} as const

// ──────────────────────────────────────────────
// CSV Parser
// ──────────────────────────────────────────────

/**
 * Parse raw CSV text into headers and an array of row objects.
 * Handles quoted fields that may contain commas or newlines.
 */
export function parseCSV(text: string): ParsedCSV {
  const lines = splitCSVLines(text)
  if (lines.length === 0) return { headers: [], rows: [] }

  const headers = splitCSVRow(lines[0]).map((h) => h.trim())
  const rows: Record<string, string>[] = []

  for (let i = 1; i < lines.length; i++) {
    const values = splitCSVRow(lines[i])
    if (values.length === 0 || (values.length === 1 && values[0].trim() === "")) continue
    const row: Record<string, string> = {}
    headers.forEach((header, idx) => {
      row[header] = (values[idx] ?? "").trim()
    })
    rows.push(row)
  }

  return { headers, rows }
}

/** Split CSV content into lines respecting quoted fields */
function splitCSVLines(text: string): string[] {
  const lines: string[] = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (ch === '"') {
      inQuotes = !inQuotes
      current += ch
    } else if ((ch === "\n" || ch === "\r") && !inQuotes) {
      if (ch === "\r" && text[i + 1] === "\n") i++ // skip \r\n
      if (current.trim().length > 0) lines.push(current)
      current = ""
    } else {
      current += ch
    }
  }
  if (current.trim().length > 0) lines.push(current)
  return lines
}

/** Split a single CSV row into values respecting quoted fields */
function splitCSVRow(line: string): string[] {
  const values: string[] = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (ch === "," && !inQuotes) {
      values.push(current)
      current = ""
    } else {
      current += ch
    }
  }
  values.push(current)
  return values
}

// ──────────────────────────────────────────────
// Column detection helpers
// ──────────────────────────────────────────────

function findColumns(headers: string[], patterns: RegExp[]): string[] {
  return headers.filter((h) => {
    const lower = h.toLowerCase()
    return patterns.some((p) => p.test(lower))
  })
}

function findIdColumns(headers: string[]): string[] {
  return findColumns(headers, [
    /^id$/,
    /^record.?id$/,
    /^transaction.?id$/,
    /^trans.?id$/,
    /^entry.?id$/,
    /^ref.?id$/,
    /^reference.?id$/,
    /^unique.?id$/,
    /^row.?id$/,
    /^key$/,
  ])
}

function findInvoiceColumns(headers: string[]): string[] {
  return findColumns(headers, [
    /invoice/,
    /inv.?no/,
    /inv.?num/,
    /inv.?#/,
    /bill.?no/,
    /bill.?num/,
    /document.?no/,
    /doc.?no/,
    /voucher/,
  ])
}

function findAmountColumns(headers: string[]): string[] {
  return findColumns(headers, [
    /debit/,
    /credit/,
    /amount/,
    /value/,
    /total/,
    /balance/,
    /sum/,
    /payment/,
    /price/,
    /cost/,
  ])
}

function findDateColumns(headers: string[]): string[] {
  return findColumns(headers, [
    /date/,
    /created.?at/,
    /updated.?at/,
    /timestamp/,
    /posted/,
    /trans.?date/,
    /entry.?date/,
    /effective/,
    /due/,
  ])
}

function findSourceColumns(headers: string[]): string[] {
  return findColumns(headers, [
    /source/,
    /origin/,
    /entry.?type/,
    /input.?type/,
    /entry.?method/,
    /method/,
    /channel/,
    /type/,
  ])
}

// ──────────────────────────────────────────────
// Indicator checks
// ──────────────────────────────────────────────

function checkDuplicateIds(
  headers: string[],
  rows: Record<string, string>[]
): IndicatorResult {
  const idCols = findIdColumns(headers)
  const flaggedRows: number[] = []
  const details: string[] = []

  if (idCols.length === 0) {
    // Fallback: use the first column
    if (headers.length > 0) idCols.push(headers[0])
  }

  for (const col of idCols) {
    const seen = new Map<string, number[]>()
    rows.forEach((row, idx) => {
      const val = row[col]
      if (val && val.trim() !== "") {
        const key = val.trim().toLowerCase()
        if (!seen.has(key)) seen.set(key, [])
        seen.get(key)!.push(idx)
      }
    })

    for (const [val, indices] of seen) {
      if (indices.length > 1) {
        indices.forEach((i) => {
          if (!flaggedRows.includes(i)) flaggedRows.push(i)
        })
        details.push(`"${val}" appears ${indices.length}× in column "${col}"`)
      }
    }
  }

  return {
    label: "Duplicate IDs",
    count: flaggedRows.length,
    weight: WEIGHTS.duplicateIds,
    flaggedRows,
    details: details.slice(0, 15), // cap detail lines
  }
}

function checkManualEntries(
  headers: string[],
  rows: Record<string, string>[]
): IndicatorResult {
  const sourceCols = findSourceColumns(headers)
  const flaggedRows: number[] = []
  const details: string[] = []

  const manualPatterns = [/manual/i, /hand/i, /keyed/i, /typed/i]

  rows.forEach((row, idx) => {
    // Check source columns for blank or "manual" entries
    for (const col of sourceCols) {
      const val = row[col]
      if (val === undefined || val.trim() === "") {
        if (!flaggedRows.includes(idx)) {
          flaggedRows.push(idx)
          details.push(`Row ${idx + 1}: blank "${col}"`)
        }
      } else if (manualPatterns.some((p) => p.test(val))) {
        if (!flaggedRows.includes(idx)) {
          flaggedRows.push(idx)
          details.push(`Row ${idx + 1}: "${val}" in "${col}"`)
        }
      }
    }

    // Also scan all columns for the word "manual"
    if (!flaggedRows.includes(idx)) {
      for (const col of headers) {
        const val = row[col]
        if (val && /\bmanual\b/i.test(val)) {
          flaggedRows.push(idx)
          details.push(`Row ${idx + 1}: "${val}" in "${col}"`)
          break
        }
      }
    }
  })

  return {
    label: "Manual Entries",
    count: flaggedRows.length,
    weight: WEIGHTS.manualEntries,
    flaggedRows,
    details: details.slice(0, 15),
  }
}

function checkRoundNumbers(
  headers: string[],
  rows: Record<string, string>[]
): IndicatorResult {
  const amtCols = findAmountColumns(headers)
  const flaggedRows: number[] = []
  const details: string[] = []

  for (const col of amtCols) {
    rows.forEach((row, idx) => {
      const raw = row[col]
      if (!raw) return
      // Strip currency symbols, commas, spaces
      const cleaned = raw.replace(/[^0-9.\-]/g, "")
      const num = parseFloat(cleaned)
      if (isNaN(num) || num === 0) return
      // A "round number" is divisible by 100 with no fractional remainder
      if (num % 100 === 0) {
        if (!flaggedRows.includes(idx)) flaggedRows.push(idx)
        details.push(`Row ${idx + 1}: ${raw} in "${col}"`)
      }
    })
  }

  return {
    label: "Round Numbers",
    count: flaggedRows.length,
    weight: WEIGHTS.roundNumbers,
    flaggedRows,
    details: details.slice(0, 15),
  }
}

function checkWeekendDates(
  headers: string[],
  rows: Record<string, string>[]
): IndicatorResult {
  const dateCols = findDateColumns(headers)
  const flaggedRows: number[] = []
  const details: string[] = []

  for (const col of dateCols) {
    rows.forEach((row, idx) => {
      const raw = row[col]
      if (!raw || raw.trim() === "") return
      const parsed = new Date(raw)
      if (isNaN(parsed.getTime())) return
      const day = parsed.getDay() // 0=Sun, 6=Sat
      if (day === 0 || day === 6) {
        if (!flaggedRows.includes(idx)) flaggedRows.push(idx)
        const dayName = day === 0 ? "Sunday" : "Saturday"
        details.push(`Row ${idx + 1}: ${raw} (${dayName}) in "${col}"`)
      }
    })
  }

  return {
    label: "Weekend Dates",
    count: flaggedRows.length,
    weight: WEIGHTS.weekendDates,
    flaggedRows,
    details: details.slice(0, 15),
  }
}

function checkDuplicateInvoices(
  headers: string[],
  rows: Record<string, string>[]
): IndicatorResult {
  const invCols = findInvoiceColumns(headers)
  const flaggedRows: number[] = []
  const details: string[] = []

  for (const col of invCols) {
    const seen = new Map<string, number[]>()
    rows.forEach((row, idx) => {
      const val = row[col]
      if (val && val.trim() !== "") {
        const key = val.trim().toLowerCase()
        if (!seen.has(key)) seen.set(key, [])
        seen.get(key)!.push(idx)
      }
    })

    for (const [val, indices] of seen) {
      if (indices.length > 1) {
        indices.forEach((i) => {
          if (!flaggedRows.includes(i)) flaggedRows.push(i)
        })
        details.push(`Invoice "${val}" appears ${indices.length}× in "${col}"`)
      }
    }
  }

  return {
    label: "Duplicate Invoices",
    count: flaggedRows.length,
    weight: WEIGHTS.duplicateInvoices,
    flaggedRows,
    details: details.slice(0, 15),
  }
}

// ──────────────────────────────────────────────
// Main analysis function
// ──────────────────────────────────────────────

/**
 * Run all 5 fraud indicator analyses on the parsed CSV data.
 */
export function analyzeFraudIndicators(parsed: ParsedCSV): AnalysisResult {
  const { headers, rows } = parsed

  const indicators: IndicatorResult[] = [
    checkDuplicateIds(headers, rows),
    checkManualEntries(headers, rows),
    checkRoundNumbers(headers, rows),
    checkWeekendDates(headers, rows),
    checkDuplicateInvoices(headers, rows),
  ]

  const totalIndicators = indicators.reduce((sum, i) => sum + i.count, 0)

  const riskScore = calculateFraudRiskScore(indicators)

  const { level, color } = getRiskLevel(riskScore)

  return {
    indicators,
    totalIndicators,
    riskScore,
    riskLevel: level,
    riskColor: color,
    totalRows: rows.length,
  }
}

/**
 * Fraud Risk Score = averageWeight × totalIndicators
 * Clamped to 0-10.
 *
 * averageWeight = sum(weights of active indicators) / number of active indicators
 * Only indicators with count > 0 are included in the average
 */
export function calculateFraudRiskScore(indicators: IndicatorResult[]): number {
  if (indicators.length === 0) return 0

  // Only include indicators that found something (count > 0)
  const activeIndicators = indicators.filter((i) => i.count > 0)
  
  if (activeIndicators.length === 0) return 0

  const totalWeight = activeIndicators.reduce((sum, i) => sum + i.weight, 0)
  const avgWeight = totalWeight / activeIndicators.length
  const totalCount = indicators.reduce((sum, i) => sum + i.count, 0)

  const raw = avgWeight * totalCount
  // Clamp to 0-10
  return Math.round(Math.min(10, Math.max(0, raw)) * 100) / 100
}

/**
 * Determine risk level from the score.
 * 0-3  → Medium  (yellow)
 * 3-6  → High    (orange)
 * 6-10 → Highest (red)
 */
export function getRiskLevel(score: number): {
  level: "Medium" | "High" | "Highest"
  color: string
} {
  if (score >= 6) return { level: "Highest", color: "red" }
  if (score >= 3) return { level: "High", color: "orange" }
  return { level: "Medium", color: "yellow" }
}
