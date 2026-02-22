# 📘 Rizzearch — Project Blueprint

> **AI-Powered Study & Note Assistant**
> Upload your notes, and let AI summarize, generate flashcards, create quizzes, and supercharge your learning.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Problem Statement](#2-problem-statement)
3. [Target Users](#3-target-users)
4. [Tech Stack](#4-tech-stack)
5. [System Architecture](#5-system-architecture)
6. [Core Features](#6-core-features)
7. [Database Schema](#7-database-schema)
8. [API Endpoints](#8-api-endpoints)
9. [Frontend Pages & Components](#9-frontend-pages--components)
10. [AI Pipeline](#10-ai-pipeline)
11. [Authentication & Authorization](#11-authentication--authorization)
12. [Project Structure](#12-project-structure)
13. [Security & Hardening](#13-security--hardening)
14. [Monitoring & Observability](#14-monitoring--observability)
15. [DevOps & Deployment](#15-devops--deployment)
16. [Cost Estimation & GitHub Student Pack](#16-cost-estimation--github-student-pack)
17. [Development Phases](#17-development-phases)
18. [Future Enhancements](#18-future-enhancements)

---

## 1. Project Overview

**Rizzearch** is a full-stack web application that helps students study smarter by leveraging AI. Users can upload notes, documents (PDF, DOCX, TXT), or write notes directly in a rich Markdown editor. The app then uses AI to:

- **Summarize** lengthy notes into concise key points
- **Generate flashcards** for active recall practice
- **Create quizzes** (multiple choice, true/false, fill-in-the-blank) for self-assessment
- **Chat with notes** — ask questions about uploaded content
- **Track study progress** with analytics and spaced repetition

This project demonstrates: **full-stack architecture, AI/LLM integration, real-time features, authentication, file processing, database design, containerization, and CI/CD** — all the skills that make a GitHub profile stand out.

---

## 2. Problem Statement

Students spend hours reading and re-reading notes without effective retention. Research shows that **active recall** (flashcards, quizzes) and **spaced repetition** dramatically improve memory. However, manually creating flashcards and quizzes is tedious.

**Rizzearch** automates this process — transforming any study material into interactive learning tools in seconds.

---

## 3. Target Users

| User Type | Description |
|-----------|-------------|
| **College Students** | Upload lecture notes, generate study materials before exams |
| **Self-Learners** | Process online articles, tutorials, and documentation |
| **Professionals** | Summarize reports, training materials, or whitepapers |

---

## 4. Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **Next.js 15** (App Router) | React framework with SSR/SSG, API routes, and file-based routing |
| **TypeScript** | Type safety across the entire frontend |
| **Tailwind CSS** | Utility-first CSS for rapid, consistent styling |
| **shadcn/ui** | High-quality, accessible UI component library |
| **Zustand** | Lightweight global state management |
| **TipTap** | Rich text / Markdown editor (extensible, headless) |
| **Framer Motion** | Smooth animations and page transitions |
| **React Query (TanStack Query)** | Server state management, caching, and synchronization |
| **Recharts** | Dashboard charts and study analytics |
| **next-themes** | Dark/light mode toggle |

### Backend
| Technology | Purpose |
|-----------|---------|
| **FastAPI** (Python 3.12+) | High-performance async REST API framework |
| **SQLAlchemy 2.0** | Async ORM for database operations |
| **Alembic** | Database migrations |
| **Pydantic v2** | Request/response validation and serialization |
| **Celery** | Background task queue (AI processing, file parsing) |
| **Redis** | Task broker for Celery + caching layer |
| **python-jose** | JWT token encoding/decoding |
| **passlib[bcrypt]** | Password hashing |
| **python-multipart** | File upload handling |

### AI & Document Processing
| Technology | Purpose |
|-----------|---------|
| **OpenAI API** (GPT-4o-mini) | Summarization, flashcard generation, quiz generation, Q&A |
| **LangChain** | Document loading, text splitting, prompt chaining |
| **PyPDF2 / pdfplumber** | PDF text extraction |
| **python-docx** | DOCX text extraction |
| **tiktoken** | Token counting for cost optimization |

### Database
| Technology | Purpose |
|-----------|---------|
| **PostgreSQL 16** | Primary relational database |
| **Redis 7** | Caching, session store, Celery broker |

### DevOps & Infrastructure
| Technology | Purpose |
|-----------|---------|
| **Docker** | Containerization of all services |
| **Docker Compose** | Multi-container orchestration (dev & prod) |
| **GitHub Actions** | CI/CD pipeline (lint, test, build, deploy) |
| **Nginx** | Reverse proxy (production) |

### Testing
| Technology | Purpose |
|-----------|---------|
| **Pytest** | Backend unit & integration tests |
| **Vitest** | Frontend unit tests |
| **Playwright** | End-to-end browser tests |

---

## 5. System Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                         │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │              Next.js 15 (App Router + SSR)                 │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐  │  │
│  │  │Dashboard │ │Note Editor│ │Flashcards│ │Quiz Engine   │  │  │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────────┘  │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐  │  │
│  │  │Chat w/   │ │File      │ │Study     │ │Settings &    │  │  │
│  │  │Notes     │ │Upload    │ │Analytics │ │Profile       │  │  │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────────┘  │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────┬───────────────────────────────────────┘
                           │ HTTPS (REST API)
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│                    NGINX (Reverse Proxy)                          │
│              Routes: /api/* → FastAPI | /* → Next.js              │
└──────────────────────────┬───────────────────────────────────────┘
                           │
              ┌────────────┴────────────┐
              ▼                         ▼
┌──────────────────────┐   ┌──────────────────────────────────────┐
│   Next.js Server     │   │         FastAPI Backend               │
│   (SSR + Static)     │   │                                      │
│   Port: 3000         │   │  ┌────────────┐  ┌───────────────┐   │
│                      │   │  │Auth Module │  │Note Service   │   │
└──────────────────────┘   │  └────────────┘  └───────────────┘   │
                           │  ┌────────────┐  ┌───────────────┐   │
                           │  │AI Service  │  │Quiz Service   │   │
                           │  └────────────┘  └───────────────┘   │
                           │  ┌────────────┐  ┌───────────────┐   │
                           │  │File Service│  │Flashcard Svc  │   │
                           │  └────────────┘  └───────────────┘   │
                           │                   Port: 8000          │
                           └───────┬──────────────┬───────────────┘
                                   │              │
                    ┌──────────────┘              └──────────┐
                    ▼                                        ▼
         ┌─────────────────┐                    ┌─────────────────┐
         │  PostgreSQL 16   │                    │    Redis 7      │
         │  (Neon Serverless)│                   │   (Upstash)     │
         │                  │                    │                 │
         │  • Users         │                    │  • Celery Broker│
         │  • Notes         │                    │  • Cache Layer  │
         │  • Flashcards    │                    │  • Rate Limiting│
         │  • Quizzes       │                    │  • Session Store│
         │  • Study Sessions│                    └────────┬────────┘
         │  • pgvector (RAG)│                             │
         └─────────────────┘                              ▼
                                                ┌─────────────────┐
                                                │  Celery Worker   │
                                                │                 │
                                                │  • PDF Parsing  │
                                                │  • AI Generation│
                                                │  • Email Notif. │
                                                └────────┬────────┘
                                                         │
                                                         ▼
                                                ┌─────────────────┐
                                                │  OpenAI API     │
                                                │  (GPT-4o-mini)  │
                                                └────────┬────────┘
                                                         │
                                     ┌───────────────────┘
                                     ▼
                           ┌─────────────────────┐
                           │  DigitalOcean Spaces │
                           │  (S3 File Storage)   │
                           │                      │
                           │  • Uploaded PDFs      │
                           │  • DOCX / TXT files   │
                           │  • User avatars       │
                           └──────────────────────┘

              ┌──────────────────────────────────────────┐
              │         Monitoring & Observability        │
              │  ┌──────────┐  ┌──────────┐  ┌────────┐ │
              │  │  Sentry  │  │ Logfire  │  │Resend  │ │
              │  │  (Errors)│  │ (Traces) │  │(Email) │ │
              │  └──────────┘  └──────────┘  └────────┘ │
              └──────────────────────────────────────────┘
```

### Request Flow

```
User uploads PDF
    → Next.js sends file to FastAPI (/api/v1/documents/upload)
    → FastAPI streams file to DigitalOcean Spaces (S3)
    → FastAPI saves file metadata + S3 key to PostgreSQL
    → FastAPI dispatches Celery task (parse + AI process)
    → Celery Worker:
        1. Downloads file from S3
        2. Extracts text from PDF (PyPDF2)
        3. Splits into chunks (LangChain RecursiveCharSplitter)
        4. Generates vector embeddings (text-embedding-3-small)
        5. Stores embeddings in PostgreSQL pgvector
        6. Sends to OpenAI for summarization
        7. Generates flashcards & quiz questions
        8. Stores results in PostgreSQL
        9. Updates task status in Redis
    → Frontend polls task status (SSE preferred) → displays results when ready
```

### Chat-with-Notes (RAG) Flow

```
User asks: "What are the properties of a BST?"
    → FastAPI receives question + note context IDs
    → Generate embedding of the question (text-embedding-3-small)
    → Query pgvector for top-K most similar chunks (cosine similarity)
    → Build prompt: system instructions + retrieved chunks + user question
    → Stream response from GPT-4o-mini with citations
    → Return answer with source references (chunk IDs → note sections)
```

---

## 6. Core Features

### 6.1 Authentication & User Management
| Feature | Description |
|---------|-------------|
| Email/Password Registration | Sign up with email verification |
| Login / Logout | JWT-based authentication (access + refresh tokens) |
| OAuth Login | Google & GitHub social login |
| Profile Management | Update name, avatar, email, password |
| Password Reset | Email-based password recovery flow |

### 6.2 Note Management
| Feature | Description |
|---------|-------------|
| Rich Text Editor | TipTap-based Markdown editor with live preview |
| Create / Edit / Delete Notes | Full CRUD with auto-save (debounced) |
| Notebooks / Folders | Organize notes into hierarchical folders |
| Tags | Add color-coded tags for categorization |
| Search | Full-text search across all notes (PostgreSQL `tsvector`) |
| Favorites / Pinning | Pin important notes to the top |
| Note Sharing | Generate public read-only link for a note |

### 6.3 Document Upload & Processing
| Feature | Description |
|---------|-------------|
| File Upload | Drag-and-drop or click to upload (PDF, DOCX, TXT, MD) |
| Text Extraction | Automatic text extraction from uploaded documents |
| Processing Queue | Background processing with real-time progress indicator |
| Document Viewer | In-app preview of uploaded documents |
| Upload History | Track all uploaded files with status |
| Max File Size | 20MB per file, 500MB total storage per user (free tier) |

### 6.4 AI-Powered Features
| Feature | Description |
|---------|-------------|
| **Smart Summary** | Generate concise summaries (bullet points, paragraph, or TL;DR) |
| **Flashcard Generation** | Auto-create Q&A flashcards from content |
| **Quiz Generation** | Generate MCQ, True/False, and Fill-in-the-blank questions |
| **Chat with Notes** | Ask questions about your notes, get AI answers with citations |
| **Key Concepts Extraction** | Identify and define key terms/concepts from content |
| **Explain Like I'm 5** | Simplify complex topics into easy explanations |
| **Custom Prompts** | Users can write custom AI prompts against their notes |

### 6.5 Flashcard System
| Feature | Description |
|---------|-------------|
| Flashcard Decks | Group flashcards into decks by topic |
| Study Mode | Flip-card interface with keyboard shortcuts |
| Spaced Repetition (SM-2)| Algorithm-based review scheduling for optimal retention |
| Confidence Rating | Rate each card (Again, Hard, Good, Easy) to adjust schedule |
| Progress Tracking | Cards mastered, due for review, new cards count |
| Manual Creation | Create flashcards manually alongside AI-generated ones |

### 6.6 Quiz Engine
| Feature | Description |
|---------|-------------|
| Multiple Question Types | MCQ (single & multi-answer), True/False, Fill-in-the-blank |
| Configurable Quizzes | Choose # of questions, difficulty, question types |
| Timed Mode | Optional countdown timer per question or per quiz |
| Instant Feedback | Show correct answer and explanation after each question |
| Score History | Track quiz scores over time with trend charts |
| Retry / Review | Retake quizzes or review incorrect answers |

### 6.7 Study Dashboard & Analytics
| Feature | Description |
|---------|-------------|
| Study Streak | Track daily study consistency (like GitHub contributions) |
| Time Studied | Total study time per day/week/month |
| Cards Reviewed | Flashcards reviewed and mastery percentage |
| Quiz Performance | Average scores, improvement trends |
| Activity Heatmap | GitHub-style contribution grid for study activity |
| Weekly Report | AI-generated weekly study summary |

### 6.8 UI/UX
| Feature | Description |
|---------|-------------|
| Responsive Design | Mobile-first, works on all screen sizes |
| Dark / Light Mode | System-aware theme toggle with persistence |
| Keyboard Shortcuts | Power-user shortcuts for navigation & study modes |
| Loading States | Skeleton loaders, progress bars, optimistic updates |
| Toast Notifications | Non-blocking feedback for user actions |
| Onboarding Tour | First-time user walkthrough |

---

## 7. Database Schema

### Entity Relationship Diagram (ERD)

```
┌─────────────────┐       ┌─────────────────────┐       ┌──────────────────┐
│     users        │       │      notebooks       │       │      tags        │
├─────────────────┤       ├─────────────────────┤       ├──────────────────┤
│ id          PK  │──┐    │ id              PK  │──┐    │ id          PK   │
│ email           │  │    │ user_id         FK  │  │    │ user_id     FK   │
│ password_hash   │  │    │ title               │  │    │ name             │
│ full_name       │  │    │ description         │  │    │ color            │
│ avatar_url      │  │    │ parent_id       FK  │  │    │ created_at       │
│ is_verified     │  │    │ position            │  │    └──────────────────┘
│ oauth_provider  │  │    │ created_at          │  │             │
│ oauth_id        │  │    │ updated_at          │  │             │ M:N
│ created_at      │  │    └─────────────────────┘  │    ┌──────────────────┐
│ updated_at      │  │                              │    │   note_tags      │
└─────────────────┘  │    ┌─────────────────────┐  │    ├──────────────────┤
                     │    │       notes          │  │    │ note_id     FK   │
                     │    ├─────────────────────┤  │    │ tag_id      FK   │
                     ├───▶│ id              PK  │◀─┘    └──────────────────┘
                     │    │ user_id         FK  │              │
                     │    │ notebook_id     FK  │◀─────────────┘
                     │    │ title               │
                     │    │ content        TEXT  │
                     │    │ content_plain  TEXT  │──── (for full-text search)
                     │    │ summary        TEXT  │
                     │    │ is_favorited        │
                     │    │ is_pinned           │
                     │    │ share_token         │
                     │    │ created_at          │
                     │    │ updated_at          │
                     │    └─────────────────────┘
                     │              │
                     │              │ 1:N
                     │              ▼
                     │    ┌─────────────────────┐
                     │    │    documents         │
                     │    ├─────────────────────┤
                     │    │ id              PK  │
                     │    │ note_id         FK  │
                     │    │ user_id         FK  │
                     │    │ filename            │
                     │    │ file_path           │
                     │    │ file_size           │
                     │    │ mime_type           │
                     │    │ extracted_text TEXT  │
                     │    │ status         ENUM │──── (pending, processing, done, failed)
                     │    │ created_at          │
                     │    └─────────────────────┘
                     │
                     │    ┌─────────────────────┐       ┌──────────────────────┐
                     │    │  flashcard_decks     │       │    flashcards         │
                     │    ├─────────────────────┤       ├──────────────────────┤
                     ├───▶│ id              PK  │──────▶│ id              PK   │
                     │    │ user_id         FK  │       │ deck_id         FK   │
                     │    │ note_id         FK  │       │ front          TEXT   │
                     │    │ title               │       │ back           TEXT   │
                     │    │ description         │       │ difficulty     ENUM   │
                     │    │ card_count          │       │ ease_factor    FLOAT  │──── SM-2
                     │    │ created_at          │       │ interval       INT    │──── SM-2
                     │    │ updated_at          │       │ repetitions    INT    │──── SM-2
                     │    └─────────────────────┘       │ next_review    DATE   │──── SM-2
                     │                                  │ created_at           │
                     │                                  │ updated_at           │
                     │                                  └──────────────────────┘
                     │
                     │    ┌─────────────────────┐       ┌──────────────────────┐
                     │    │      quizzes         │       │   quiz_questions      │
                     │    ├─────────────────────┤       ├──────────────────────┤
                     ├───▶│ id              PK  │──────▶│ id              PK   │
                     │    │ user_id         FK  │       │ quiz_id         FK   │
                     │    │ note_id         FK  │       │ type           ENUM   │── (mcq, tf, fitb)
                     │    │ title               │       │ question       TEXT   │
                     │    │ description         │       │ options        JSONB  │── (for MCQ)
                     │    │ question_count      │       │ correct_answer TEXT   │
                     │    │ time_limit     INT  │       │ explanation    TEXT   │
                     │    │ created_at          │       │ position       INT    │
                     │    └─────────────────────┘       └──────────────────────┘
                     │
                     │    ┌─────────────────────┐       ┌──────────────────────┐
                     │    │   quiz_attempts      │       │  quiz_responses       │
                     │    ├─────────────────────┤       ├──────────────────────┤
                     ├───▶│ id              PK  │──────▶│ id              PK   │
                     │    │ quiz_id         FK  │       │ attempt_id      FK   │
                     │    │ user_id         FK  │       │ question_id     FK   │
                     │    │ score          INT  │       │ user_answer    TEXT   │
                     │    │ total_questions     │       │ is_correct     BOOL   │
                     │    │ time_taken     INT  │       │ time_taken     INT    │── (seconds)
                     │    │ completed_at        │       └──────────────────────┘
                     │    └─────────────────────┘
                     │
                     │    ┌─────────────────────┐       ┌──────────────────────┐
                     │    │  study_sessions      │       │  flashcard_reviews    │
                     │    ├─────────────────────┤       ├──────────────────────┤
                     └───▶│ id              PK  │       │ id              PK   │
                          │ user_id         FK  │       │ flashcard_id    FK   │
                          │ type           ENUM │       │ user_id         FK   │
                          │ duration       INT  │       │ rating         ENUM   │── (again,hard,good,easy)
                          │ cards_reviewed INT  │       │ reviewed_at          │
                          │ started_at         │       └──────────────────────┘
                          │ ended_at           │
                          └─────────────────────┘

                          ┌─────────────────────┐
                          │  note_embeddings     │  (pgvector)
                          ├─────────────────────┤
                          │ id              PK  │
                          │ note_id         FK  │
                          │ chunk_index     INT │
                          │ chunk_text     TEXT │
                          │ embedding   VECTOR  │── (1536 dimensions)
                          │ token_count     INT │
                          │ created_at          │
                          └─────────────────────┘
```

### Key Indexes
```sql
-- Full-text search on notes
CREATE INDEX idx_notes_search ON notes USING GIN(to_tsvector('english', content_plain));

-- Vector similarity search for RAG (pgvector HNSW index)
CREATE INDEX idx_embeddings_hnsw ON note_embeddings
  USING hnsw (embedding vector_cosine_ops) WITH (m = 16, ef_construction = 64);

-- Flashcard review scheduling (spaced repetition queries)
CREATE INDEX idx_flashcards_next_review ON flashcards(deck_id, next_review);

-- User's notes listing
CREATE INDEX idx_notes_user_updated ON notes(user_id, updated_at DESC);

-- Study session analytics
CREATE INDEX idx_study_sessions_user_date ON study_sessions(user_id, started_at);

-- Embedding lookup by note
CREATE INDEX idx_embeddings_note ON note_embeddings(note_id);
```

---

## 8. API Endpoints

### Base URL: `/api/v1`

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login (returns access + refresh token) |
| POST | `/auth/refresh` | Refresh access token |
| POST | `/auth/logout` | Invalidate refresh token |
| POST | `/auth/forgot-password` | Send password reset email |
| POST | `/auth/reset-password` | Reset password with token |
| GET | `/auth/me` | Get current user profile |
| PUT | `/auth/me` | Update profile |
| POST | `/auth/oauth/google` | Google OAuth callback |
| POST | `/auth/oauth/github` | GitHub OAuth callback |

### Notes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/notes` | List user's notes (paginated, filterable) |
| POST | `/notes` | Create new note |
| GET | `/notes/:id` | Get single note |
| PUT | `/notes/:id` | Update note |
| DELETE | `/notes/:id` | Delete note |
| POST | `/notes/:id/favorite` | Toggle favorite |
| POST | `/notes/:id/pin` | Toggle pin |
| POST | `/notes/:id/share` | Generate share link |
| GET | `/notes/shared/:token` | Get shared note (public) |
| GET | `/notes/search?q=` | Full-text search notes |

### Notebooks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/notebooks` | List user's notebooks (tree) |
| POST | `/notebooks` | Create notebook |
| PUT | `/notebooks/:id` | Update notebook |
| DELETE | `/notebooks/:id` | Delete notebook |
| PUT | `/notebooks/:id/reorder` | Reorder notebooks |

### Tags
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tags` | List user's tags |
| POST | `/tags` | Create tag |
| PUT | `/tags/:id` | Update tag |
| DELETE | `/tags/:id` | Delete tag |

### Documents
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/documents/upload` | Upload file(s) |
| GET | `/documents` | List uploaded documents |
| GET | `/documents/:id` | Get document details + extracted text |
| DELETE | `/documents/:id` | Delete document |
| GET | `/documents/:id/status` | Check processing status |

### AI Features
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/ai/summarize` | Generate summary from note/document |
| POST | `/ai/flashcards` | Generate flashcards from content |
| POST | `/ai/quiz` | Generate quiz from content |
| POST | `/ai/chat` | Chat with notes (RAG-based Q&A) |
| POST | `/ai/explain` | Simplify/explain a concept |
| POST | `/ai/key-concepts` | Extract key terms and definitions |
| GET | `/ai/tasks/:id` | Check async AI task status |

### Flashcards
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/flashcards/decks` | List user's decks |
| POST | `/flashcards/decks` | Create deck |
| GET | `/flashcards/decks/:id` | Get deck with cards |
| PUT | `/flashcards/decks/:id` | Update deck |
| DELETE | `/flashcards/decks/:id` | Delete deck |
| POST | `/flashcards/decks/:id/cards` | Add card to deck |
| PUT | `/flashcards/cards/:id` | Update card |
| DELETE | `/flashcards/cards/:id` | Delete card |
| GET | `/flashcards/decks/:id/study` | Get cards due for review (SM-2) |
| POST | `/flashcards/cards/:id/review` | Submit review rating |

### Quizzes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/quizzes` | List user's quizzes |
| GET | `/quizzes/:id` | Get quiz with questions |
| DELETE | `/quizzes/:id` | Delete quiz |
| POST | `/quizzes/:id/attempt` | Start quiz attempt |
| POST | `/quizzes/attempts/:id/submit` | Submit quiz answers |
| GET | `/quizzes/attempts/:id/results` | Get attempt results |
| GET | `/quizzes/:id/attempts` | List attempts for a quiz |

### Analytics / Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/analytics/overview` | Dashboard stats (notes, cards, streaks) |
| GET | `/analytics/study-time` | Study time per day/week/month |
| GET | `/analytics/heatmap` | Study activity heatmap data |
| GET | `/analytics/quiz-performance` | Quiz score trends |
| GET | `/analytics/flashcard-progress` | Cards mastered/learning/new |

---

## 9. Frontend Pages & Components

### Page Structure (Next.js App Router)

```
app/
├── (auth)/
│   ├── login/page.tsx              # Login form
│   ├── register/page.tsx           # Registration form
│   ├── forgot-password/page.tsx    # Password reset request
│   └── reset-password/page.tsx     # Password reset form
├── (main)/
│   ├── layout.tsx                  # Authenticated layout (sidebar + header)
│   ├── dashboard/page.tsx          # Study dashboard & analytics
│   ├── notes/
│   │   ├── page.tsx                # Notes list (grid/list view)
│   │   ├── [id]/page.tsx           # Note editor
│   │   └── new/page.tsx            # Create new note
│   ├── notebooks/
│   │   └── [id]/page.tsx           # Notebook view with notes
│   ├── flashcards/
│   │   ├── page.tsx                # Deck list
│   │   ├── [deckId]/page.tsx       # Deck detail (card list)
│   │   └── [deckId]/study/page.tsx # Flashcard study session
│   ├── quizzes/
│   │   ├── page.tsx                # Quiz list
│   │   ├── [id]/page.tsx           # Quiz detail
│   │   ├── [id]/take/page.tsx      # Take quiz
│   │   └── [id]/results/page.tsx   # Quiz results
│   ├── chat/page.tsx               # Chat with notes (AI Q&A)
│   ├── upload/page.tsx             # Document upload & processing
│   └── settings/page.tsx           # User settings & preferences
├── shared/[token]/page.tsx         # Public shared note view
├── layout.tsx                      # Root layout
├── page.tsx                        # Landing page (marketing)
└── not-found.tsx                   # 404 page
```

### Key UI Components

```
components/
├── ui/                        # shadcn/ui primitives
│   ├── button.tsx
│   ├── input.tsx
│   ├── dialog.tsx
│   ├── dropdown-menu.tsx
│   ├── card.tsx
│   ├── skeleton.tsx
│   ├── toast.tsx
│   └── ...
├── layout/
│   ├── sidebar.tsx            # Collapsible sidebar with nav
│   ├── header.tsx             # Top bar with search & user menu
│   ├── mobile-nav.tsx         # Mobile bottom navigation
│   └── theme-toggle.tsx       # Dark/light mode switch
├── notes/
│   ├── note-editor.tsx        # TipTap rich text editor
│   ├── note-card.tsx          # Note preview card (grid view)
│   ├── note-list-item.tsx     # Note row (list view)
│   ├── note-toolbar.tsx       # Editor toolbar (bold, headings, etc.)
│   └── tag-selector.tsx       # Tag picker component
├── flashcards/
│   ├── flashcard-flip.tsx     # Flip card animation
│   ├── deck-card.tsx          # Deck preview card
│   ├── study-controls.tsx     # Again/Hard/Good/Easy buttons
│   └── progress-bar.tsx       # Study session progress
├── quizzes/
│   ├── question-mcq.tsx       # Multiple choice question
│   ├── question-tf.tsx        # True/false question
│   ├── question-fitb.tsx      # Fill in the blank
│   ├── quiz-timer.tsx         # Countdown timer
│   └── score-display.tsx      # Results visualization
├── ai/
│   ├── ai-chat-panel.tsx      # Chat interface for note Q&A
│   ├── ai-loading.tsx         # AI processing animation
│   ├── summary-display.tsx    # Formatted summary output
│   └── generation-config.tsx  # AI generation options (# cards, difficulty)
├── dashboard/
│   ├── stat-card.tsx          # Metric display card
│   ├── activity-heatmap.tsx   # GitHub-style heatmap
│   ├── study-chart.tsx        # Study time bar/line chart
│   └── streak-counter.tsx     # Current streak display
├── upload/
│   ├── dropzone.tsx           # Drag-and-drop file upload
│   ├── upload-progress.tsx    # File processing progress
│   └── document-list.tsx      # Uploaded documents grid
└── shared/
    ├── empty-state.tsx        # No data illustrations
    ├── search-bar.tsx         # Global search component
    ├── confirm-dialog.tsx     # Confirmation modal
    └── error-boundary.tsx     # Error fallback UI
```

### Wireframe Sketches

**Dashboard:**
```
┌────────────────────────────────────────────────────────────┐
│  ☰  Rizzearch                       🔍 Search    👤 Raver  │
├──────────┬─────────────────────────────────────────────────┤
│          │                                                 │
│ 📊 Dash  │  Welcome back, Raver! 🔥 5 day streak          │
│ 📝 Notes │                                                 │
│ 📂 Books │  ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│ 🗂️ Cards │  │ 24 Notes │ │142 Cards │ │ 8 Quizzes│       │
│ ❓ Quiz  │  │ +3 today │ │ 28 due   │ │ avg: 85% │       │
│ 💬 Chat  │  └──────────┘ └──────────┘ └──────────┘       │
│ 📤 Upload│                                                 │
│ ⚙️ Setup │  Study Activity                                 │
│          │  ┌──────────────────────────────────────┐       │
│          │  │ ▓▓░░▓▓▓░▓▓▓▓░░▓▓▓▓▓▓▓░▓▓▓▓▓░░▓▓▓  │       │
│          │  │ (Activity Heatmap - 6 months)         │       │
│          │  └──────────────────────────────────────┘       │
│          │                                                 │
│          │  Quiz Performance          Study Time           │
│          │  ┌─────────────────┐  ┌─────────────────┐     │
│          │  │ 📈 Line chart   │  │ 📊 Bar chart    │     │
│          │  │ (scores trend)  │  │ (daily hours)   │     │
│          │  └─────────────────┘  └─────────────────┘     │
│          │                                                 │
│          │  Recent Notes                                   │
│          │  ┌────────────────────────────────────────┐    │
│          │  │ 📝 Data Structures Ch.5    2 hours ago  │    │
│          │  │ 📝 Operating Systems Notes yesterday    │    │
│          │  │ 📝 Theory of Computation   3 days ago   │    │
│          │  └────────────────────────────────────────┘    │
└──────────┴─────────────────────────────────────────────────┘
```

**Note Editor with AI Panel:**
```
┌────────────────────────────────────────────────────────────┐
│  ← Notes / Data Structures Ch.5       ⭐ 📤 🤖 AI  ⋮     │
├──────────────────────────────────┬─────────────────────────┤
│                                  │  ✨ AI Assistant         │
│  # Data Structures Chapter 5     │                         │
│                                  │  ┌───────────────────┐  │
│  ## Binary Search Trees          │  │ 📋 Summarize      │  │
│                                  │  │ 🗂️ Flashcards     │  │
│  A binary search tree (BST) is  │  │ ❓ Generate Quiz   │  │
│  a node-based binary tree data  │  │ 🔑 Key Concepts   │  │
│  structure which has the         │  │ 💡 Explain Simply  │  │
│  following properties:           │  └───────────────────┘  │
│                                  │                         │
│  - The left subtree of a node   │  ── Summary ──────────  │
│    contains only nodes with      │  BST is a binary tree   │
│    keys lesser than the node's  │  where left children     │
│    key.                          │  are smaller and right   │
│  - The right subtree of a node  │  children are larger.    │
│    contains only nodes with      │  Key operations:         │
│    keys greater than the node's │  • Search: O(log n)      │
│    key.                          │  • Insert: O(log n)      │
│                                  │  • Delete: O(log n)      │
│  ### Operations                  │                         │
│  ...                             │  [Generate Flashcards]  │
│                                  │  [Create Quiz →]        │
│  **B** _I_ ~S~ ` H1 H2 • # 📎  │                         │
└──────────────────────────────────┴─────────────────────────┘
```

---

## 10. AI Pipeline

### Prompt Engineering Strategy

#### Summarization Prompt
```
You are an expert study assistant. Summarize the following study material into 
clear, concise key points. Format as bullet points grouped by subtopic.
Keep the summary under {max_length} words. Focus on concepts, definitions, 
and relationships that would be important for exam preparation.

---
CONTENT:
{note_content}
---

Respond in JSON format:
{
  "title": "Summary title",
  "key_points": [
    { "topic": "Topic Name", "points": ["point 1", "point 2"] }
  ],
  "tldr": "One-paragraph summary"
}
```

#### Flashcard Generation Prompt
```
You are an expert educator. Generate {count} high-quality flashcards from 
the following study material. Each flashcard should test ONE specific concept.

Guidelines:
- Front: Clear, specific question (avoid vague questions)
- Back: Concise but complete answer
- Vary question types: definitions, comparisons, applications, examples
- Order from fundamental concepts to advanced topics
- Assign difficulty: "easy", "medium", or "hard"

---
CONTENT:
{note_content}
---

Respond in JSON format:
{
  "flashcards": [
    {
      "front": "Question text",
      "back": "Answer text",
      "difficulty": "easy|medium|hard"
    }
  ]
}
```

#### Quiz Generation Prompt
```
You are an expert exam creator. Generate {count} quiz questions from the 
following study material.

Question type distribution:
- {mcq_count} Multiple Choice (4 options, 1 correct)
- {tf_count} True/False
- {fitb_count} Fill in the Blank

Guidelines:
- Questions should test understanding, not just memorization
- MCQ distractors should be plausible but clearly wrong
- Include an explanation for each correct answer
- Assign difficulty: "easy", "medium", or "hard"

---
CONTENT:
{note_content}
---

Respond in JSON format:
{
  "questions": [
    {
      "type": "mcq",
      "question": "Question text",
      "options": ["A", "B", "C", "D"],
      "correct_answer": "A",
      "explanation": "Why A is correct...",
      "difficulty": "medium"
    },
    {
      "type": "true_false",
      "question": "Statement to evaluate",
      "correct_answer": "true",
      "explanation": "Why this is true...",
      "difficulty": "easy"
    },
    {
      "type": "fill_blank",
      "question": "A ____ is a data structure that...",
      "correct_answer": "binary search tree",
      "explanation": "Because...",
      "difficulty": "hard"
    }
  ]
}
```

### Token Management
```
┌─────────────────────────────────────────────────────────────┐
│              Token Budget Strategy                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Count tokens with tiktoken before sending               │
│  2. If content > 12,000 tokens:                             │
│     → Split into chunks (LangChain RecursiveCharSplitter)   │
│     → Chunk size: 1,000 tokens, overlap: 200 tokens         │
│     → Process each chunk independently                      │
│     → Merge results with deduplication                      │
│  3. Model selection by task:                                │
│     → Summarization / Flashcards / Quiz: GPT-4o-mini        │
│       (~$0.15/1M input, ~$0.60/1M output)                   │
│     → Embeddings: text-embedding-3-small                    │
│       (~$0.02/1M tokens — very cheap)                       │
│     → Chat Q&A: GPT-4o-mini with streaming                  │
│  4. Cache AI responses in Redis (TTL: 24h)                  │
│     → Cache key: hash(content + prompt_type + params)       │
│  5. Rate limits (per user):                                 │
│     → Free tier: 20 AI requests/hour                        │
│     → Embedding generation: unlimited (batched, cheap)      │
│  6. Cost guardrails:                                        │
│     → Max 50,000 tokens per single AI request               │
│     → Monthly budget cap with OpenAI usage alerts           │
│     → Log every request cost to analytics table             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Embedding & Vector Search Strategy

```
┌─────────────────────────────────────────────────────────────┐
│              RAG Pipeline (Chat with Notes)                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Indexing (on document upload / note save):                 │
│  ─────────────────────────────────────────                  │
│  1. Split content → chunks (1,000 tokens, 200 overlap)     │
│  2. Generate embeddings via text-embedding-3-small          │
│     → 1,536 dimensions per chunk                            │
│  3. Store in PostgreSQL with pgvector extension             │
│     → Table: note_embeddings (chunk_id, note_id, vector)   │
│  4. Create HNSW index for fast approximate nearest neighbor │
│                                                             │
│  Retrieval (on user query):                                 │
│  ─────────────────────────────────────────                  │
│  1. Embed user question → 1,536-dim vector                 │
│  2. SELECT * FROM note_embeddings                           │
│     ORDER BY embedding <=> query_vector                     │
│     WHERE note_id IN (user's selected notes)                │
│     LIMIT 5;                                                │
│  3. Build context window: system prompt + top-5 chunks      │
│  4. Stream GPT-4o-mini response with chunk citations        │
│                                                             │
│  Why pgvector over Pinecone/Weaviate?                       │
│  → Zero additional infrastructure (reuses existing Postgres)│
│  → Free with Neon (Student Pack) — no vector DB costs       │
│  → HNSW index handles 100K+ vectors efficiently             │
│  → Simpler deployment & fewer moving parts                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Spaced Repetition Algorithm (SM-2)

```python
def sm2_algorithm(quality: int, repetitions: int, ease_factor: float, interval: int):
    """
    SM-2 Spaced Repetition Algorithm
    quality: 0-5 (0=complete blackout, 5=perfect response)
    Maps from UI: Again=0, Hard=2, Good=4, Easy=5
    """
    if quality >= 3:  # Correct response
        if repetitions == 0:
            interval = 1
        elif repetitions == 1:
            interval = 6
        else:
            interval = round(interval * ease_factor)
        repetitions += 1
    else:  # Incorrect response
        repetitions = 0
        interval = 1

    # Update ease factor (minimum 1.3)
    ease_factor = max(1.3, ease_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)))

    next_review = today + timedelta(days=interval)

    return repetitions, ease_factor, interval, next_review
```

---

## 11. Authentication & Authorization

### JWT Token Strategy
```
┌─────────────────────────────────────────┐
│           Token Architecture             │
├─────────────────────────────────────────┤
│                                         │
│  Access Token (short-lived):            │
│  ├── Expiry: 15 minutes                │
│  ├── Stored: Memory (Zustand store)     │
│  ├── Payload: { user_id, email, role }  │
│  └── Sent: Authorization: Bearer <jwt>  │
│                                         │
│  Refresh Token (long-lived):            │
│  ├── Expiry: 7 days                    │
│  ├── Stored: HttpOnly secure cookie     │
│  ├── Rotation: New refresh on each use  │
│  └── Revocable: Stored in Redis         │
│                                         │
└─────────────────────────────────────────┘
```

### Auth Flow
```
Registration:
  User → POST /auth/register { email, password, name }
       → Hash password (bcrypt)
       → Save to DB
       → Send verification email
       → Return { message: "Check your email" }

Login:
  User → POST /auth/login { email, password }
       → Verify password against hash
       → Generate access token + refresh token
       → Set refresh token as HttpOnly cookie
       → Return { access_token, user }

Protected Request:
  User → GET /api/v1/notes (Authorization: Bearer <access_token>)
       → Middleware validates JWT
       → Extract user_id from token
       → Process request
       → Return data

Token Refresh:
  User → POST /auth/refresh (cookie: refresh_token)
       → Validate refresh token in Redis
       → Rotate: invalidate old, issue new
       → Return { access_token }
```

---

## 12. Project Structure

```
rizzearch/
├── 📁 client/                          # Next.js Frontend
│   ├── 📁 app/                         # App Router pages
│   │   ├── 📁 (auth)/                  # Auth pages (no sidebar)
│   │   ├── 📁 (main)/                  # Main app (with sidebar)
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # Landing page
│   │   └── globals.css
│   ├── 📁 components/                  # React components
│   │   ├── 📁 ui/                      # shadcn/ui components
│   │   ├── 📁 layout/                  # Layout components
│   │   ├── 📁 notes/                   # Note-related components
│   │   ├── 📁 flashcards/              # Flashcard components
│   │   ├── 📁 quizzes/                 # Quiz components
│   │   ├── 📁 ai/                      # AI feature components
│   │   ├── 📁 dashboard/               # Dashboard widgets
│   │   └── 📁 shared/                  # Shared/common components
│   ├── 📁 lib/                         # Utilities & config
│   │   ├── api.ts                      # Axios/fetch API client
│   │   ├── auth.ts                     # Auth utilities
│   │   ├── sentry.ts                   # Sentry client init
│   │   ├── utils.ts                    # Helper functions
│   │   └── constants.ts               # App constants
│   ├── 📁 hooks/                       # Custom React hooks
│   │   ├── use-auth.ts
│   │   ├── use-notes.ts
│   │   ├── use-flashcards.ts
│   │   └── use-debounce.ts
│   ├── 📁 stores/                      # Zustand state stores
│   │   ├── auth-store.ts
│   │   ├── note-store.ts
│   │   └── ui-store.ts
│   ├── 📁 types/                       # TypeScript type definitions
│   │   ├── api.ts
│   │   ├── note.ts
│   │   ├── flashcard.ts
│   │   └── quiz.ts
│   ├── 📁 public/                      # Static assets
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── 📁 server/                          # FastAPI Backend
│   ├── 📁 app/
│   │   ├── __init__.py
│   │   ├── main.py                     # FastAPI app entry point
│   │   ├── config.py                   # Settings (pydantic-settings)
│   │   ├── database.py                 # DB engine & session
│   │   ├── 📁 api/
│   │   │   ├── __init__.py
│   │   │   ├── deps.py                 # Dependency injection
│   │   │   └── 📁 v1/
│   │   │       ├── __init__.py
│   │   │       ├── router.py           # Main API router
│   │   │       ├── auth.py             # Auth endpoints
│   │   │       ├── notes.py            # Note endpoints
│   │   │       ├── notebooks.py        # Notebook endpoints
│   │   │       ├── tags.py             # Tag endpoints
│   │   │       ├── documents.py        # Document upload endpoints
│   │   │       ├── ai.py               # AI feature endpoints
│   │   │       ├── flashcards.py       # Flashcard endpoints
│   │   │       ├── quizzes.py          # Quiz endpoints
│   │   │       └── analytics.py        # Analytics endpoints
│   │   ├── 📁 models/                  # SQLAlchemy models
│   │   │   ├── __init__.py
│   │   │   ├── user.py
│   │   │   ├── note.py
│   │   │   ├── notebook.py
│   │   │   ├── tag.py
│   │   │   ├── document.py
│   │   │   ├── flashcard.py
│   │   │   ├── quiz.py
│   │   │   ├── embedding.py            # pgvector embedding model
│   │   │   └── study_session.py
│   │   ├── 📁 schemas/                 # Pydantic schemas
│   │   │   ├── __init__.py
│   │   │   ├── auth.py
│   │   │   ├── note.py
│   │   │   ├── flashcard.py
│   │   │   ├── quiz.py
│   │   │   └── analytics.py
│   │   ├── 📁 services/                # Business logic layer
│   │   │   ├── __init__.py
│   │   │   ├── auth_service.py
│   │   │   ├── note_service.py
│   │   │   ├── ai_service.py
│   │   │   ├── embedding_service.py     # Vector embedding + retrieval
│   │   │   ├── flashcard_service.py
│   │   │   ├── quiz_service.py
│   │   │   ├── document_service.py
│   │   │   ├── storage_service.py       # S3/Spaces file operations
│   │   │   ├── email_service.py         # Resend transactional emails
│   │   │   └── analytics_service.py
│   │   ├── 📁 core/                    # Core utilities
│   │   │   ├── __init__.py
│   │   │   ├── security.py             # JWT, hashing, OAuth
│   │   │   ├── exceptions.py           # Custom exceptions
│   │   │   ├── middleware.py           # CORS, rate limiting
│   │   │   └── sentry.py              # Sentry SDK init
│   │   └── 📁 tasks/                   # Celery background tasks
│   │       ├── __init__.py
│   │       ├── celery_app.py           # Celery + Beat configuration
│   │       ├── document_tasks.py       # File processing tasks
│   │       ├── ai_tasks.py            # AI generation tasks
│   │       └── email_tasks.py         # Email notification tasks
│   ├── 📁 alembic/                     # Database migrations
│   │   ├── env.py
│   │   ├── alembic.ini
│   │   └── 📁 versions/
│   ├── 📁 tests/                       # Backend tests
│   │   ├── conftest.py
│   │   ├── 📁 test_api/
│   │   ├── 📁 test_services/
│   │   └── 📁 test_tasks/
│   ├── requirements.txt
│   ├── requirements-dev.txt
│   └── Dockerfile
│
├── 📁 docker/                          # Docker configuration
│   ├── docker-compose.yml              # Dev environment (with MinIO)
│   ├── docker-compose.prod.yml         # Production environment
│   ├── Dockerfile.client               # Next.js Dockerfile
│   ├── Dockerfile.server               # FastAPI Dockerfile
│   └── nginx.conf                      # Nginx reverse proxy config
│
├── 📁 .github/                         # GitHub configuration
│   └── 📁 workflows/
│       ├── ci.yml                      # Lint + test + security audit on PR
│       └── deploy.yml                  # Deploy on main push
│
├── sentry.client.config.ts             # Sentry frontend config
├── sentry.server.config.ts             # Sentry SSR config
├── .env.example                        # Environment variables template
├── .gitignore
├── LICENSE                             # MIT License
└── README.md                           # Project documentation
```

---

## 13. Security & Hardening

### Security Checklist

```
┌──────────────────────────────────────────────────────────────┐
│                    Security Measures                          │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Authentication & Sessions:                                  │
│  ├── bcrypt password hashing (cost factor 12)                │
│  ├── JWT access tokens (15 min expiry, in-memory only)       │
│  ├── Refresh tokens (7 day, HttpOnly + Secure + SameSite)    │
│  ├── Refresh token rotation (one-time use, revoke on reuse)  │
│  └── Account lockout after 5 failed login attempts (15 min)  │
│                                                              │
│  API Protection:                                             │
│  ├── CORS whitelist (only FRONTEND_URL allowed)              │
│  ├── Rate limiting via Redis (sliding window algorithm)      │
│  │   ├── Auth endpoints: 5 req/min per IP                    │
│  │   ├── AI endpoints: 20 req/hour per user                  │
│  │   └── General API: 100 req/min per user                   │
│  ├── Request body size limit (20MB for uploads, 1MB other)   │
│  ├── Input sanitization (Pydantic v2 validators)             │
│  └── SQL injection prevention (SQLAlchemy parameterized)     │
│                                                              │
│  File Upload Security:                                       │
│  ├── MIME type validation (whitelist: pdf, docx, txt, md)    │
│  ├── File extension validation                               │
│  ├── Magic bytes verification (python-magic)                 │
│  ├── Max file size enforcement (20MB)                        │
│  ├── Randomized S3 keys (UUID-based, no user filenames)      │
│  └── Presigned URLs for downloads (time-limited access)      │
│                                                              │
│  Infrastructure:                                             │
│  ├── Cloudflare DNS + CDN + DDoS protection                  │
│  ├── HTTPS everywhere (TLS 1.3)                              │
│  ├── Environment secrets via GitHub Secrets / DO App Spec    │
│  ├── No secrets in Docker images or git history              │
│  └── Dependency vulnerability scanning (Dependabot + pip-audit)│
│                                                              │
│  Headers (via middleware):                                   │
│  ├── X-Content-Type-Options: nosniff                         │
│  ├── X-Frame-Options: DENY                                   │
│  ├── Strict-Transport-Security: max-age=31536000             │
│  └── Content-Security-Policy (strict, no inline scripts)     │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 14. Monitoring & Observability

### Error Tracking (Sentry — free via GitHub Student Pack)
```
┌──────────────────────────────────────────────────────────────┐
│  Sentry Integration (500K events/month free)                 │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Backend (FastAPI):                                          │
│  ├── sentry-sdk[fastapi] — automatic error capture           │
│  ├── Performance traces on all API endpoints                 │
│  ├── Celery task error tracking                              │
│  └── Custom breadcrumbs for AI pipeline failures             │
│                                                              │
│  Frontend (Next.js):                                         │
│  ├── @sentry/nextjs — client + server error capture          │
│  ├── Session replay on errors (see what user did)            │
│  ├── Source maps uploaded on build for readable traces       │
│  └── Performance monitoring (Web Vitals: LCP, FID, CLS)     │
│                                                              │
│  Alerts:                                                     │
│  ├── Slack/Discord webhook on new errors                     │
│  ├── Spike detection (>10 errors/min)                        │
│  └── Weekly error digest email                               │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Structured Logging
```python
# All logs are structured JSON for easy parsing
# Using Python's structlog or Logfire
{
    "timestamp": "2026-02-22T10:30:00Z",
    "level": "info",
    "event": "ai_generation_complete",
    "user_id": "uuid-123",
    "task_type": "flashcard_generation",
    "note_id": "uuid-456",
    "tokens_used": 2340,
    "cost_usd": 0.0004,
    "duration_ms": 3200,
    "cards_generated": 15
}
```

### Health Checks
| Endpoint | Checks |
|----------|--------|
| `GET /health` | API is running |
| `GET /health/ready` | DB connected + Redis connected + Celery responsive |
| `GET /health/live` | Liveness probe for container orchestration |

---

## 15. DevOps & Deployment

### Deployment Architecture (Production)

```
┌─────────────────────────────────────────────────────────────────┐
│                    Production Infrastructure                     │
│                (GitHub Student Pack powered)                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  DNS & CDN:                                                     │
│  ├── Domain: rizzearch.tech (free .tech via Student Pack)       │
│  └── Cloudflare (free) → DNS, CDN, SSL, DDoS protection        │
│                                                                 │
│  Frontend:                                                      │
│  └── Vercel (free tier)                                         │
│      ├── Auto-deploy on git push                                │
│      ├── Preview deploys for every PR                           │
│      ├── Edge network (global CDN)                              │
│      └── Environment: NEXT_PUBLIC_API_URL → api.rizzearch.tech  │
│                                                                 │
│  Backend:                                                       │
│  └── DigitalOcean App Platform ($200 Student Credits)           │
│      ├── Web Service: FastAPI (min 1 instance, 512MB RAM)       │
│      ├── Worker: Celery (1 instance, 512MB RAM)                 │
│      └── Auto-deploy from GitHub main branch                    │
│                                                                 │
│  Database:                                                      │
│  └── Neon PostgreSQL (free via Student Pack)                    │
│      ├── Serverless — scales to zero when idle                  │
│      ├── Branching — preview DB per PR (like git branches)      │
│      ├── pgvector extension enabled                             │
│      └── Auto-suspend after 5 min inactivity (free tier)        │
│                                                                 │
│  Redis:                                                         │
│  └── Upstash Redis (free tier)                                  │
│      ├── Serverless — pay per request                           │
│      ├── 10K commands/day free                                  │
│      └── REST API compatible (works from serverless)            │
│                                                                 │
│  File Storage:                                                  │
│  └── DigitalOcean Spaces ($5/mo from credits)                   │
│      ├── S3-compatible API (use boto3)                          │
│      ├── Built-in CDN for file downloads                        │
│      ├── 250GB storage + 1TB transfer                           │
│      └── Presigned URLs for secure downloads                    │
│                                                                 │
│  Email:                                                         │
│  └── Resend (free tier: 3,000 emails/month)                     │
│      ├── Verification emails                                    │
│      ├── Password reset emails                                  │
│      └── Weekly study report emails                             │
│                                                                 │
│  Monitoring:                                                    │
│  └── Sentry (free via Student Pack)                             │
│      ├── Error tracking (frontend + backend)                    │
│      ├── Performance monitoring                                 │
│      └── Session replay                                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Docker Compose (Local Development)
```yaml
services:
  client:
    build: ./client
    ports: ["3000:3000"]
    volumes: ["./client:/app", "/app/node_modules"]
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8000
    depends_on: [server]

  server:
    build: ./server
    ports: ["8000:8000"]
    volumes: ["./server:/app"]
    depends_on: [db, redis]
    environment:
      - DATABASE_URL=postgresql+asyncpg://user:pass@db:5432/rizzearch
      - REDIS_URL=redis://redis:6379
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - S3_ENDPOINT=http://minio:9000
      - S3_BUCKET=rizzearch-uploads
      - S3_ACCESS_KEY=minioadmin
      - S3_SECRET_KEY=minioadmin
      - SENTRY_DSN=${SENTRY_DSN}

  celery-worker:
    build: ./server
    command: celery -A app.tasks.celery_app worker --loglevel=info --concurrency=2
    depends_on: [db, redis]
    environment:
      - DATABASE_URL=postgresql+asyncpg://user:pass@db:5432/rizzearch
      - REDIS_URL=redis://redis:6379
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - S3_ENDPOINT=http://minio:9000

  celery-beat:
    build: ./server
    command: celery -A app.tasks.celery_app beat --loglevel=info
    depends_on: [redis]
    # Schedules: daily spaced repetition reminders, weekly study reports

  db:
    image: pgvector/pgvector:pg16
    ports: ["5432:5432"]
    volumes: ["postgres_data:/var/lib/postgresql/data"]
    environment:
      - POSTGRES_DB=rizzearch
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    # Uses pgvector-enabled Postgres image instead of vanilla postgres:16

  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]

  minio:
    image: minio/minio
    command: server /data --console-address ":9001"
    ports: ["9000:9000", "9001:9001"]
    volumes: ["minio_data:/data"]
    environment:
      - MINIO_ROOT_USER=minioadmin
      - MINIO_ROOT_PASSWORD=minioadmin
    # MinIO = local S3-compatible storage (mirrors DO Spaces in dev)

volumes:
  postgres_data:
  minio_data:
```

### CI/CD Pipeline (GitHub Actions)
```
Push to PR:
  → Lint (ESLint + Ruff + Prettier check)
  → Type check (TypeScript tsc --noEmit + mypy --strict)
  → Security audit (pip-audit + npm audit)
  → Unit tests (Vitest + Pytest with coverage)
  → Build check (Next.js build)
  → Playwright E2E (on key PRs via label trigger)
  → Preview deploy (Vercel auto-preview + Neon branch DB)

Merge to main:
  → All above checks
  → Build Docker images
  → Push to DigitalOcean Container Registry
  → Deploy backend to DO App Platform
  → Vercel auto-deploys frontend
  → Run Alembic migrations against prod DB
  → Notify Discord on success/failure
  → Upload source maps to Sentry
```

### Environment Variables
```bash
# ──── Database (Neon) ────
DATABASE_URL=postgresql+asyncpg://user:password@ep-xyz.us-east-2.aws.neon.tech/rizzearch?sslmode=require

# ──── Redis (Upstash) ────
REDIS_URL=rediss://default:token@us1-xyz.upstash.io:6379

# ──── JWT ────
JWT_SECRET_KEY=your-super-secret-key-change-in-production
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=15
REFRESH_TOKEN_EXPIRE_DAYS=7

# ──── OpenAI ────
OPENAI_API_KEY=sk-your-openai-api-key
OPENAI_MODEL=gpt-4o-mini
OPENAI_EMBEDDING_MODEL=text-embedding-3-small

# ──── OAuth ────
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# ──── File Storage (DigitalOcean Spaces) ────
S3_ENDPOINT=https://nyc3.digitaloceanspaces.com
S3_BUCKET=studymate-uploads
S3_ACCESS_KEY=your-spaces-access-key
S3_SECRET_KEY=your-spaces-secret-key
S3_REGION=nyc3
MAX_FILE_SIZE_MB=20

# ──── Email (Resend) ────
RESEND_API_KEY=re_your-resend-api-key
EMAIL_FROM=noreply@rizzearch.tech

# ──── Monitoring (Sentry) ────
SENTRY_DSN=https://examplePublicKey@o0.ingest.sentry.io/0
SENTRY_ENVIRONMENT=production

# ──── App ────
FRONTEND_URL=https://rizzearch.tech
BACKEND_URL=https://api.rizzearch.tech
```

---

## 16. Cost Estimation & GitHub Student Pack

### GitHub Student Developer Pack — Services Used

| Service | Benefit | What We Use It For |
|---------|---------|--------------------|
| **Neon** | Free PostgreSQL (0.5 GB storage, autoscaling) | Primary database + pgvector |
| **DigitalOcean** | $200 in credits (valid 12 months) | Backend hosting (App Platform) + Spaces file storage |
| **Namecheap / .tech** | Free domain for 1 year | `rizzearch.tech` production domain |
| **Sentry** | 500K events/month free | Error tracking + performance monitoring |
| **GitHub Copilot** | Free for students | AI-assisted development |
| **GitHub Actions** | 2,000 CI/CD minutes/month free | Automated testing & deployment |

### Monthly Cost Breakdown (Production)

| Service | Cost | Notes |
|---------|------|-------|
| **Vercel** (frontend) | $0 | Free tier (100GB bandwidth, unlimited deploys) |
| **Neon** (PostgreSQL) | $0 | Free tier (0.5GB storage, auto-suspend) |
| **Upstash** (Redis) | $0 | Free tier (10K commands/day) |
| **DigitalOcean** (backend) | ~$12/mo | Basic App Platform (covered by $200 credits) |
| **DO Spaces** (file storage) | $5/mo | 250GB storage (covered by credits) |
| **Resend** (email) | $0 | Free tier (3K emails/month) |
| **Sentry** (monitoring) | $0 | Free via Student Pack |
| **Cloudflare** (CDN/DNS) | $0 | Free tier |
| **Domain** (.tech) | $0 | Free via Student Pack |
| **OpenAI API** | ~$2-5/mo | GPT-4o-mini is very cheap; depends on usage |
| | | |
| **Total** | **~$2-5/mo** | Only OpenAI costs real money; infra is $0 for ~16 months |

> **Note:** The $200 DigitalOcean credits cover ~16 months of backend hosting at $12/mo. After credits expire, consider migrating to Railway ($5/mo) or Render free tier.

---

## 17. Development Phases

### Phase 1: Foundation (Week 1-2)
- [x] Project setup (monorepo structure, Docker Compose)
- [ ] Provision infrastructure (Neon DB, Upstash Redis, DO Spaces, Sentry)
- [ ] Database schema + Alembic migrations (with pgvector extension)
- [ ] User authentication (register, login, JWT, refresh tokens)
- [ ] Basic Next.js layout (sidebar, header, theme toggle)
- [ ] Landing page
- [ ] Sentry integration (frontend + backend)
- [ ] Health check endpoints (`/health`, `/health/ready`)

### Phase 2: Core Notes (Week 3-4)
- [ ] Note CRUD API (FastAPI endpoints)
- [ ] TipTap rich text editor integration
- [ ] Notebook/folder management
- [ ] Tags system
- [ ] Full-text search (PostgreSQL `tsvector`)
- [ ] Auto-save (debounced)
- [ ] S3 avatar upload for user profiles

### Phase 3: Document Processing (Week 5)
- [ ] File upload to DigitalOcean Spaces (S3) via presigned URLs
- [ ] Text extraction pipeline (Celery + PyPDF2 + python-docx)
- [ ] Upload UI with drag-and-drop + progress
- [ ] Document viewer (in-app preview)
- [ ] File security (MIME validation, magic bytes, size limits)

### Phase 4: AI Features (Week 6-7)
- [ ] AI summarization endpoint + UI
- [ ] Flashcard generation from notes
- [ ] Quiz generation from notes
- [ ] Key concepts extraction
- [ ] "Explain Like I'm 5" feature
- [ ] Token management & cost optimization
- [ ] AI response caching in Redis
- [ ] Generate embeddings on note save (background task)

### Phase 5: Flashcard System (Week 8)
- [ ] Flashcard deck CRUD
- [ ] Flip-card study interface
- [ ] SM-2 spaced repetition algorithm
- [ ] Review scheduling & due cards
- [ ] Manual card creation
- [ ] Celery Beat: daily spaced repetition email reminders

### Phase 6: Quiz Engine (Week 9)
- [ ] Quiz display (MCQ, T/F, Fill-in-the-blank)
- [ ] Timed quiz mode
- [ ] Scoring & instant feedback
- [ ] Quiz attempt history
- [ ] Results analytics

### Phase 7: Chat with Notes (Week 10)
- [ ] pgvector embedding storage + HNSW index
- [ ] RAG retrieval pipeline (embed query → top-K chunks → GPT)
- [ ] Streaming chat responses (SSE)
- [ ] Chat UI component with citation highlights
- [ ] Conversation history (stored in DB)

### Phase 8: Dashboard & Analytics (Week 11)
- [ ] Study dashboard with stat cards
- [ ] Activity heatmap (GitHub-style)
- [ ] Study time tracking
- [ ] Quiz performance trends
- [ ] Flashcard mastery progress
- [ ] AI-generated weekly study report (Celery Beat + Resend email)

### Phase 9: Polish & Deploy (Week 12)
- [ ] Responsive design audit & fixes
- [ ] Keyboard shortcuts (navigation + study modes)
- [ ] Loading states, skeleton loaders & error boundaries
- [ ] GitHub Actions CI/CD (lint, test, build, deploy)
- [ ] Deploy frontend to Vercel
- [ ] Deploy backend to DigitalOcean App Platform
- [ ] Cloudflare DNS setup + SSL
- [ ] README with screenshots, demo GIF & architecture diagram
- [ ] Final security audit (headers, rate limits, CORS)

---

## 18. Future Enhancements

| Feature | Description |
|---------|-------------|
| **Collaborative Notes** | Real-time collaborative editing (WebSocket + CRDT via Yjs) |
| **Study Groups** | Share decks/quizzes with study groups, leaderboard |
| **Voice Notes** | Record audio → Whisper API transcription → process with AI |
| **Browser Extension** | Clip web content directly into Rizzearch (Chrome/Firefox) |
| **Mobile App** | React Native or Expo companion app with offline flashcards |
| **Export** | Export notes as PDF, flashcards as Anki `.apkg` deck |
| **Offline Mode** | PWA with service worker for offline studying + sync |
| **Multi-language** | Support notes/AI in multiple languages (i18n) |
| **Integrations** | Google Drive, Notion, Obsidian, and Markdown file import |
| **Custom AI Models** | Support local LLMs (Ollama) for privacy-conscious users |
| **AI Tutor Mode** | Socratic method — AI asks questions to test understanding |
| **Notion-style Blocks** | Block-based editor (headings, callouts, toggles, embeds) |
| **Public Study Library** | Share & discover community-created decks and quizzes |

---

## Summary

**Rizzearch** is a comprehensive, production-grade full-stack application that showcases:

| Skill | How It's Demonstrated |
|-------|----------------------|
| **Full-Stack Architecture** | Next.js frontend + FastAPI backend + PostgreSQL |
| **AI/LLM Integration** | OpenAI API, prompt engineering, RAG with pgvector |
| **Vector Search & Embeddings** | pgvector HNSW index, cosine similarity retrieval |
| **Real-time Processing** | Celery background tasks, SSE streaming, async operations |
| **Authentication** | JWT + OAuth (Google, GitHub), refresh token rotation |
| **Database Design** | Normalized schema, full-text search, vector search, migrations |
| **Algorithm Implementation** | SM-2 spaced repetition |
| **Cloud Storage** | S3-compatible file uploads (DigitalOcean Spaces) |
| **File Processing** | PDF/DOCX parsing, text extraction, chunking |
| **State Management** | Zustand + TanStack Query |
| **UI/UX** | Rich editor, dark mode, responsive, animations |
| **Security** | Rate limiting, CORS, file validation, security headers |
| **DevOps** | Docker, CI/CD, Vercel + DO App Platform deployment |
| **Monitoring** | Sentry error tracking, structured logging, health checks |
| **Testing** | Unit tests (Pytest, Vitest), E2E (Playwright) |
| **API Design** | RESTful, versioned, documented (Swagger/OpenAPI) |

> **This is a portfolio project that proves you can build real software.**

---

*Blueprint created: February 22, 2026*
*Developer: Raver Miradora (@Raver-Miradora)*
