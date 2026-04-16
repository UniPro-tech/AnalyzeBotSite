"use client";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import type {} from "@mui/x-charts/themeAugmentation";
import type {} from "@mui/x-date-pickers/themeAugmentation";
import type {} from "@mui/x-tree-view/themeAugmentation";
import type { Session, User } from "better-auth";
import type React from "react";
import type { Guild } from "@/types/discord";
import AppTheme from "../shared-theme/AppTheme";
import AppNavbar from "./components/AppNavbar";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import Copyright from "./internals/components/Copyright";
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from "./theme/customizations";

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function Dashboard(props: {
  disableCustomTheme?: boolean;
  session: Session;
  user: User;
  guilds: Guild[];
  currentId: string;
  children: React.ReactNode;
  isPremiumUser?: boolean;
}) {
  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu
          user={props.user}
          guilds={props.guilds}
          currentId={props.currentId}
          isPremiumUser={props.isPremiumUser}
        />
        <AppNavbar user={props.user} />
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: "auto",
            minHeight: "100vh",
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
              minHeight: "100vh",
            }}
          >
            <Header />
            {props.children}
            <Copyright sx={{ my: 4 }} />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
