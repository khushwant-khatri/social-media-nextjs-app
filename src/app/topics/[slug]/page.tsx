import { notFound } from "next/navigation";

import PostCreateForm from "@/components/posts/postCreateForm";

import PostList from "@/components/posts/postList";

import { fetchPostsByTopicSlug } from "@/db/queries/post";

import { db } from "@/db";

interface TopicShowPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug } = await params;

  const topic = await db.topic.findUnique({
    where: {
      slug,
    },
  });

  if (!topic) {
    return notFound();
  }

  const posts = await fetchPostsByTopicSlug(slug);

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{topic.slug}</h1>

        <p className="text-gray-600 mb-4">{topic.description}</p>

        <PostList posts={posts} />
      </div>

      <div>
        <PostCreateForm topicId={topic.id} />
      </div>
    </div>
  );
}
