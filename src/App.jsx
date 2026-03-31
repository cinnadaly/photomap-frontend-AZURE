import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import logo from './assets/logo.PNG';
import ProtectedRoute from "./components/ProtectedRoute";
import { useNavigate } from "react-router-dom";

function App() {

  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  /*
  useEffect(() => {
    fetch("http://localhost:5555/dashboard", {
      credentials: "include"
    })
      .then(res => {
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => setIsAuthenticated(false));
  }, []);*/
  useEffect(() => {
  fetch("http://localhost:5555/me", {
    credentials: "include"
  })
    .then(res => {
      if (!res.ok) {
        setIsAuthenticated(false);
        return null;
      }
      return res.json();
    })
    .then(data => {
      if (data) {
        setUser(data);
        setIsAuthenticated(true);
      }
    })
    .catch(() => setIsAuthenticated(false));
}, []);

  const handleLogout = async () => {
    fetch('http://localhost:5555/logout', {
          method: 'POST',
          credentials: 'include',
        })
        .then((response) => {
          if(response.ok){
            setIsAuthenticated(false);
            navigate("/login");
          }
        })
        .catch((error) => console.log("error to login " + error));
  }

  return (
  <>

      <>
        <header>
          <img src={logo} className='logo' alt="" />
          <nav>
              {isAuthenticated && (
                <>
                  <Link to="/"><a>Map</a></Link>{' '}
                  <Link to="/dashboard">Dashboard</Link>
                  <Link to="/profile"><a>Profile</a></Link>{' '}
                  <Link onClick={handleLogout}>Logout</Link>
                </>
              )}
          </nav>
        </header>
        
        {/* The Routes component ensures only one route is rendered at a time */}
        <Routes>
          <Route exact path="/" element={
              <ProtectedRoute>
                <Home user={user}/>
              </ProtectedRoute>
          } />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUser={setUser}/>} />
          <Route path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard user={user}/> 
              </ProtectedRoute> 
            }
          />

          <Route path="/profile"
          element={
              <ProtectedRoute>
                <Profile user={user}/>
              </ProtectedRoute>
          }/>

        </Routes>
      </>
      
  </>

  );
}

export default App;