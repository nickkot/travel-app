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
      <h4 className="text-sm font-medium text-brand-text-secondary">
        {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
      </h4>

      {/* Comment list */}
      <div className="space-y-3">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-brand-navy/10 flex-shrink-0 flex items-center justify-center text-brand-navy text-xs font-bold">
              {comment.author.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-medium text-brand-text">
                  {comment.author.name}
                </span>
                <span className="text-xs text-brand-text-muted">
                  {formatDate(comment.createdAt)}
                </span>
              </div>
              <p className="text-sm text-brand-text-secondary">{comment.content}</p>
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
          className="flex-1 px-3 py-2 bg-brand-surface border border-brand-border rounded-lg text-sm focus:outline-none focus:border-brand-navy transition-colors text-brand-text"
        />
        <button
          type="submit"
          disabled={isLoading || !newComment.trim()}
          className="px-4 py-2 bg-brand-navy text-parchment font-medium rounded-lg text-sm hover:bg-brand-navy-hover transition-colors disabled:opacity-50"
        >
          Post
        </button>
      </form>
    </div>
  );
}
