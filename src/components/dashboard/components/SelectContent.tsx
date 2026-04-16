"use client";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import MuiAvatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import MuiListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import MenuItem from "@mui/material/MenuItem";
import Select, {
  type SelectChangeEvent,
  selectClasses,
} from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import * as React from "react";
import type { Guild } from "@/types/discord";

const Avatar = styled(MuiAvatar)(({ theme }) => ({
  width: 28,
  height: 28,
  backgroundColor: (theme.vars || theme).palette.background.paper,
  color: (theme.vars || theme).palette.text.secondary,
  border: `1px solid ${(theme.vars || theme).palette.divider}`,
}));

const ListItemAvatar = styled(MuiListItemAvatar)({
  minWidth: 0,
  marginRight: 12,
});

const DISCORD_ICON_URI = `https://cdn.discordapp.com/icons/`;

export default function SelectContent(props: {
  currentId: string;
  guilds: Guild[];
}) {
  const ownGuilds = props.guilds.filter((guild) => BigInt(guild.permissions));
  const notOwnGuilds = props.guilds.filter((guild) => !guild.owner);
  const [company, setCompany] = React.useState(
    ownGuilds[0].id || notOwnGuilds[0].id || "Add",
  );

  const handleChange = (event: SelectChangeEvent) => {
    setCompany(event.target.value as string);
  };

  return (
    <Select
      labelId="company-select"
      id="company-simple-select"
      value={company}
      onChange={handleChange}
      displayEmpty
      inputProps={{ "aria-label": "Select company" }}
      fullWidth
      sx={{
        maxHeight: 56,
        width: 215,
        "&.MuiList-root": {
          p: "8px",
        },
        [`& .${selectClasses.select}`]: {
          display: "flex",
          alignItems: "center",
          gap: "2px",
          pl: 1,
        },
      }}
    >
      {ownGuilds.length !== 0 && (
        <ListSubheader sx={{ pt: 0 }}>Owner</ListSubheader>
      )}
      {ownGuilds.map((guild) => (
        <MenuItem value={guild.id} key={guild.id}>
          <ListItemAvatar>
            <Avatar
              alt={guild.name}
              src={
                guild.icon &&
                `${DISCORD_ICON_URI}/${guild.id}/${guild.icon}.png`
              }
            />
          </ListItemAvatar>
          <ListItemText primary={guild.name} secondary={guild.name} />
        </MenuItem>
      ))}
      {notOwnGuilds.length !== 0 && <ListSubheader>Member</ListSubheader>}
      {notOwnGuilds.map((guild) => (
        <MenuItem value={guild.id} key={guild.id}>
          <ListItemAvatar>
            <Avatar
              alt={guild.name}
              src={`${DISCORD_ICON_URI}/${guild.id}/${guild.icon}.png`}
            />
          </ListItemAvatar>
          <ListItemText primary={guild.name} secondary={guild.name} />
        </MenuItem>
      ))}
      <Divider sx={{ mx: -1 }} />
      <MenuItem value={"Add"}>
        <ListItemIcon>
          <AddRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="サーバーを追加" secondary="Botを導入する" />
      </MenuItem>
    </Select>
  );
}
