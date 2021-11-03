import React from "react";
import { Box } from "@material-ui/core";
import NewBackround from "../organism/NewBackround.jpg";
import HalfBack from "../organism/HalfBack.jpg";
import WebBack from "../organism/WebBack.png";

import { makeStyles } from "@material-ui/core/styles";

function Template({ children }) {
  return (
    <Box
      //   width="100%"
      //   height="100%"
      style={{
        minWidth: "100wh",
        minHeight: "100vh",
        backgroundImage: `url(${HalfBack})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        overflow: "auto",
        // height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </Box>
  );
}

export default Template;
