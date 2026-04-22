import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeMap from '../components/HomeMap';
import DashboardPhoto from '../components/DashboardPhoto';
import '../components/HomeMap.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function History() {

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

export default History;