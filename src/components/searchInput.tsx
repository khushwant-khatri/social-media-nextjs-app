"use client";

import { TextField } from "@mui/material";

import { useSearchParams } from "next/navigation";

import { search } from "@/actions";

export const SearchInput = () => {
  const searchParams = useSearchParams();

  return (
    <form action={search}>
      <TextField
        name="term"
        placeholder="Search..."
        fullWidth
        size="small"
        defaultValue={searchParams.get("term") || ""}
      />
    </form>
  );
};
