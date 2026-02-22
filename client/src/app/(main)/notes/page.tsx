import type { Metadata } from "next";
import { NotesPageContent } from "./notes-content";

export const metadata: Metadata = {
  title: "Notes",
};

export default function NotesPage() {
  return <NotesPageContent />;
}
