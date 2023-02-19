// Description: This is the main component of the application. It is the parent component of all other components. 

import ProjectRoutes from "./ProjectRoutes";
import Navigation from "./Navigation";
import Background from "./Background";
import AuthProvider from "../contexts/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <>
      <Background />
      <AuthProvider>
        <Router>
          <Navigation />
          <ProjectRoutes />
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
