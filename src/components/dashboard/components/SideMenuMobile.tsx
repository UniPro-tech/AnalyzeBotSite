"use client";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer, { drawerClasses } from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { User } from "better-auth";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import CardAlert from "./CardAlert";
import MenuContent from "./MenuContent";

interface SideMenuMobileProps {
  open: boolean | undefined;
  toggleDrawer: (newOpen: boolean) => () => void;
  user: User;
}

export default function SideMenuMobile({
  open,
  toggleDrawer,
  user,
}: SideMenuMobileProps) {
  const router = useRouter();
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: "none",
          backgroundColor: "background.paper",
        },
      }}
    >
      <Stack
        sx={{
          maxWidth: "70dvw",
          height: "100%",
        }}
      >
        <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1 }}>
          <Stack
            direction="row"
            sx={{ gap: 1, alignItems: "center", flexGrow: 1, p: 1 }}
          >
            <Avatar
              sizes="small"
              alt={user.name}
              src={user.image || undefined}
              sx={{ width: 24, height: 24 }}
            />
            <Typography component="p" variant="h6">
              {user.name}
            </Typography>
          </Stack>
          {/*
          <MenuButton showBadge>
            <NotificationsRoundedIcon />
          </MenuButton>
          */}
        </Stack>
        <Divider />
        <Stack sx={{ flexGrow: 1 }}>
          <MenuContent />
          <Divider />
        </Stack>
        <CardAlert />
        <Stack sx={{ p: 2 }}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<LogoutRoundedIcon />}
            onClick={async () => {
              await authClient.signOut();
              router.push("/login");
            }}
          >
            ログアウト
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}
