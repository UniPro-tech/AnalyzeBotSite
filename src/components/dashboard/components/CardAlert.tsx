import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { authClient } from "@/lib/auth-client";

export default function CardAlert({
  isPremiumUser,
}: {
  isPremiumUser?: boolean;
}) {
  if (!isPremiumUser)
    return (
      <Card variant="outlined" sx={{ m: 1.5, flexShrink: 0 }}>
        <CardContent>
          <AutoAwesomeRoundedIcon fontSize="small" />
          <Typography gutterBottom sx={{ fontWeight: 600 }}>
            UniQUEを連携して
            <br />
            保存日数を増やす
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
            UniProメンバーであれば、保存期間が通常30日のところ、1年間に！
          </Typography>
          <Button
            variant="contained"
            size="small"
            fullWidth
            onClick={async () => {
              await authClient.linkSocial({
                provider: "unique",
                callbackURL: "/dashboard",
              });
            }}
          >
            今すぐ連携する
          </Button>
        </CardContent>
      </Card>
    );
}
