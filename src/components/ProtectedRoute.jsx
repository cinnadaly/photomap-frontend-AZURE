import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    fetch("https://photomap-e0h6fnh3hxfscbc8.westus3-01.azurewebsites.net/dashboard", {
      credentials: "include"
    })
      .then(res => {
        console.log("STATUS:", res.status); //debug
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => setIsAuthenticated(false));
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  /*if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }*/

  return children;
}

export default ProtectedRoute;