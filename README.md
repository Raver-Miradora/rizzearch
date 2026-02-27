# 🔬 Rizzearch

> **AI-Powered Study & Note Assistant** — Upload your notes, and let AI summarize, generate flashcards, create quizzes, and supercharge your learning.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)

---

## ✨ Features

- 📝 **Rich Note Editor** — TipTap-based Markdown editor with live preview & auto-save
- 📋 **Smart Summaries** — AI-generated concise summaries from your notes
- 🗂️ **Flashcard Generation** — Auto-create Q&A flashcards with spaced repetition (SM-2)
- ❓ **Quiz Generation** — MCQ, True/False, and Fill-in-the-blank from your content
- 💬 **Chat with Notes** — RAG-based Q&A with citations using pgvector
- 📤 **Document Upload** — Drag-and-drop PDF, DOCX, TXT with background processing
- 📊 **Study Dashboard** — Streaks, heatmap, quiz trends, and flashcard mastery
- 🌙 **Dark/Light Mode** — System-aware theme with persistence

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, Zustand, TanStack Query |
| **Backend** | FastAPI, SQLAlchemy 2.0, Pydantic v2, Celery, Redis |
| **AI** | OpenAI GPT-4o-mini, text-embedding-3-small, LangChain, pgvector |
| **Database** | PostgreSQL 16 (Neon), Redis (Upstash), pgvector |
| **Storage** | DigitalOcean Spaces (S3-compatible) |
| **DevOps** | Docker, GitHub Actions, Vercel, DigitalOcean App Platform |
| **Monitoring** | Sentry, Resend (email), Cloudflare |

## 📁 Project Structure

```
rizzearch/
├── client/          # Next.js 15 frontend
├── server/          # FastAPI backend
├── docker/          # Docker & Compose configs
├── .github/         # CI/CD workflows
├── BLUEPRINT.md     # Full project blueprint
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+
- **Python** 3.12+
- **Docker** & Docker Compose
- **OpenAI API Key**

### Creating a Test Account

No users are seeded by default. you can create one via the API or a helper
script:

```bash
cd server
# requires python on your PATH; see prerequisites above
python scripts/create_test_user.py
```

That will insert `admin@rizzearch.test` / `password123` if no such user
already exists. alternatively POST to `/api/v1/auth/register` using Postman
or the frontend.

### Quick Start (Docker)

```bash
# Clone the repo
git clone https://github.com/Raver-Miradora/rizzearch.git
cd rizzearch

# Copy environment variables
cp .env.example .env
# Edit .env with your API keys

# Start all services
docker compose -f docker/docker-compose.yml up -d

# Frontend: http://localhost:3000
# Backend:  http://localhost:8000
# API Docs: http://localhost:8000/docs
```

### Local Development

```bash
# Backend
cd server
python -m venv .venv
.venv/Scripts/activate   # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

# Frontend
cd client
npm install
npm run dev
```

##  Author

**Raver Miradora** — [@Raver-Miradora](https://github.com/Raver-Miradora)

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
