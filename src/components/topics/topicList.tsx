import Link from "next/link";

import Chip from "@mui/material/Chip";

import { db } from "@/db";

import paths from "@/paths";

export const TopicList = async () => {
  const topics = await db.topic.findMany();

  return (
    <div className="flex flex-row flex-wrap gap-2">
      {topics.map((topic) => (
        <Link key={topic.id} href={paths.topicShow(topic.slug)}>
          <Chip label={topic.slug} color="warning" clickable />
        </Link>
      ))}
    </div>
  );
};
