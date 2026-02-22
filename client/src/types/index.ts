// ============================================================
// Rizzearch - Shared TypeScript Types
// ============================================================

// ---------- User ----------
export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  is_active: boolean;
  is_verified: boolean;
  oauth_provider: string | null;
  created_at: string;
  updated_at: string;
}

// ---------- Auth ----------
export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  full_name: string;
}

// ---------- Note ----------
export interface Note {
  id: string;
  title: string;
  content: string;
  content_plain: string;
  summary: string | null;
  is_favorite: boolean;
  is_pinned: boolean;
  is_archived: boolean;
  share_token: string | null;
  notebook_id: string | null;
  user_id: string;
  tags: Tag[];
  created_at: string;
  updated_at: string;
}

export interface NoteCreate {
  title: string;
  content: string;
  content_plain?: string;
  notebook_id?: string | null;
  tag_ids?: string[];
}

export interface NoteUpdate {
  title?: string;
  content?: string;
  content_plain?: string;
  notebook_id?: string | null;
  is_favorite?: boolean;
  is_archived?: boolean;
  tag_ids?: string[];
}

// ---------- Notebook ----------
export interface Notebook {
  id: string;
  name: string;
  description: string | null;
  color: string;
  icon: string;
  parent_id: string | null;
  user_id: string;
  note_count: number;
  children: Notebook[];
  created_at: string;
  updated_at: string;
}

export interface NotebookCreate {
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  parent_id?: string | null;
}

// ---------- Tag ----------
export interface Tag {
  id: string;
  name: string;
  color: string;
  user_id: string;
}

export interface TagCreate {
  name: string;
  color?: string;
}

// ---------- Document ----------
export interface Document {
  id: string;
  original_filename: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  status: "pending" | "processing" | "completed" | "failed";
  extracted_text: string | null;
  note_id: string;
  user_id: string;
  created_at: string;
}

// ---------- Flashcard ----------
export interface FlashcardDeck {
  id: string;
  name: string;
  description: string | null;
  card_count: number;
  due_count: number;
  user_id: string;
  note_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  ease_factor: number;
  interval: number;
  repetitions: number;
  next_review: string;
  deck_id: string;
}

export interface FlashcardCreate {
  front: string;
  back: string;
}

// ---------- Quiz ----------
export interface Quiz {
  id: string;
  title: string;
  quiz_type: "multiple_choice" | "true_false" | "short_answer";
  question_count: number;
  note_id: string | null;
  user_id: string;
  created_at: string;
}

export interface QuizQuestion {
  id: string;
  question_text: string;
  question_type: string;
  options: string[] | null;
  correct_answer: string;
  explanation: string | null;
  order: number;
}

export interface QuizAttempt {
  id: string;
  quiz_id: string;
  score: number;
  total_questions: number;
  time_taken_seconds: number;
  completed_at: string;
}

// ---------- Analytics ----------
export interface DashboardOverview {
  total_notes: number;
  total_flashcards: number;
  total_quizzes: number;
  study_streak: number;
  notes_this_week: number;
  review_accuracy: number;
  upcoming_reviews: number;
}

export interface StudySession {
  id: string;
  session_type: "flashcard" | "quiz";
  duration_seconds: number;
  cards_reviewed: number;
  correct_count: number;
  created_at: string;
}

// ---------- AI / Chat ----------
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: NoteCitation[];
  created_at: string;
}

export interface NoteCitation {
  note_id: string;
  note_title: string;
  chunk: string;
  similarity: number;
}

// ---------- API ----------
export interface ApiError {
  detail: string;
  status_code: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}
