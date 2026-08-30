# Skylark Drones — Monday.com Business Intelligence Agent

A full-stack conversational Business Intelligence Agent that connects to **Monday.com** and provides founder-level insights across **Deals** and **Work Orders** data.

The system is designed to handle real-world messy business data, including missing values, inconsistent dates, inconsistent text formats, incomplete records, and API failures.

It converts natural-language business questions into structured analytical queries, retrieves live data from Monday.com, performs deterministic business calculations, and presents concise executive-level insights.

---

## 1. Project Overview

### Problem

Founders and executives often need answers to business questions that require manually collecting information from multiple business systems.

Typical questions include:

- How is our pipeline looking this quarter?
- Which sector has the strongest pipeline?
- How is Mining performing?
- What are our biggest deals?
- Which deals are at risk?
- How much has been billed versus collected?
- What are our outstanding receivables?
- How are sales and operations performing together?
- Prepare a leadership update.

This process becomes difficult when business data is distributed across multiple boards and contains incomplete or inconsistent records.

### Solution

The **Skylark Drones Monday.com Business Intelligence Agent** provides a conversational interface where users can ask business questions in natural language.

The agent:

1. Understands the user's question.
2. Identifies the relevant business intent, sector, time period, metrics, and boards.
3. Retrieves live data from Monday.com.
4. Normalizes and validates the data.
5. Calculates business metrics deterministically.
6. Performs cross-board analysis when required.
7. Identifies data-quality issues and caveats.
8. Generates an executive-friendly response.
9. Can prepare a leadership-ready business update.

---

# 2. Key Features

## Monday.com Integration

- Direct integration with Monday.com's GraphQL API.
- Reads data dynamically from:
  - Deals Board
  - Work Orders Board
- Cursor-based pagination.
- Dynamic board-column discovery.
- Column mapping based on normalized column names.
- Read-only integration.
- No hardcoded production business data.

## Conversational BI

Users can ask questions naturally instead of using predefined dashboards or SQL queries.

Examples:

```text
How is our pipeline looking this quarter?

How is Mining performing?

Which sector has the strongest pipeline?

What are our biggest deals?

Which deals are at risk?

How much has been billed versus collected?

What are our outstanding receivables?

Compare Mining and Powerline.

Give me an overall business health assessment.

Prepare a leadership update.
```

## Data Resilience

The application handles:

- Missing values
- Null values
- Empty strings
- Inconsistent capitalization
- Extra whitespace
- Inconsistent dates
- Invalid dates
- Currency symbols
- Comma-separated numbers
- Percentage values
- Incomplete financial records
- Unknown categorical values
- API failures

Missing values are not silently converted into misleading values.

For example:

```text
Missing deal value ≠ ₹0
```

Instead, the record is excluded from value-based calculations and the limitation is communicated to the user.

## Business Intelligence

The system supports:

- Pipeline analysis
- Weighted pipeline
- Deal-stage analysis
- Sector performance
- Deal risk
- Work-order execution
- Billing
- Collections
- Receivables
- Cross-board analysis
- Overall business health
- Leadership updates

## Leadership Updates

The agent can generate a concise management update containing:

- Sales performance
- Pipeline
- Weighted pipeline
- Sector performance
- Operational execution
- Billing
- Collections
- Receivables
- Major risks
- Recommended leadership actions

---

# 3. Architecture

