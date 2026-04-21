import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeMap from '../components/HomeMap';
import { useState, useEffect } from 'react';
import '../components/HomeMap.css';

function Profile() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        email: "",
        username: "",
        password: ""
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch("https://photomap-e0h6fnh3hxfscbc8.westus3-01.azurewebsites.net/me", {
            method: "GET",
            credentials: "include"
        })
            .then(res => {
                console.log("STATUS:", res.status);
                if (!res.ok) {
                    throw new Error("Error");
                }
                return res.json();
            })
            .then(data => {
                console.log("User:", data);
                setUser(data);
                setFormData({
                    name: data.name || "",
                    lastname: data.lastname || "",
                    email: data.email || "",
                    username: data.username || "",
                    password: ""
                });
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleDeleteAccount = () => {
        console.log("account deleted")
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const myAction = async (formData) => {
        const data = Object.fromEntries(formData);
        console.log(data)
        // Server-side logic or client-side logic in a Transition
        const response = await fetch(`https://photomap-e0h6fnh3hxfscbc8.westus3-01.azurewebsites.net/users/${user.id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json', // 2. Tell the server to expect JSON
            },
            // 3. Stringify the object for the body
            body: JSON.stringify(data),

        })

        if (response.ok) {
            alert("user updated");
        }
    };

    if (loading) {
        return <p>Loafing...</p>
    }

    //to prevent from not loading user logged data
    if (!user) {
        return <p>Unable to load user</p>;
    }

    return (
        <div className='home-component'>
            <div class="profile-wrapper">
                <div class="profile-card p-4">

                    <div class="text-center mb-4">
                        <h4 class="fw-bold">@{user.username}</h4>
                    </div>

                    <div class="mb-4">
                        <div class="section-title">Edit Profile</div>

                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            await myAction(formData);
                        }}>

                            <div class="row mb-3">
                                <div class="col">
                                    <input name='name' type="text" value={formData.name}
                                        onChange={handleChange} className="form-control" placeholder="Name" />
                                </div>
                                <div class="col">
                                    <input name='lastname' type="text" value={formData.lastname}
                                        onChange={handleChange} className="form-control" placeholder="Lastname" />
                                </div>
                            </div>

                            <div class="mb-3">
                                <input name='email' type="email" value={formData.email}
                                    onChange={handleChange} className="form-control" placeholder="Email" />
                            </div>

                            <div class="mb-3">
                                <input name='username' type="text" value={formData.username}
                                    onChange={handleChange} className="form-control" placeholder="Username" />
                            </div>

                            <div class="mb-3">
                                <input name='password' type="password" value={formData.password}
                                    onChange={handleChange} className="form-control" placeholder="New Password" />
                            </div>

                            <button type="submit" class="btn btn-dark w-100">
                                Update Profile
                            </button>

                        </form>
                    </div>

                    <div class="text-center">
                        <button onClick={handleDeleteAccount} type="button" class="btn btn-outline-danger">
                            Deactivate My Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile