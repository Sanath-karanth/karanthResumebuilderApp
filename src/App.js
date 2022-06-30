import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import SplashPage from "./components/splashScreen";
import DashboardPage from "./components/dashboardScreen";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<SplashPage />}></Route>
        <Route path="dashboard" element={<DashboardPage />}></Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;

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
