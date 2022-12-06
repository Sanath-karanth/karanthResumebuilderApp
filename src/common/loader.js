import React, { memo } from "react";
import "../css/loader.css";

const Loader = memo(() => {
  return (
    <div className="loader-wrapper">
      <div className="loader-component" />
      <p className="loadingtext">Loading...</p>
    </div>
  );
});

export default memo(Loader);
