"use client";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/navigation";
import { enablePremium } from "./actions";

export default function PremiumSuggestCard({ guildId }: { guildId: string }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <InsightsRoundedIcon />
        <Typography
          component="h2"
          variant="subtitle2"
          gutterBottom
          sx={{ fontWeight: "600" }}
        >
          プレミアムを有効化できます！
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: "8px" }}>
          プレミアム機能を有効にすると、データ保存期間を1年に延長できます！
        </Typography>
        <Button
          variant="contained"
          size="small"
          color="primary"
          endIcon={<ChevronRightRoundedIcon />}
          fullWidth={isSmallScreen}
          onClick={async () => {
            await enablePremium(guildId);
            router.refresh();
          }}
        >
          有効化する
        </Button>
      </CardContent>
    </Card>
  );
}
