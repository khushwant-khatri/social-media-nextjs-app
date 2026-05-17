"use server";

import { z } from "zod";

import { auth } from "@/auth";

import { redirect } from "next/navigation";

import { db } from "@/db";

import paths from "@/paths";

import { revalidatePath } from "next/cache";

import type { Post } from "@prisma/client";

const createPostSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters",
  }),

  content: z.string().min(10, {
    message: "Content must be at least 10 characters",
  }),

  topicId: z.string(),
});

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    topicId?: string[];
    _form?: string[];
  };
}

export const createPost = async (
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> => {
  const result = createPostSchema.safeParse({
    title: formData.get("title"),

    content: formData.get("content"),

    topicId: formData.get("topicId"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();

  if (!session?.user?.id) {
    return {
      errors: {
        _form: ["You must be signed in "],
      },
    };
  }

  const topic = await db.topic.findUnique({
    where: {
      id: result.data.topicId,
    },
  });

  if (!topic) {
    return {
      errors: {
        _form: ["Topic not found"],
      },
    };
  }

  let post: Post;

  try {
    post = await db.post.create({
      data: {
        title: result.data.title,

        content: result.data.content,

        userId: session.user.id,

        topicId: result.data.topicId,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    }

    return {
      errors: {
        _form: ["Something went wrong"],
      },
    };
  }
  // TODO: Revalidate the topic show page
  revalidatePath("/");

  redirect(paths.postShow(topic.slug, post.id));
};
