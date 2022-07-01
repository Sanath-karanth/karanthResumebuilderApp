import React, { memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ResumeFormScreen = memo(() => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { resumeid, resumename } = state;

  const backClick = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      <div>
        <button onClick={backClick}>Back</button>
      </div>
      <h2>{resumeid}</h2>
      <p>{resumename}</p>
    </div>
  );
});

export default ResumeFormScreen;
