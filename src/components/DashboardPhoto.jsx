import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeMap from '../components/HomeMap';
import '../components/HomeMap.css';
import {useState, useEffect} from "React";


function DashboardPhoto({ photo, onDelete }) {

  const [selectedPhotoReview, setSelectedPhotoReview] = useState(null);

  const [userID, setUserID] = useState(null);//this will be for logged user
  const [locationID, setLocationID] = useState(null);//this will be for logged user
  const [comment, setComment] = useState(null);//this will be for logged user
  const [rating, setRating] = useState(5);//this will be for logged user

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("comment", comment);
      formData.append("locationID", locationID);
      formData.append("rating", rating);//rating hardcoded
      formData.append("userID", userID);
      console.log([comment, locationID, rating, userID]);
      /*
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
      }*/
  };

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

                  <button onClick={() => {setLocationID(photo.locationID), setUserID(currentUser.id)}} type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
                                <div className="col-12 col-lg-9 ">
                                    <input className='form-control from-control-lg my-1' type="text" placeholder="Comment" name='comment' onChange={(e)=>setComment(e.target.value)} required />
                                    <br></br>
                                    <div className='starReviewContainer d-flex'>
                                      <i class="bi bi-star" onClick={() => setRating(1)}></i>
                                      <i class="bi bi-star" onClick={() => setRating(2)}></i>
                                      <i class="bi bi-star" onClick={() => setRating(3)}></i>
                                      <i class="bi bi-star" onClick={() => setRating(4)}></i>
                                      <i class="bi bi-star" onClick={() => setRating(5)}></i>
                                    </div>
                                    <br></br>
                                    <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary">Save changes</button>
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
