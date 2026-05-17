import { redirect } from "next/navigation";

import PostList from "@/components/posts/postList";

import { fetchPostBySearchTerm } from "@/db/queries/post";

interface SearchPageProps {
  searchParams: Promise<{
    term?: string;
  }>;
}

export default async function Page({ searchParams }: SearchPageProps) {
  const { term } = await searchParams;

  if (!term) {
    redirect("/");
  }

  const posts = await fetchPostBySearchTerm(term);

  return (
    <div>
      <PostList posts={posts} />
    </div>
  );
}
