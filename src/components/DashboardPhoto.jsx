import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeMap from '../components/HomeMap';
import '../components/HomeMap.css';

function DashboardPhoto({ photo, onDelete }) {

  const currentUser = JSON.parse(localStorage.getItem("user"));
    return (
        <figure className="figure py-2 mx-2">
          <div d-flex justify-content-center align-items-center>
            <div className="figure-img img-fluid position-relative" alt="..." 
              style={{
                backgroundImage: `url(${photo.imagePath})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "250px",
                width: "100%"
              }}>

              {currentUser && photo.userID === currentUser.id && (
                <div className="position-absolute">
                  <button
                    onClick={() => onEdit(photo.id)}
                    className="btn-edit-custom mt-2 bg-none">
                    <i class="bi bi-pen-fill"></i>
                  </button>

<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
                  <button
                    onClick={() => onDelete(photo.id)}
                    className="btn-absolute-custom mt-2 bg-none">
                    <i class="bi bi-x-circle-fill"></i>
                  </button>
                </div>
              )}

              </div>
            <div className="figure-content ">
              <div className="figure-sub-content d-flex flex-column align-items-start">
                <h3 className="figure-caption">{photo.title}</h3>
                <h6 className="figure-caption">{photo.description}</h6>
              </div>
            </div>
          </div>
          <div >
            <div class="accordion accordion-flush" id="accordionFlushExample">

              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#"+photo.id + "collapse"} aria-expanded="false" aria-controls="flush-collapseOne">
                    <h6>Reviews</h6>
                  </button>
                </h2>
                <div id={photo.id + "collapse"} class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">

                  <div class="accordion-body">
                    <ul class="list-group list-group-flush">
                      {
                        //console.log(photo.reviews)
                        photo.reviews.map((review)=> {
                          return (<li class="list-group-item d-flex flex-column align-items-start">
                                    <h6>Comment: {review.Comment}</h6>
                                    <h6>Rating: {review.Rating}</h6>
                                  </li>);
                        })
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
