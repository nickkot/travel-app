"use client";

import { useState } from "react";
import { formatDate } from "@/lib/utils";

interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  author: { name: string; username: string; avatarUrl: string | null };
}

interface CommentThreadProps {
  comments: Comment[];
  onSubmit: (content: string) => void;
  isLoading?: boolean;
}

export function CommentThread({
  comments,
  onSubmit,
  isLoading,
}: CommentThreadProps) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onSubmit(newComment.trim());
      setNewComment("");
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-foreground/70">
        {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
      </h4>

      {/* Comment list */}
      <div className="space-y-3">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-accent/20 flex-shrink-0 flex items-center justify-center text-accent text-xs font-bold">
              {comment.author.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-medium">
                  {comment.author.name}
                </span>
                <span className="text-xs text-foreground/40">
                  {formatDate(comment.createdAt)}
                </span>
              </div>
              <p className="text-sm text-foreground/70">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* New comment form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 px-3 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-accent transition-colors"
        />
        <button
          type="submit"
          disabled={isLoading || !newComment.trim()}
          className="px-4 py-2 bg-accent text-black font-medium rounded-lg text-sm hover:bg-accent/90 transition-colors disabled:opacity-50"
        >
          Post
        </button>
      </form>
    </div>
  );
}
