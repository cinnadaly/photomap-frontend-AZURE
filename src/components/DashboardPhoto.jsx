import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeMap from '../components/HomeMap';
import '../components/HomeMap.css';

function DashboardPhoto({photo, onDelete}){

    return (
        <figure className="figure py-2 mx-2 rounded d-flex">
          <div className="figure-img img-fluid rounded" alt="..." 
            style={{
              backgroundImage: `url(${photo.imagePath})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "250px",
              width: "100%"
            }}></div>
          <div className="figure-content d-flex justify-content-center align-items-center">
            <div className="figure-sub-content">
              <figcaption className="figure-caption">{photo.title}</figcaption>
              <p className="figure-caption">{photo.description}</p>
            </div>
            <button onClick={() => onDelete(photo.id)} className="btn btn-dark mt-2">Delete</button>
          </div>
        </figure>
    );
  }

export default DashboardPhoto