```text
                    ┌────────────────────────────┐
                    │          USER              │
                    │ Founder / Executive        │
                    └──────────────┬─────────────┘
                                   │
                                   ↓
                    ┌────────────────────────────┐
                    │       Next.js Frontend     │
                    │                            │
                    │ Conversational Interface   │
                    │ Suggested Questions        │
                    │ KPI Cards                  │
                    │ Data Quality Information    │
                    └──────────────┬─────────────┘
                                   │
                                   ↓
                    ┌────────────────────────────┐
                    │      Next.js Server        │
                    │       API Routes           │
                    └──────────────┬─────────────┘
                                   │
                 ┌─────────────────┴─────────────────┐
                 │                                   │
                 ↓                                   ↓
      ┌──────────────────────┐             ┌─────────────────────┐
      │  Query Understanding │             │   Monday.com API    │
      │       LLM            │             │     GraphQL         │
      └──────────┬───────────┘             └──────────┬──────────┘
                 │                                    │
                 │                          ┌─────────┴─────────┐
                 │                          ↓                   ↓
                 │                    Deals Board       Work Orders
                 │
                 ↓
      ┌─────────────────────────┐
      │ Structured Query Intent │
      └────────────┬────────────┘
                   │
                   ↓
      ┌─────────────────────────┐
      │ Data Normalization      │
      │ & Quality Analysis      │
      └────────────┬────────────┘
                   │
                   ↓
      ┌─────────────────────────┐
      │ Deterministic BI Engine │
      │                         │
      │ Pipeline                │
      │ Sectors                 │
      │ Deals                   │
      │ Work Orders             │
      │ Billing                 │
      │ Collections             │
      │ Receivables              │
      └────────────┬────────────┘
                   │
                   ↓
      ┌─────────────────────────┐
      │ Structured BI Result    │
      └────────────┬────────────┘
                   │
                   ↓
      ┌─────────────────────────┐
      │ Executive Response LLM  │
      └────────────┬────────────┘
                   │
                   ↓
      ┌─────────────────────────┐
      │ Founder-Level Response  │
      │ Insights + Risks +      │
      │ Recommendations         │
      └─────────────────────────┘
```

---

# 4. Technology Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js |
| Language | TypeScript |
| UI | React |
| Styling | Tailwind CSS |
| Backend | Next.js Server/API Routes |
| Business Logic | TypeScript |
| Data Source | Monday.com |
| Integration | Monday.com GraphQL API |
| AI | LLM API |
| Testing | Jest / Vitest |
| Version Control | Git / GitHub |
| Deployment | Vercel |

The application is intentionally designed without unnecessary infrastructure such as a vector database, RAG pipeline, multi-agent framework, or separate backend service.

This keeps the system lightweight and maintainable while satisfying the assignment requirements.

---

# 5. Data Sources

The application uses two Monday.com boards.

## Deals Board

The Deals dataset contains fields such as:

- Deal Name
- Owner Code
- Client Code
- Deal Status
- Close Date
- Closure Probability
- Masked Deal Value
- Tentative Close Date
- Deal Stage
- Product
- Sector/Service
- Created Date

These fields are converted into a canonical internal `DealRecord`.

## Work Orders Board

The Work Orders dataset contains fields such as:

- Deal Name
- Customer Code
- Serial Number
- Nature of Work
- Execution Status
- Data Delivery Date
- PO/LOI Date
- Probable Start Date
- Probable End Date
- BD/KAM Personnel
- Sector
- Type of Work
- Skylark Software Platform
- Amount
- Billed Value
- Collected Amount
- Amount Receivable
- AR Priority
- Quantity
- Invoice Status
- Expected Billing Month
- Actual Billing Month
- Actual Collection Month
- WO Status
- Collection Status
- Collection Date
- Billing Status

These fields are converted into a canonical `WorkOrderRecord`.

---

# 6. Monday.com Configuration

Create two separate boards in Monday.com.

### Board 1

```text
Skylark — Deals
```

### Board 2

```text
Skylark — Work Orders
```

Import the supplied datasets into the respective boards.

Column types should be configured appropriately.

Examples:

| Data | Recommended Monday Type |
|---|---|
| Deal Name | Item Name |
| Owner Code | Text |
| Client Code | Text |
| Deal Status | Status |
| Deal Value | Numbers |
| Probability | Numbers / Status |
| Close Date | Date |
| Sector | Dropdown / Text |
| Deal Stage | Status |
| Work Order Amount | Numbers |
| Billed Value | Numbers |
| Collected Amount | Numbers |
| Receivable | Numbers |
| Execution Status | Status |
| Collection Status | Status |

