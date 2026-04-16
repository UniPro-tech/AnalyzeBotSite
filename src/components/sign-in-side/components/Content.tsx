import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { SitemarkIcon } from "./CustomIcons";

const items = [
  {
    icon: <SettingsSuggestRoundedIcon sx={{ color: "text.secondary" }} />,
    title: "機械学習による自動データ分析",
    description:
      "Discordのメッセージの内容を自動で解析。複雑な分析作業を大幅に効率化し、すぐに結果を取得できます。",
  },
  {
    icon: <ConstructionRoundedIcon sx={{ color: "text.secondary" }} />,
    title: "柔軟な分析設定",
    description:
      "用途に応じて分析方法や範囲等をカスタマイズ可能。さまざまなシーンに対応します。",
  },
  {
    icon: <ThumbUpAltRoundedIcon sx={{ color: "text.secondary" }} />,
    title: "直感的で使いやすいUI",
    description:
      "専門知識がなくても使えるシンプルな設計。誰でもすぐに分析を始められます。",
  },
  {
    icon: <AutoFixHighRoundedIcon sx={{ color: "text.secondary" }} />,
    title: "インサイトの可視化",
    description:
      "分析結果をわかりやすく可視化。Discordのサーバーの情報を簡単に見える化します。",
  },
];

export default function Content() {
  return (
    <Stack
      sx={{
        flexDirection: "column",
        alignSelf: "center",
        gap: 4,
        maxWidth: 450,
      }}
    >
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <SitemarkIcon />
      </Box>
      {items.map((item) => (
        <Stack key={item.title} direction="row" sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: "medium" }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
}
