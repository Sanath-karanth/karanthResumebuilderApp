import React from 'react';
import Lottie from 'lottie-react-web'
import animation  from '../lotties/12549-document-check.json'
import '../css/Splashlottiestyle.css';
import { useNavigate  } from "react-router-dom";

const SplashScreen = () => {

    const navigate = useNavigate();

    React.useEffect(() => {
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
                animationData: animation
                }}
            />
            </header>
      </div>
    );
}

export default SplashScreen;