import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export default function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      align="center"
      {...props}
      sx={[
        {
          color: "text.secondary",
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      {"Copyright © "}
      {new Date().getFullYear() > 2026
        ? `2026-${new Date().getFullYear()}`
        : "2026"}
      <Link color="inherit" href="https://mui.com/">
        デジタル創作サークルUniProject
      </Link>{" "}
      {new Date().getFullYear()}
      {"All rights reserved."}
    </Typography>
  );
}
