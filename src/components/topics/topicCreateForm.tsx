"use client";

import { TextField, Button, Popover, Typography } from "@mui/material";
import { useState } from "react";
import { useActionState } from "react";
import { useTransition } from "react";
import * as actions from "@/actions";
import { FormButton } from "../common/formButton";

export const TopicCreateForm = () => {
  const [formState, action] = useActionState(actions.createTopic, {
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
    <div className="flex justify-center">
      <Button variant="contained" onClick={handleOpen}>
        Create a Topic
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
        <form className="w-105" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5 p-6">
            <div>
              <Typography variant="h5">Create a Topic</Typography>

              <Typography color="text.secondary">
                Start a new discussion topic
              </Typography>
            </div>

            <TextField
              name="name"
              label="Topic Name"
              fullWidth
              error={!!formState.errors.name}
              helperText={formState.errors.name?.join(", ")}
            />

            <TextField
              name="description"
              label="Description"
              multiline
              rows={4}
              fullWidth
              error={!!formState.errors.description}
              helperText={formState.errors.description?.join(", ")}
            />

            {formState.errors._form && (
              <div className="p-3 bg-red-100 border border-red-400 rounded text-red-600">
                {formState.errors._form.join(", ")}
              </div>
            )}

            <FormButton isPending={isPending}>Save</FormButton>
          </div>
        </form>
      </Popover>
    </div>
  );
};
