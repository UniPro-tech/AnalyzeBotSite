import { Stack } from "@mui/material";
import SignInSide from "@/components/sign-in-side/SignInSide";

export default function SigninPage() {
  return (
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <SignInSide />
    </Stack>
  );
}
