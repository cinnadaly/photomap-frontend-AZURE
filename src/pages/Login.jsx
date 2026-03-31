import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import "../components/HomeMap.css";

function Login({setIsAuthenticated, setUser}){

  const navigate = useNavigate();

// The action function can be async
  /*const getAll = async () => {
    const response = await fetch('http://localhost:5555/users', {
      method: 'GET',
      credentials: 'include' 
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log("error to login " + error));
  };*/


// The action function can be async
  const myAction = async (formData) => {
    const data = Object.fromEntries(formData);
    console.log(data)
    // Server-side logic or client-side logic in a Transition
    const response = await fetch('http://localhost:5555/login', {
      method: 'POST', 
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json', // 2. Tell the server to expect JSON
      },
      // 3. Stringify the object for the body
      body: JSON.stringify(data),
      
    })

    if (response.ok) {
      const userRes = await fetch("http://localhost:5555/me", {
        credentials: "include"
      })
      const userData = await userRes.json();
      setUser(userData);

      setIsAuthenticated(true);

      navigate("/dashboard");
    } else {
      alert("Login failed");
    }
  };

  return (
    // When using a function for 'action', method defaults to POST
    <>
    <div className='home-component '>
        <div className="container-fluid">
          <div className="row profile-row d-flex justify-content-center align-items-center">
            <div className="col-12 col-lg-5 ">
              <form onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                await myAction(formData);
              }}>
                  <fieldset >
                    <legend>Login</legend>
                      <div class="mb-3">
                        <input type="text" name="username" id="disabledTextInput" class="form-control" placeholder="username"/>
                      </div>
                      <div class="mb-3">
                        <input type="text" name="password" id="disabledTextInput" class="form-control" placeholder="password"/>
                      </div>
                        <button type="submit" class="btn btn-primary">Login</button>
                  </fieldset>
              </form>
            </div>
          </div>
        </div>
    </div>

    </>
  );
  /**
   * 
              <form action={myAction2}>
                <button type="submit" class="btn btn-primary"> Logout </button>
              </form>

              <form action={getAll}>
                <button type="submit" class="btn btn-primary">GetAll users</button>
              </form>
   * 
   */

  }

export default Login