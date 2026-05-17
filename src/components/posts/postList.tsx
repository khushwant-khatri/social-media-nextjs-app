import Link from "next/link";

import paths from "@/paths";

import type { PostWithData } from "@/db/queries/post";

interface PostListProps {
  posts: PostWithData[];
}

export default function PostList({ posts }: PostListProps) {
  const renderedPosts = posts.map((post) => {
    return (
      <div
        key={post.id}
        className="border rounded p-4 hover:bg-gray-50 transition"
      >
        <Link href={paths.postShow(post.topic.slug, post.id)}>
          <h3 className="text-lg font-bold">{post.title}</h3>

          <div className="flex flex-row gap-8 mt-2">
            <p className="text-xs text-gray-400">By {post.user.name}</p>

            <p className="text-xs text-gray-400">
              {post._count.comments} comments
            </p>
          </div>
        </Link>
      </div>
    );
  });

  return <div className="space-y-2">{renderedPosts}</div>;
}
