
import { Box, CircularProgress } from "@mui/material";
import { useEffect } from "react";

function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default Loader;
