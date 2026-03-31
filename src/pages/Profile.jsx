import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeMap from '../components/HomeMap';
import {useState, useEffect} from 'react';
import '../components/HomeMap.css';

function Profile({user}){

    const handleDeleteAccount = () => {
        console.log("account deleted fake")
    }

    const myAction = async (formData) => {
        const data = Object.fromEntries(formData);
        console.log(data)
        // Server-side logic or client-side logic in a Transition
        const response = await fetch(`http://localhost:5555/users/${user.id}`, {
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


    //to prevent from not loading user logged data
    if (!user) {
        return <p>Loading...</p>;
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
                                    <input name='name' type="text" class="form-control" placeholder="Name"/>
                                </div>
                                <div class="col">
                                    <input name='lastname' type="text" class="form-control" placeholder="Lastname"/>
                                </div>
                            </div>

                            <div class="mb-3">
                                <input name='email' type="email" class="form-control" placeholder="Email"/>
                            </div>

                            <div class="mb-3">
                                <input name='username' type="text" class="form-control" placeholder="Username"/>
                            </div>

                            <div class="mb-3">
                                <input name='password' type="password" class="form-control" placeholder="New Password"/>
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