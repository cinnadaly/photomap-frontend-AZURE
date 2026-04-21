import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeMap from '../components/HomeMap';
import '../components/HomeMap.css';
import {useState, useEffect} from "React";


function DashboardPhoto({ photo, onDelete }) {

  const [selectedPhotoReview, setSelectedPhotoReview] = useState(null);

  const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("comment", comment);
      formData.append("locationID", locationID);
      formData.append("rating", rating);
      formData.append("userID", userID);
      try {
          const response = await fetch("https://photomap-e0h6fnh3hxfscbc8.westus3-01.azurewebsites.net/reviews", {
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

                  <button onClick={() => onEdit(photo.id)} type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Add comment
                  </button>

                  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="exampleModalLabel">New Comment</h1>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="row d-flex justify-content-center">
                                <div className="col-12 col-lg-5 ">
                                    <div className="upload-form-container d-flex flex-column p-5 ">
                                        <input className='form-control from-control-lg my-1' type="text" placeholder="Comment" onChange={(e) => setDescription(e.target.value)} />
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" class="btn btn-primary">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </form>

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
