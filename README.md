# SQL Query Runner (Frontend)

A web-based SQL query runner that allows users to write queries, execute them, and explore results in a performant, analyst-friendly UI.

This is a **dummy application** built to demonstrate frontend architecture, state modeling, performance optimizations, and engineering judgment.  
There is **no real SQL engine or backend** — all query execution and results are mocked intentionally.

---

## Live Demo

https://a-project-two.vercel.app/

---

## Walkthrough Video

https://drive.google.com/file/d/15sk_Ub7BzthKcrq0tffTfWQ_H1IXfY-G/view?usp=sharing

---

## Tech Stack

- **Framework:** React
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** CSS Modules
- **Testing:** Jest (unit tests for utilities)

### External Libraries
- No heavy UI or state management libraries were added intentionally
- Native browser APIs (`ResizeObserver`, `requestAnimationFrame`) are used for performance-sensitive logic

---

## Feature Overview

### Query Authoring & Execution
- SQL input editor (textarea-based)
- Run query via button or keyboard shortcut (`Cmd/Ctrl + Enter`)
- Support for running and managing multiple queries
- Query identity based on SQL equality (override vs new query)

### Results & Visualization
- Tabular results rendering with virtialization
- Sticky table header
- Clear handling of:
  - loading state
  - error state
  - empty results
- CSV export of query results

### Productivity & UX
- Query history with search and sort (most recent first)
- Sample queries for quick exploration
- Keyboard shortcut hint with frequency-capped tooltip
- Clean “New Query” flow with reset editor state and auto-focused editor for immediate typing
- **Accessibility** - Core interactions use semantic HTML and support keyboard navigation, allowing the app to be used without relying on a mouse.

---

## Core User Flow

1. User writes a query or selects a sample query
2. User executes the query (button or keyboard shortcut)
3. Query execution starts (mocked async call)
4. Results are rendered in the results panel
5. User can:
   - re-run the same query
   - modify and run as a new query
   - switch between previous queries
   - export results as CSV

---

## Component Design

### `QueryEditor`
- Represents an **editing session**
- Holds local, user-editable state (query name)
- Does not synchronize draft state via effects

### `QuerySidebar`
- Displays query history and predefined sample queries
- Acts as the primary **navigation surface**
- Local state:
  - `searchTerm` for filtering query history

### `ResultsSection`
- Renders query results and metadata
- Handles loading, error, empty, and success states
- Exposes result-level actions (e.g. CSV export)

### `ResultsTable`
- Renders large result sets efficiently
- Manual row virtualization
- Sticky header
- Resizable columns with bounded widths
- Horizontal scrolling within cells for wide content

---

## State Management

### Query Data Context
- Stores query definitions, results, and execution metadata
- Represents **domain state**
- Updates correspond to meaningful events (query run, result update)

### Active Query Context
- Stores only `activeQueryId`
- Represents **UI selection state**
- Changes frequently during navigation

---

## Performance & Snappiness

### Load Time
- Page load performance was measured using **Largest Contentful Paint (LCP)** via Chrome Lighthouse on the deployed Vercel URL.

  - **LCP (simulated throttling – Lighthouse default):** ~0.3s
  - **LCP (no DevTools throttling):** ~0.2s

- NOTE - Measurements were taken on a production build using Lighthouse’s simulated throttling.

### Runtime Performance Optimizations
- Row virtualization to limit DOM nodes for large result sets
- Scroll handling throttled with `requestAnimationFrame`
- Layout measurement using `ResizeObserver`
- Memoization to avoid unnecessary re-renders
- No unnecessary global state updates

These choices ensure smooth scrolling and responsive interactions even with thousands of rows.

---

## Responsiveness & Layout

- Designed **desktop-first**, aligned with analyst workflows
- Graceful behavior on smaller viewports:
  - No layout breakage or overlap
- Results table handles wide data safely:
  - Cell-level horizontal scrolling
  - Bounded column resizing
  - Avoids unintended page-level horizontal scrolling

---

## Query Execution Model

### Query Identity Rules
- Re-running a query with **unchanged SQL** overrides the existing query
- Running with **changed SQL** creates a new query (even if the name is the same)

### Async Safety
- Each execution is tagged with a monotonically increasing `runId`
- Only the latest execution is allowed to update state
- Prevents stale async responses from overwriting newer results

---

## Testing & Code Coverage

- Unit tests added for **pure utility functions** using Jest
- Focused on deterministic, side-effect-free logic:
  - CSV generation
  - filename sanitization
  - time formatting
  - tooltip frequency-capping logic
- React component tests were intentionally kept out of scope to avoid brittle UI tests and focus on core logic correctness

---

## Observability

- Minimal client-side logger implemented
- Logs high-level query lifecycle events:
  - start
  - success
  - failure

In a real system, these logs would feed into centralized logging and metrics.

---

## Trade-offs & Non-goals

Intentionally not implemented:
- No backend or real SQL engine
- No SQL syntax validation
- No query persistence
- No advanced table features (sorting, filtering)
- No charts or visual analytics
- No E2E testing infrastructure

These were excluded to keep scope aligned with the problem statement and focus on frontend architecture and UX clarity.

---

## Feature Selection Rationale

- The feature set was chosen to optimize for **daily analyst workflows** while keeping the application focused and predictable.

- Core features (query authoring, execution, history, and tabular results) were prioritized because removing any of them would make the application unusable for its primary purpose.

- Value-add features such as keyboard shortcuts, CSV export, sticky headers, and virtualization were included to reduce friction during long sessions and repeated query execution.

- More advanced capabilities (sorting, filtering, charts, persistence) were intentionally excluded to avoid increasing complexity without a backend or real query engine, and are documented explicitly as non-goals.

---

## What Would Change in a Real-World System

- Backend-driven query execution
- Server-side persistence of query history
- Pagination or streaming for very large datasets
- Column-level operations (sort, filter)
- Real observability (metrics, traces, structured logs)
- Access control and permissions
- Broader test coverage (unit + E2E)

The current architecture is designed to support these extensions without major refactors.

---

## Local Development

```bash
# Node v20 recommended
npm install
npm run dev