The exact mapping is determined from the actual board metadata at runtime.

The application does not rely on hardcoded Monday column IDs.

---

# 7. Environment Variables

Create a `.env.local` file for local development.

```env
MONDAY_API_TOKEN=your_monday_api_token
MONDAY_DEALS_BOARD_ID=your_deals_board_id
MONDAY_WORK_ORDERS_BOARD_ID=your_work_orders_board_id

LLM_API_KEY=your_llm_api_key
LLM_MODEL=your_model_name
```

A template is provided in:

```text
.env.example
```

Never commit `.env.local` or real API credentials to GitHub.

---

# 8. Security

Sensitive credentials are handled exclusively on the server.

The following values must never be exposed to the browser:

```text
MONDAY_API_TOKEN
LLM_API_KEY
```

Do not prefix secret environment variables with:

```text
NEXT_PUBLIC_
```

All Monday.com and LLM API requests are made server-side.

The Monday.com integration is strictly read-only.

---

# 9. Monday.com API Integration

The application uses the Monday.com GraphQL API.

The general request flow is:

```text
Application Server
       ↓
Monday GraphQL API
       ↓
Board Metadata
       ↓
Column Mapping
       ↓
Items + Column Values
       ↓
Cursor Pagination
       ↓
Canonical Records
```

The application dynamically discovers:

- Board ID
- Board name
- Column IDs
- Column titles
- Column types
- Items
- Column values

This avoids assuming that Monday column IDs are identical across different environments.

---

# 10. Data Normalization

The application contains a dedicated normalization layer.

### Text normalization

Example:

```text
" Mining "
"mining"
"MINING"
```

becomes:

```text
Mining
```

### Date normalization

Multiple date formats are converted into a standard internal representation.

### Numeric normalization

Values such as:

```text
₹1,25,000
1,25,000
125000
125,000
```

are normalized into numeric values where safely parseable.

### Percentage normalization

Examples:

```text
70%
0.70
70
```

are interpreted according to the source context and normalized into a probability representation.

### Missing values

Missing values are preserved as missing.

For example:

```text
Deal Value = null
```

does not automatically become:

```text
Deal Value = 0
```

---

# 11. Data Quality

The application generates a data-quality report containing:

- Total records
- Missing-value counts
- Missing percentages
- Invalid date counts
- Invalid numeric counts
- Normalized values
- Calculation exclusions
- Warnings

Example:

```text
Data Quality Notes

⚠ 18 deals are missing closure probability.

⚠ 31 deals are missing deal value.

⚠ Some work orders have incomplete billing information.

Weighted pipeline excludes deals where either
deal value or probability is unavailable.
```

This ensures that incomplete source data does not silently produce misleading business conclusions.

---

# 12. Business Intelligence Metrics

## Pipeline

The system calculates:

- Total deals
- Open deals
- Won deals
- Lost deals
- Pipeline value
- Weighted pipeline
- Average deal value
- Pipeline by sector
- Pipeline by stage

---

## Weighted Pipeline

Weighted pipeline is calculated as:

```text
Weighted Pipeline
=
Deal Value × Closure Probability
```

A deal is included only when both:

```text
Deal Value
```

and

```text
Closure Probability
```

are available.

Records excluded from the calculation are reported to the user.

---

# 13. Sector Performance

The agent can analyze sectors such as:

```text
Mining
Powerline
Energy
Solar
Utilities
```

depending on the values present in the live data.

For a selected sector, the system can calculate:

- Deal count
- Open deals
- Pipeline value
- Weighted pipeline
- Deal-stage distribution
- Work-order count
- Execution status
- Billed value
- Collected value
- Receivables

---

# 14. Work Order Analytics

Operational metrics include:

- Total work orders
- Completed work orders
- In-progress work orders
- Pending work orders
- Execution status distribution
- Billing status
- Collection status
- Billed value
- Collected value
- Outstanding receivables

---

