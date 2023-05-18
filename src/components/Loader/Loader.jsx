import React from "react";
import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <div className="loader__wrapper">
      <CircularProgress color="success" />
    </div>
  );
};

export default Loader;
