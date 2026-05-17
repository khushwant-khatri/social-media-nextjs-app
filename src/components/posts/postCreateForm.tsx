"use client";

import { useActionState, useState, useTransition } from "react";

import { TextField, Button, Popover, Typography } from "@mui/material";

import { FormButton } from "@/components/common/formButton";

import * as actions from "@/actions";

interface PostCreateFormProps {
  topicId: string;
}

export default function PostCreateForm({ topicId }: PostCreateFormProps) {
  const [formState, action] = useActionState(actions.createPost, {
    errors: {},
  });

  const [isPending, startTransition] = useTransition();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    startTransition(() => {
      action(formData);
    });
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Create Post
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <form className="w-[420px]" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5 p-6">
            <div>
              <Typography variant="h5">Create a Post</Typography>

              <Typography color="text.secondary">
                Start a new discussion post
              </Typography>
            </div>

            <TextField
              name="title"
              label="Post Title"
              fullWidth
              error={!!formState.errors.title}
              helperText={formState.errors.title?.join(", ")}
            />

            <TextField
              name="content"
              label="Description"
              multiline
              rows={4}
              fullWidth
              error={!!formState.errors.content}
              helperText={formState.errors.content?.join(", ")}
            />

            <input type="hidden" name="topicId" value={topicId} />

            {formState.errors._form && (
              <div className="p-3 bg-red-100 border border-red-400 rounded text-red-600">
                {formState.errors._form.join(", ")}
              </div>
            )}

            <FormButton isPending={isPending}>Create Post</FormButton>
          </div>
        </form>
      </Popover>
    </div>
  );
}
