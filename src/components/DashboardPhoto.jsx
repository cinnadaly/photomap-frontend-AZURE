import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeMap from '../components/HomeMap';
import '../components/HomeMap.css';

function DashboardPhoto({ photo, onDelete }) {

  const currentUser = JSON.parse(localStorage.getItem("user"));
    return (
        <figure className="figure py-2 mx-2">
          <div d-flex justify-content-center align-items-center>
            <div className="figure-img img-fluid" alt="..." 
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
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#"+photo.id + "collapse"} aria-expanded="false" aria-controls="flush-collapseOne">
                    Reviews
                  </button>
                </h2>
                <div id={photo.id + "collapse"} class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">

                  <div class="accordion-body">
                    <ul class="list-group list-group-flush">
                      {
                        console.log(photo.review)/*
                        photo.reviews.map((review)=> {
                          <li class="list-group-item">
                            <h5>Comment: {review.Comment}</h5>
                            <h5>Rating: {review.Rating}</h5>
                          </li>
                        })*/
                      }
                    </ul>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </figure>

    );
  }

export default DashboardPhoto
