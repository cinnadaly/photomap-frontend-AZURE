import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeMap from '../components/HomeMap';
import '../components/HomeMap.css';

function DashboardPhoto({ photo, onDelete }) {

  const currentUser = JSON.parse(localStorage.getItem("user"));
    return (
        <figure className="figure py-2 mx-2 rounded ">
          <div d-flex justify-content-center align-items-center>
            <div className="figure-img img-fluid rounded" alt="..." 
              style={{
                backgroundImage: `url(${photo.imagePath})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "250px",
                width: "100%"
              }}></div>
            <div className="figure-content d-flex justify-content-start align-items-center">
              <div className="figure-sub-content">
                <figcaption className="figure-caption">{photo.title}</figcaption>
                <p className="figure-caption">{photo.description}</p>
              </div>
              {currentUser && photo.userID === currentUser.id && (
                <button
                  onClick={() => onDelete(photo.id)}
                  className="btn btn-dark mt-2">
                  Delete
                </button>
              )}
            </div>
          </div>
          <div >
            <div class="accordion accordion-flush" id="accordionFlushExample">

              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                    Reviews
                  </button>
                </h2>
                <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                  <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item’s accordion body.</div>
                </div>
              </div>

            </div>

          </div>
        </figure>

    );
  }

export default DashboardPhoto