# 15. Financial Analytics

The system supports:

### Billing

```text
Total Billed Value
```

### Collections

```text
Total Collected Amount
```

### Receivables

```text
Total Amount Receivable
```

The system also supports comparisons such as:

```text
Billed vs Collected
```

and identifies collection-related risks.

---

# 16. Cross-Board Analysis

One of the main capabilities of the application is combining Deals and Work Orders.

Example:

```text
User:
How healthy is the Mining business?
```

The agent can combine:

### Sales

- Open deals
- Pipeline
- Weighted pipeline
- Deal stages

### Operations

- Work orders
- Execution status

### Financial

- Billing
- Collections
- Receivables

The final answer provides a unified business assessment.

---

# 17. Query Understanding

Natural-language questions are converted into a structured intent.

Example:

```json
{
  "intent": "pipeline_health",
  "sector": "Mining",
  "period": "current_quarter",
  "boards": ["deals"],
  "metrics": [
    "deal_count",
    "pipeline_value",
    "weighted_pipeline"
  ]
}
```

Possible intents include:

```text
pipeline_health
sector_performance
deal_analysis
deal_risk
stage_analysis
work_order_performance
billing_analysis
collections_analysis
receivables_analysis
cross_board_analysis
business_health
leadership_update
data_quality
clarification_required
```

---

# 18. Deterministic Analytics

The LLM is NOT responsible for calculating business numbers.

The application follows:

```text
User Question
      ↓
LLM
      ↓
Structured Intent
      ↓
TypeScript Analytics
      ↓
Calculated Metrics
      ↓
LLM
      ↓
Executive Explanation
```

This prevents arithmetic errors and reduces hallucination risk.

---

# 19. Clarifying Questions

The agent asks for clarification when a question is too ambiguous.

Example:

```text
User:
How are we doing?
```

The agent responds:

```text
I can assess:

1. Sales pipeline
2. Project execution
3. Billing and collections
4. Overall business health

Which would you like me to analyze?
```

The agent should not make an arbitrary assumption when ambiguity could materially change the answer.

---

# 20. Executive Response Format

Business responses are structured approximately as:

```text
## Executive Summary

Short conclusion.

## Key Metrics

• Metric 1
• Metric 2
• Metric 3

## Insights

1. Important insight
2. Important insight
3. Important insight

## Risks / Watch Items

• Risk 1
• Risk 2

## Recommended Actions

• Action 1
• Action 2

## Data Quality Notes

• Relevant limitation
```

The response should be concise enough for a founder or executive while still explaining important caveats.

---

# 21. Leadership Update

The application provides a leadership-update capability.

Example:

```text
# Skylark Drones — Leadership Update

## Sales

Pipeline:
₹XX

Weighted Pipeline:
₹XX

Top Sector:
Mining

## Operations

Work Orders:
XX

Completed:
XX

In Progress:
XX

## Financial

Billed:
₹XX

Collected:
₹XX

Receivables:
₹XX

## Key Risks

1. Missing deal probabilities
2. High outstanding receivables
3. Delayed work orders

## Leadership Attention

1. Prioritize high-value opportunities.
2. Review delayed work orders.
3. Follow up on high-priority receivables.
```

The leadership-update interpretation is:

> A concise, management-ready summary of sales, operational execution, financial position, risks, and recommended areas requiring leadership attention.

---

# 22. User Interface

The main interface contains:

### Header

```text
Skylark Drones
Monday.com Business Intelligence Agent
```

### Chat

Users can ask questions in natural language.

### Suggested Questions

```text
How is our pipeline looking this quarter?

Which sectors have the strongest pipeline?

How is Mining performing?

What are our biggest deals?

Which deals are at risk?

How much has been billed versus collected?

Give me an overall business health assessment.

Prepare a leadership update.
```

### Connection Status

```text
Monday.com
✓ Connected

Deals Board
✓ Available

Work Orders Board
✓ Available
```

### Refresh

The user can request fresh data from Monday.com.

