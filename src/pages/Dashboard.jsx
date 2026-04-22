import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeMap from '../components/HomeMap';
import DashboardPhoto from '../components/DashboardPhoto';
import '../components/HomeMap.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();
    const [photos, setPhotos] = useState([]);
    const currentUser = JSON.parse(localStorage.getItem("user"));

    //delete image
    const handleRemovePhoto = async (id) => {
        await fetch(`https://photomap-e0h6fnh3hxfscbc8.westus3-01.azurewebsites.net/photos/${id}`, {
            method: "DELETE",
            credentials: "include",
        }).then(() => {
            setPhotos(prev => prev.filter(photo => photo.id !== id));
            Swal.fire({
                icon: "success",
                title: "Comment added!",
                showConfirmButton: false,
                timer: 1000
            });
        });
    };

    //use states for file dialog
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [userID, setUserID] = useState(1);//this will be for logged user
    const [reviewData, setReviewData] = useState(null);

    useEffect(() => {
        fetch("https://photomap-e0h6fnh3hxfscbc8.westus3-01.azurewebsites.net/photos/reviews", {
            credentials: "include",
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setPhotos(data.data)
            })
            .catch((err) => console.log(err))
    }, [])
    /*
        useEffect(() => {
            fetch("https://photomap-e0h6fnh3hxfscbc8.westus3-01.azurewebsites.net/locations", {
                credentials: "include",
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    reviewData(data.data)
                })
                .catch((err) => console.log(err))
        }, [])*/

    //insert of a new photo file
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("photo", file);
        formData.append("userID", currentUser.id);
        formData.append("title", title);
        formData.append("description", description);
        try {
            fetch("https://photomap-e0h6fnh3hxfscbc8.westus3-01.azurewebsites.net/photos", {
                method: "POST",
                credentials: "include",
                body: formData,
            }).then((response) => {
                return response.json()
            }).then((data) => {
                if (data.status === 1) {
                    Swal.fire({
                        icon: "error",
                        title: "No GPS data in this image!",
                        showConfirmButton: false,
                        timer: 2000
                    });
                } else {
                    Swal.fire({
                        icon: "success",
                        title: "Image Uploaded!",
                        showConfirmButton: false,
                        timer: 1000
                    });
                }
            }).catch((error) => {
                console.error("Error:", error);
            });
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <div className='home-component '>
            <div className="container-fluid ">
                <div className="row my-5">
                    <div className="col">
                        <form onSubmit={handleSubmit}>
                            <div className="row d-flex justify-content-center">
                                <div className="col-12 col-lg-5 ">
                                    <input className='upload-form-container txt-file-input' type="file" onChange={(e) => setFile(e.target.files[0])} required />
                                </div>
                                <div className="col-12 col-lg-5 ">
                                    <div className="upload-form-container d-flex flex-column p-5 ">
                                        <input className='form-control from-control-lg my-1' type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
                                        <input className='form-control from-control-lg my-1' type="text" placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} />
                                        <button className="w-50 btn btn-secondary my-1" type="submit">Upload</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    {
                        photos.map((photo) => (
                            <DashboardPhoto key={photo.id} photo={photo} onDelete={handleRemovePhoto} />
                        ))
                        //console.log(photos)
                    }
                </div>
            </div>
        </div>

    );
}

export default Dashboard