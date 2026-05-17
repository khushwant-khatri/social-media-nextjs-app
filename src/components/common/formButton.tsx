"use client";

import { Button, CircularProgress } from "@mui/material";

interface FormButtonProps {
  children: React.ReactNode;
  isPending: boolean;
}

export const FormButton = ({ children, isPending }: FormButtonProps) => {
  return (
    <Button type="submit" variant="contained" fullWidth disabled={isPending}>
      <div className="flex items-center gap-2">
        {isPending && <CircularProgress size={18} color="inherit" />}

        {isPending ? "Saving..." : children}
      </div>
    </Button>
  );
};
