import React, { memo } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import SplashPage from "./components/splashScreen";
import DashboardPage from "./components/dashboardScreen";
import ResumeFormPage from "./components/resumeFormScreen";
import FeedbackPage from "./components/feedbackScreen";
import AboutPage from "./components/aboutScreen";
import ReviewPage from "./components/reviewScreen";
import DemoPage from "./components/demo";

const App = memo(() => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<SplashPage />}></Route>
        <Route path="dashboard" element={<DashboardPage />}></Route>
        <Route path="resumeform" element={<ResumeFormPage />}></Route>
        <Route path="feedback" element={<FeedbackPage />}></Route>
        <Route path="about" element={<AboutPage />}></Route>
        <Route path="review" element={<ReviewPage />}></Route>
        <Route path="demo" element={<DemoPage />}></Route>
      </Routes>
    </AuthProvider>
  );
});

export default memo(App);

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
