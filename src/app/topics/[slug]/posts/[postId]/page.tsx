import Link from "next/link";

import paths from "@/paths";

import PostShow from "@/components/posts/postShow";

import CommentCreateForm from "@/components/comments/commentCreateForm";

import CommentList from "@/components/comments/commentList";

import { fetchCommentByPostId } from "@/db/queries/comments";
import { Suspense } from "react";
import { PostShowLoading } from "@/components/posts/postShowLoading";

interface PostShowPageProps {
  params: Promise<{
    slug: string;
    postId: string;
  }>;
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = await params;

  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={paths.topicShow(slug)}>
        {"< "}Back to {slug}
      </Link>
      <Suspense fallback={<PostShowLoading />}>
        {" "}
        <PostShow postId={postId} />
      </Suspense>

      <CommentCreateForm postId={postId} startOpen />

      <CommentList postId={postId} />
    </div>
  );
}
