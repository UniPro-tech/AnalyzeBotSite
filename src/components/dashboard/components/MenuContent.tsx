"use client";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";

const mainListItems = [{ text: "ホーム", icon: <HomeRoundedIcon /> }];

const secondaryListItems = [
  //{ text: "設定", icon: <SettingsRoundedIcon /> },
  {
    text: "ダッシュボードについて",
    icon: <InfoRoundedIcon />,
    href: "/about#dashboard",
  },
  {
    text: "フィードバック",
    icon: <HelpRoundedIcon />,
    href: "https://uniproject.jp/discord",
  },
];

export default function MenuContent() {
  const router = useRouter();
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
            <ListItemButton selected={index === 0}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List dense>
        {secondaryListItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => {
                router.push(item.href);
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
