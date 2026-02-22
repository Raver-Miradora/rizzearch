"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { useEffect } from "react";
import { EditorToolbar } from "./editor-toolbar";

interface NoteEditorProps {
  content: string;
  onChange: (html: string, plainText: string) => void;
  editable?: boolean;
}

export function NoteEditor({
  content,
  onChange,
  editable = true,
}: NoteEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Placeholder.configure({
        placeholder: "Start writing your notes…",
      }),
      Highlight,
      TaskList,
      TaskItem.configure({ nested: true }),
    ],
    content,
    editable,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm dark:prose-invert max-w-none min-h-[300px] px-4 py-3 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const text = editor.getText();
      onChange(html, text);
    },
  });

  // Sync content prop changes (e.g., switching notes)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <div className="rounded-lg border bg-background">
      {editable && <EditorToolbar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}
