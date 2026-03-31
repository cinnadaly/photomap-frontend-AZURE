import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeMap from '../components/HomeMap';
import DashboardPhoto from '../components/DashboardPhoto';
import '../components/HomeMap.css';
import {useState, useEffect} from "react";

function Dashboard(){

    const [photos, setPhotos] = useState([]);

    //delete image
    const handleRemovePhoto = async (id) => {
        await fetch(`http://localhost:5555/photos/${id}`, {
            method: "DELETE",
            credentials: "include",
        });
        setPhotos(prev => prev.filter(photo => photo.id !== id));
    };

    //use states for file dialog
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [userID, setUserID] = useState(1);//this will be for logged user

    useEffect(() => {
        fetch("http://localhost:5555/photos", {
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

    //insert of a new photo file
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("photo", file);        
        formData.append("userID", userID);
        formData.append("title", title);
        formData.append("description", description);
        try {
        const response = await fetch("http://localhost:5555/photos", {
            method: "POST",
            credentials: "include",
            body: formData, 
        });

        const data = await response.json();
        console.log(data);

        } catch (error) {
        console.error("Error:", error);
        }
    };

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
                        <DashboardPhoto key={photo.id} photo={photo} onDelete={handleRemovePhoto}/>
                    ))
                }
            </div>
        </div>
      </div>

    );
  }

export default Dashboard