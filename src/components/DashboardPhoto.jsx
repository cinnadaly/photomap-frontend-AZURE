import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeMap from '../components/HomeMap';
import '../components/HomeMap.css';

function DashboardPhoto({photo, onDelete}){

  const BASE_URL = 'http://localhost:5555';

    return (
        <figure className="figure py-2 mx-2 rounded">
          <div className="figure-img img-fluid rounded" alt="..." 
            style={{
              backgroundImage: `url(${BASE_URL}/uploads/${photo.imagePath})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "250px",
              width: "100%"
            }}></div>
          <figcaption className="figure-caption">{photo.title}</figcaption>
          <p className="figure-caption">{photo.description}</p>
          <button onClick={() => onDelete(photo.id)} className="btn btn-dark mt-2">Delete</button>
        </figure>
    );
  }

export default DashboardPhoto
