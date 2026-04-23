import { useNavigate } from "react-router-dom";
import "../components/HomeMap.css";

function Signup({ setIsAuthenticated, setUser }) {

    const navigate = useNavigate();

    const mySignup = async (formData) => {
        const data = Object.fromEntries(formData);
        console.log(data);

        const response = await fetch('https://photomap-e0h6fnh3hxfscbc8.westus3-01.azurewebsites.net/signup', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            //test
            const data = await response.json();
            localStorage.setItem("user", JSON.stringify(data.user)); //test
            setIsAuthenticated(true);
            console.log("created user and logged in");
            navigate("/dashboard");
        } else {
            const errorData = await response.json();
            console.log(errorData);
            Swal.fire({
                icon: "error",
                title: "Error creating user!",
                showConfirmButton: false,
                timer: 2000
            });
        }
    };

    return (
        <>
            <div className='home-component'>
                <div className="container-fluid">
                    <div className="row profile-row d-flex justify-content-center align-items-center">
                        <div className="col-12 col-lg-5">
                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                await mySignup(formData);
                            }}>
                                <fieldset>
                                    <legend>Sign Up</legend>

                                    <div className="mb-3">
                                        <input type="text" name="name" className="form-control" placeholder="Name" required />
                                    </div>

                                    <div className="mb-3">
                                        <input type="text" name="lastname" className="form-control" placeholder="Last Name" required />
                                    </div>

                                    <div className="mb-3">
                                        <input type="email" name="email" className="form-control" placeholder="Email" required />
                                    </div>

                                    <div className="mb-3">
                                        <input type="text" name="username" className="form-control" placeholder="Username" required />
                                    </div>

                                    <div className="mb-3">
                                        <input type="password" name="password" className="form-control" placeholder="Password" required />
                                    </div>

                                    <button type="button" onClick={() => navigate("/login")} class="btn btn-dark ms-2">Return to login</button>
                                    <button type="submit" className="btn btn-primary">Create Account</button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;