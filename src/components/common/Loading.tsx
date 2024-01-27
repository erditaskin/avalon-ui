import { CircularProgress, Stack } from "@mui/material";

interface IProps {
  height?: number | string;
}

const Loading = ({ height }: IProps) => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ width: 1, height: height ? height : "100vh" }}
    >
      <CircularProgress />
    </Stack>
  );
};

export default Loading;
