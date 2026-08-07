# UI/UX Design System & Style Guidelines

## 1. UI/UX Philosophy
The **AI Knowledge Assistant** interface is designed following modern SaaS design aesthetics (inspired by Linear, ChatGPT, Claude, Perplexity, and Notion AI) built with **React 18, TypeScript, and Tailwind CSS**. It prioritizes:
- **Type Safety & Reliability:** Strict TypeScript component interfaces (`.tsx`) ensuring prop correctness and type safety across pages, hooks, and services.
- **Clarity & Context:** Users should instantly understand system state, backend connectivity, active documents, and retrieval telemetry.
- **Transparence & Groundedness:** Every AI answer highlights source documents, supports markdown rendering and code syntax highlighting (`react-markdown` + `react-syntax-highlighter`), and provides a 1-click modal to inspect raw retrieved text chunks.
- **Refined SaaS Polish:** Dark/light mode support, vibrant accents, glassmorphism cards, subtle hover interactions, clean typography, and smooth transitions.

---

## 2. Color Palette & Theme Tokens

### Dark Mode (Default)
- **Background Main:** `#0f172a` (Slate 900)
- **Card / Surface:** `#1e293b` (Slate 800) with `backdrop-blur-md` border `#334155` (Slate 700)
- **Primary Accent:** `#6366f1` (Indigo 500) to `#8b5cf6` (Purple 500) gradient
- **Secondary Accent:** `#06b6d4` (Cyan 500)
- **Text Main:** `#f8fafc` (Slate 50)
- **Text Muted:** `#94a3b8` (Slate 400)
- **User Bubble:** `#1e1b4b` (Indigo 950) with Indigo border
- **AI Bubble:** `#1e293b` (Slate 800) with Subtle glow border

### Light Mode
- **Background Main:** `#f8fafc` (Slate 50)
- **Card / Surface:** `#ffffff` (White) with border `#e2e8f0` (Slate 200)
- **Primary Accent:** `#4f46e5` (Indigo 600)
- **Secondary Accent:** `#0891b2` (Cyan 600)
- **Text Main:** `#0f172a` (Slate 900)
- **Text Muted:** `#64748b` (Slate 500)
- **User Bubble:** `#e0e7ff` (Indigo 100)
- **AI Bubble:** `#ffffff` (White) with Slate border

---

## 3. Typography Rules
- **Font Family:** Inter, system-ui, -apple-system, sans-serif.
- **Headings:**
  - `H1`: `text-2xl font-bold tracking-tight`
  - `H2`: `text-xl font-semibold`
  - `H3`: `text-lg font-medium`
- **Body Text:** `text-sm leading-relaxed` for message body; `text-xs` for metadata badges, timestamps, and citations.

---

## 4. Component Structure & Type Architecture

```
src/
├── types/
│   ├── chat.ts           # Message, SourceCitation, RetrievedChunk, ChatResponse
│   ├── document.ts       # DocumentInfo, DocumentListResponse, UploadResponse
│   └── api.ts            # HealthResponse
├── components/
│   ├── Navbar.tsx        # Typed SaaS Header with health indicator & theme toggle
│   ├── Sidebar.tsx       # Typed Document Manager & telemetry panel
│   ├── ChatArea.tsx      # Typed Chat feed & input form
│   ├── MessageList.tsx   # Typed Message list container
│   ├── MessageItem.tsx   # Typed Message bubble with ReactMarkdown & Prism Syntax Highlighting
│   ├── SourceCitations.tsx # Typed Grounded citations accordion
│   ├── ContextModal.tsx  # Typed Raw context inspection drawer
│   ├── UploadModal.tsx   # Typed Drag-and-drop document upload interface
│   ├── DocumentList.tsx  # Typed Active documents list with chunk metrics
│   └── StatsCard.tsx     # Typed Telemetry card
└── pages/
    ├── Dashboard.tsx     # Typed SaaS Dashboard page
    └── ChatPage.tsx      # Typed Focus chat page
```
