"use client";

import { useActionState, useEffect, useRef, useState } from "react";

import { TextField, Button } from "@mui/material";

import { FormButton } from "@/components/common/formButton";

import * as actions from "@/actions";

interface CommentCreateFormProps {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
}

export default function CommentCreateForm({
  postId,
  parentId,
  startOpen = false,
}: CommentCreateFormProps) {
  const [open, setOpen] = useState(startOpen);

  const ref = useRef<HTMLFormElement | null>(null);

  const [formState, action] = useActionState(
    actions.createComment.bind(null, {
      postId,
      parentId,
    }),
    {
      errors: {},
      success: false,
    }
  );

  useEffect(() => {
    if (formState.success) {
      ref.current?.reset();

      if (!startOpen) {
        setOpen(false);
      }
    }
  }, [formState, startOpen]);

  const form = (
    <form action={action} ref={ref}>
      <div className="space-y-3 px-1 m-3 flex flex-col gap-4">
        <TextField
          name="content"
          label="Reply"
          placeholder="Enter your comment"
          multiline
          rows={3}
          fullWidth
          error={!!formState.errors.content}
          helperText={formState.errors.content?.join(", ")}
        />

        {formState.errors._form && (
          <div className="p-3 bg-red-100 border rounded border-red-400 text-red-600">
            {formState.errors._form.join(", ")}
          </div>
        )}

        <FormButton isPending={false}>Create Comment</FormButton>
      </div>
    </form>
  );

  return (
    <div>
      <Button size="small" variant="text" onClick={() => setOpen(!open)}>
        Reply
      </Button>

      {open && form}
    </div>
  );
}