---

# 23. Caching

A short server-side cache may be used to reduce unnecessary Monday.com API requests.

The cache should have a configurable TTL.

A manual refresh action invalidates the cache and retrieves the latest data.

The UI displays the latest refresh timestamp.

---

# 24. Error Handling

The system gracefully handles:

- Missing environment variables
- Invalid Monday API credentials
- Missing board
- Monday API errors
- GraphQL errors
- Network failures
- Empty boards
- Malformed data
- Invalid dates
- Invalid numbers
- LLM failures
- Invalid LLM structured output

Users receive friendly messages such as:

```text
I couldn't retrieve the latest Monday.com data.
Please try again in a moment.
```

Technical details are logged server-side without exposing secrets.

---

# 25. Development Fixtures

The supplied datasets are used as development fixtures.

Architecture:

```text
DataAdapter
├── MondayDataAdapter
└── FixtureDataAdapter
```

### FixtureDataAdapter

Used for:

- Local development
- Testing
- Data-quality validation
- Analytics testing

### MondayDataAdapter

Used in production.

The business logic is independent of the underlying data source.

This allows the analytics engine to be tested without repeatedly calling Monday.com.

---

# 26. Local Development

## Prerequisites

Install:

- Node.js 20+
- npm
- Git

## Clone Repository

```bash
git clone <repository-url>
cd skylark-monday-bi-agent
```

## Install Dependencies

```bash
npm install
```

## Configure Environment

Create:

```text
.env.local
```

Add:

```env
MONDAY_API_TOKEN=
MONDAY_DEALS_BOARD_ID=
MONDAY_WORK_ORDERS_BOARD_ID=
LLM_API_KEY=
LLM_MODEL=
```

## Start Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 26. Testing

Run:

```bash
npm test
```

Tests should cover:

- Date normalization
- Numeric normalization
- Percentage normalization
- Missing values
- Sector normalization
- Status normalization
- Weighted pipeline
- Pipeline aggregation
- Sector aggregation
- Work-order metrics
- Billing
- Collections
- Receivables
- Quarter filtering
- Cross-board analysis
- Clarification handling
- API error handling
- Invalid LLM responses

---

# 27. Production Validation

Before deployment, run:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

All commands should complete successfully.

The application should then be tested against the live Monday.com boards.

---

# 28. Vercel Deployment

The application is designed for deployment on Vercel.

## Deployment Steps

1. Push the repository to GitHub.
2. Open Vercel.
3. Import the GitHub repository.
4. Configure the required environment variables.
5. Deploy.
6. Open the generated production URL.
7. Test the application using the acceptance questions.

Production environment variables:

```text
MONDAY_API_TOKEN
MONDAY_DEALS_BOARD_ID
MONDAY_WORK_ORDERS_BOARD_ID
LLM_API_KEY
LLM_MODEL
```

Do not expose secrets through client-side environment variables.

---

# 29. Production Acceptance Tests

The deployed application should successfully handle:

### Test 1

```text
What's our pipeline this quarter?
```

### Test 2

```text
How is Mining performing?
```

### Test 3

```text
Which sector has the strongest pipeline?
```

### Test 4

```text
What are our biggest deals?
```

### Test 5

```text
Which deals are at risk?
```

### Test 6

```text
How much has been billed versus collected?
```

### Test 7

```text
What are our outstanding receivables?
```

### Test 8

```text
Compare Mining and Powerline.
```

### Test 9

```text
Give me an overall business health assessment.
```

### Test 10

```text
Prepare a leadership update.
```

### Test 11

```text
How are we doing?
```

The final query should trigger clarification rather than an arbitrary assumption.

---

# 30. Important Design Decisions

## Why Next.js?

Next.js allows the frontend and server-side API layer to be maintained in a single project and provides a straightforward path to Vercel deployment.

## Why TypeScript?

TypeScript provides strong typing for business records, structured LLM responses, analytics functions, and API integration.

## Why Monday GraphQL API?

