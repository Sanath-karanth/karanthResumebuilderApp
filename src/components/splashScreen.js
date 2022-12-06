import React, { memo, useEffect } from "react";
import "../css/Splashlottiestyle.css";
import animation from "../lotties/12549-document-check.json";
import Lottie from "lottie-react-web";
import { useNavigate } from "react-router-dom";

const SplashScreen = memo(() => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = window.setInterval(() => {
      navigate("/dashboard", { replace: false });
    }, 2000);
    return () => {
      window.clearInterval(timer);
    };
  }, [navigate]);

  return (
    <div className="AppLottie">
      <header className="AppLottie-header">
        <Lottie
          height={400}
          width={400}
          options={{
            animationData: animation,
          }}
        />
      </header>
    </div>
  );
});

export default memo(SplashScreen);
