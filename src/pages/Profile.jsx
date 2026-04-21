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
        const savedUser = localStorage.getItem("user");

        if (savedUser) {
            const parsedUser = JSON.parse(savedUser);

            setUser(parsedUser);

            setFormData({
                name: parsedUser.name || "",
                lastname: parsedUser.lastname || "",
                email: parsedUser.email || "",
                username: parsedUser.username || "",
                password: ""
            });
        }

        setLoading(false);
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const myAction = async () => {
        const dataToSend = { ...formData };

        if (!dataToSend.password) {
            delete dataToSend.password;
        }

        const response = await fetch(
            `https://photomap-e0h6fnh3hxfscbc8.westus3-01.azurewebsites.net/users/${user.id}`,
            {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            }
        );

        if (response.ok) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User Updated!",
                showConfirmButton: false,
                timer: 1000
            });;

            const updatedUser = { ...user, ...dataToSend };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);
        } else {
            const error = await response.json();
            console.error(error);
            alert("Error updating user");
        }
    };

    const handleDeleteAccount = () => {
        console.log("account deleted");
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <p>No user found</p>;
    }
    if (!user?.id) {
        alert("Invalid user");
        return;
    }

    return (
        <div className='home-component'>
            <div className="profile-wrapper">
                <div className="profile-card p-4">

                    <div className="text-center mb-4">
                        <h4 className="fw-bold">@{user.username}</h4>
                    </div>

                    <div className="mb-4">
                        <div className="section-title">Edit Profile</div>

                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            await myAction();
                        }}>

                            <div className="row mb-3">
                                <div className="col">
                                    <input name='name' value={formData.name}
                                        onChange={handleChange} className="form-control" placeholder="Name"
                                    />
                                </div>
                                <div className="col">
                                    <input name='lastname' value={formData.lastname}
                                        onChange={handleChange} className="form-control" placeholder="Lastname"
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <input name='email' value={formData.email}
                                    onChange={handleChange} className="form-control" placeholder="Email"
                                />
                            </div>

                            <div className="mb-3">
                                <input name='username' value={formData.username}
                                    onChange={handleChange} className="form-control" placeholder="Username"
                                />
                            </div>

                            <div className="mb-3">
                                <input name='password' type="password"
                                    value={formData.password}
                                    onChange={handleChange} className="form-control" placeholder="Password"
                                />
                            </div>

                            <button type="submit" className="btn btn-dark w-100">
                                Update Profile
                            </button>

                        </form>
                    </div>

                    <div className="text-center">
                        <button onClick={handleDeleteAccount}
                            type="button"
                            className="btn btn-outline-danger">
                            Deactivate My Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;