Direct API integration provides explicit control over:

- Board retrieval
- Column mapping
- Pagination
- Authentication
- Error handling
- Read-only behavior

MCP was considered, but direct GraphQL API integration was selected because the assignment has a short implementation timeline and requires predictable control over the data retrieval layer.

## Why deterministic analytics?

Business-critical calculations such as pipeline totals and weighted pipeline should not depend on LLM arithmetic.

The LLM is used for:

- Intent understanding
- Natural-language interpretation
- Executive explanation

TypeScript is used for:

- Data processing
- Aggregation
- Calculations
- Business rules

---

# 31. Limitations

The prototype intentionally focuses on the assignment requirements.

Potential future improvements include:

- Historical pipeline trend analysis
- Automated anomaly detection
- More sophisticated forecasting
- Scheduled leadership reports
- Role-based access control
- Audit logging
- More advanced business-rule configuration
- Additional data sources
- Automated data-quality remediation
- Streaming updates from Monday.com

---

# 32. Future Architecture

With additional development time, the system could evolve into:

```text
                    BI Platform
                        │
        ┌───────────────┼────────────────┐
        ↓               ↓                ↓
   Monday.com       CRM / ERP       Other Sources
        │               │                │
        └───────────────┼────────────────┘
                        ↓
                 Unified Data Layer
                        ↓
               Business Intelligence
                        ↓
              Conversational Agent
                        ↓
        ┌───────────────┼────────────────┐
        ↓               ↓                ↓
   Founder Chat    Dashboards     Leadership Reports
```

---

# 33. Assignment Requirement Mapping

| Assignment Requirement | Implementation |
|---|---|
| Monday.com integration | Monday GraphQL API |
| Read Deals data | Monday Deals Board |
| Read Work Orders data | Monday Work Orders Board |
| Dynamic data | Live Monday API |
| No hardcoded CSV production data | MondayDataAdapter |
| Missing values | Normalization + quality reporting |
| Inconsistent dates | Date normalization |
| Naming inconsistencies | Text normalization |
| Incomplete records | Graceful exclusion + caveats |
| Founder-level questions | Conversational interface |
| Clarification | Structured intent + clarification |
| Revenue/financial analysis | Billing, collection, receivable metrics |
| Pipeline | Pipeline + weighted pipeline |
| Sector performance | Sector analytics |
| Cross-board queries | Deals + Work Orders analysis |
| Error handling | API/data/LLM error handling |
| Leadership updates | Leadership Update mode |
| Hosted prototype | Vercel |
| Source code | GitHub repository |
| Decision Log | `DECISION_LOG.md` |

---

# 34. Security Checklist

Before submission:

- [ ] No API keys committed
- [ ] `.env.local` ignored
- [ ] `.env.example` contains placeholders only
- [ ] Monday token remains server-side
- [ ] LLM key remains server-side
- [ ] No `NEXT_PUBLIC_` secret variables
- [ ] Monday integration is read-only
- [ ] No hardcoded production data
- [ ] Production errors do not expose secrets

---

# 35. Final Submission

The final submission should contain:

### Hosted Prototype

```text
https://<your-vercel-app>.vercel.app
```

### Source Code

GitHub repository containing the complete project.

### ZIP

```text
skylark-monday-bi-agent.zip
```

### Documentation

```text
README.md
DECISION_LOG.md
DATA_PROFILE.md
FINAL_CHECKLIST.md
```

---

# 36. Project Goal

The goal of this project is not simply to create a chatbot.

The goal is to create a reliable **business intelligence interface for founders** that turns messy operational and sales data into useful decisions.

The core principle is:

```text
Natural Language
      ↓
Understand Intent
      ↓
Retrieve Live Monday Data
      ↓
Normalize Messy Data
      ↓
Calculate Reliable Metrics
      ↓
Identify Risks & Insights
      ↓
Explain Clearly
      ↓
Support Leadership Decisions
```

**Built for the Skylark Drones Technical Assignment.**
