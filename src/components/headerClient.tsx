"use client";

import { Button, Avatar, Popover, Typography } from "@mui/material";

import { useSession, signIn, signOut } from "next-auth/react";

import { Suspense, useState } from "react";
import { SearchInput } from "./searchInput";

export default function HeaderClient() {
  const { data: session, status } = useSession();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex flex-1 items-center justify-end gap-4">
      <div className="max-w-md flex-1">
        <Suspense>
          <SearchInput />
        </Suspense>
      </div>

      {status === "loading" && <div>Loading...</div>}

      {status === "authenticated" && session.user && (
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">{session.user.name}</span>

          <Avatar
            onClick={handleOpen}
            sx={{
              cursor: "pointer",
            }}
          >
            {session.user.name?.charAt(0)}
          </Avatar>

          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <div className="p-4 flex flex-col gap-3 min-w-[220px]">
              <div>
                <Typography>{session.user.name}</Typography>

                <Typography variant="body2" color="text.secondary">
                  {session.user.email}
                </Typography>
              </div>

              <Button
                variant="outlined"
                color="error"
                onClick={() => signOut()}
              >
                Sign Out
              </Button>
            </div>
          </Popover>
        </div>
      )}

      {status === "unauthenticated" && (
        <>
          <Button variant="contained" onClick={() => signIn("github")}>
            Sign In
          </Button>

          <Button variant="outlined" onClick={() => signIn("github")}>
            Sign Up
          </Button>
        </>
      )}
    </div>
  );
}
