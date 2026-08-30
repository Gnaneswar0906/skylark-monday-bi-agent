# Decision Log — Skylark Drones Monday.com BI Agent

## DR-001: Technology Stack — Next.js 14 with App Router

**Decision**: Use Next.js 14 App Router with TypeScript.

**Rationale**:
- Allows frontend and server-side API routes in a single project.
- App Router API Routes provide a clean server-side boundary — API keys never reach the browser.
- First-class Vercel deployment support.
- TypeScript provides type safety across the entire analytics pipeline.

---

## DR-002: LLM Usage — Gemini 1.5 Flash

**Decision**: Use Google Gemini 1.5 Flash for intent understanding and executive response generation.

**Rationale**:
- Gemini 1.5 Flash is cost-effective and fast for short inference tasks.
- JSON mode (`responseMimeType: application/json`) ensures reliable structured output.
- The `LLM_MODEL` environment variable makes the provider swappable without code changes.

---

## DR-003: Deterministic Analytics

**Decision**: All numerical calculations are performed by TypeScript functions, not the LLM.

**Rationale**:
- LLMs can make arithmetic errors, especially with large numbers.
- Pipeline totals, weighted pipeline, billing sums, and collection rates must be provably correct.
- The LLM is used only for natural language understanding and explanation — not calculation.

**Implementation**:
```
User Question → LLM → QueryIntent → TypeScript Analytics → BIResult → LLM → Response
```

---

## DR-004: Data Source Architecture — Adapter Pattern

**Decision**: Abstract the data source behind a `DataAdapter` interface.

**Rationale**:
- `FixtureDataAdapter` uses local CSV files for development and testing.
- `MondayDataAdapter` uses the live Monday.com GraphQL API in production.
- Business logic (analytics) is independent of the data source.
- The analytics engine can be tested without any Monday.com API calls.

---

## DR-005: Missing Values

**Decision**: Missing values are preserved as `null`, not silently converted to 0.

**Rationale**:
- A deal with a missing value is not a ₹0 deal.
- Treating missing as zero would underreport pipeline and give a false impression.
- Missing records are excluded from calculations and the limitation is reported to the user.

**Example**:
```
Missing Deal Value → excluded from pipeline total
Missing Probability → excluded from weighted pipeline
```

---

## DR-006: No Vector Database or RAG

**Decision**: The system does not use a vector database, RAG pipeline, or multi-agent framework.

**Rationale**:
- The data source is structured (Monday.com boards with defined columns).
- Structured intent → deterministic calculation is more reliable than semantic search.
- Avoids unnecessary complexity and infrastructure.
- Keeps the system lightweight and maintainable.

---

## DR-007: Server-Side Caching

**Decision**: Implement a simple module-level cache with a configurable TTL.

**Rationale**:
- Avoids repeated Monday.com API calls for every chat message.
- TTL is configurable via `CACHE_TTL_SECONDS` environment variable.
- Manual refresh via `/api/refresh` invalidates the cache.
- Module-level cache persists across requests in the same server process.

---

## DR-008: Dynamic Column Discovery

**Decision**: Do not hardcode Monday.com column IDs.

**Rationale**:
- Column IDs differ between Monday.com workspaces.
- Normalizing column titles (lowercase, trim) allows matching against known patterns.
- The application works with any Monday.com setup that has the expected column names.

---

## DR-009: Direct GraphQL API

**Decision**: Use Monday.com's GraphQL API directly instead of an MCP or SDK.

**Rationale**:
- Direct API provides explicit control over board retrieval, column mapping, pagination, authentication, and error handling.
- MCP introduces additional complexity not required for this assignment.
- Read-only behavior is guaranteed at the integration level.

---

## DR-010: Indian Number Formatting

**Decision**: Display rupee amounts using Indian lakhs/crores notation.

**Rationale**:
- Skylark Drones operates in India.
- Indian executives read "₹12.5L" more naturally than "₹1,250,000".
- The LLM system prompt specifies this formatting convention.
