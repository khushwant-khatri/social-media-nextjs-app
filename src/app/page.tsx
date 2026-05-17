import { TopicCreateForm } from "@/components/topics/topicCreateForm";

import { TopicList } from "@/components/topics/topicList";

import PostList from "@/components/posts/postList";

import { fetchTopPosts } from "@/db/queries/post";

export default async function Home() {
  const posts = await fetchTopPosts();

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl m-2">Top Posts</h1>

        <PostList posts={posts} />
      </div>

      <div>
        <TopicCreateForm />

        <div className="border-t my-3" />

        <h3 className="text-lg font-semibold mb-2">Topic List</h3>

        <TopicList />
      </div>
    </div>
  );
}
