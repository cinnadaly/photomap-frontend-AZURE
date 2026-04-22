import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeMap from '../components/HomeMap';
import '../components/HomeMap.css';
import '../components/Rating.css';
import '../utils/Rating';
import {useState, useEffect} from "react";


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

      try {
          const response = await fetch("https://photomap-e0h6fnh3hxfscbc8.westus3-01.azurewebsites.net/reviews", {
              method: "POST",
              credentials: "include",
              body: formData,
          });

          const data = await response.json();
          console.log(data);

          Swal.fire({
              icon: "success",
              title: "Comment added!",
              showConfirmButton: false,
              timer: 1000
          });;

      } catch (error) {
          console.error("Error:", error);
      }
  };

    return (
        <figure className="figure py-2 mx-2 col-12 col-lg-5">
          <div >
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
                  <button type="button" className="btn btn-dark m-1" data-bs-toggle="modal" data-bs-target="#exampleModal" 
                  onClick={() => {
                    setLocationID(photo.locationID);
                    setUserID(currentUser.id);
                  }}>
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
                                <div className="col-12 col-lg-9 my-2">
                                    <br></br>
                                    <input className='form-control from-control-lg my-1' type="text" placeholder="be kind:)" name='comment' onChange={(e)=>setComment(e.target.value)} required />
                                    <br></br>

                                      <div id="form-rating" class="rating">
                                        <div class="rating__stars d-flex justify-content-center">
                                          <input id="rating-1" class="rating__input rating__input-1" type="radio" name="rating" value="1" onClick={() => setRating(1)}/>
                                          <input id="rating-2" class="rating__input rating__input-2" type="radio" name="rating" value="2" onClick={() => setRating(2)}/>
                                          <input id="rating-3" class="rating__input rating__input-3" type="radio" name="rating" value="3" onClick={() => setRating(3)}/>
                                          <input id="rating-4" class="rating__input rating__input-4" type="radio" name="rating" value="4" onClick={() => setRating(4)}/>
                                          <input id="rating-5" class="rating__input rating__input-5" type="radio" name="rating" value="5" onClick={() => setRating(5)}/>
                                          <label class="rating__label" for="rating-1">
                                            <svg class="rating__star" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
                                              <g transform="translate(16,16)">
                                                <circle class="rating__star-ring" fill="none" stroke="#000" stroke-width="16" r="8" transform="scale(0)" />
                                              </g>
                                              <g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <g transform="translate(16,16) rotate(180)">
                                                  <polygon class="rating__star-stroke" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="none" />
                                                  <polygon class="rating__star-fill" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="#000" />
                                                </g>
                                                <g transform="translate(16,16)" stroke-dasharray="12 12" stroke-dashoffset="12">
                                                  <polyline class="rating__star-line" transform="rotate(0)" points="0 4,0 16" />
                                                  <polyline class="rating__star-line" transform="rotate(72)" points="0 4,0 16" />
                                                  <polyline class="rating__star-line" transform="rotate(144)" points="0 4,0 16" />
                                                  <polyline class="rating__star-line" transform="rotate(216)" points="0 4,0 16" />
                                                  <polyline class="rating__star-line" transform="rotate(288)" points="0 4,0 16" />
                                                </g>
                                              </g>
                                            </svg>
                                            <span class="rating__sr">1 star—Terrible</span>
                                          </label>
                                          <label class="rating__label" for="rating-2">
                                            <svg class="rating__star" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
                                              <g transform="translate(16,16)">
                                                <circle class="rating__star-ring" fill="none" stroke="#000" stroke-width="16" r="8" transform="scale(0)" />
                                              </g>
                                              <g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <g transform="translate(16,16) rotate(180)">
                                                  <polygon class="rating__star-stroke" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="none" />
                                                  <polygon class="rating__star-fill" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="#000" />
                                                </g>
                                                <g transform="translate(16,16)" stroke-dasharray="12 12" stroke-dashoffset="12">
                                                  <polyline class="rating__star-line" transform="rotate(0)" points="0 4,0 16" />
                                                  <polyline class="rating__star-line" transform="rotate(72)" points="0 4,0 16" />
                                                  <polyline class="rating__star-line" transform="rotate(144)" points="0 4,0 16" />
                                                  <polyline class="rating__star-line" transform="rotate(216)" points="0 4,0 16" />
                                                  <polyline class="rating__star-line" transform="rotate(288)" points="0 4,0 16" />
                                                </g>
                                              </g>
                                            </svg>
                                            <span class="rating__sr">2 stars—Bad</span>
                                          </label>
                                          <label class="rating__label" for="rating-3">
                                            <svg class="rating__star" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
                                              <g transform="translate(16,16)">
                                                <circle class="rating__star-ring" fill="none" stroke="#000" stroke-width="16" r="8" transform="scale(0)" />
                                              </g>
                                              <g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <g transform="translate(16,16) rotate(180)">
                                                  <polygon class="rating__star-stroke" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="none" />
                                                  <polygon class="rating__star-fill" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="#000" />
                                                </g>
                                                <g transform="translate(16,16)" stroke-dasharray="12 12" stroke-dashoffset="12">
                                                  <polyline class="rating__star-line" transform="rotate(0)" points="0 4,0 16" />
                                                  <polyline class="rating__star-line" transform="rotate(72)" points="0 4,0 16" />
                                                  <polyline class="rating__star-line" transform="rotate(144)" points="0 4,0 16" />
                                                  <polyline class="rating__star-line" transform="rotate(216)" points="0 4,0 16" />
                                                  <polyline class="rating__star-line" transform="rotate(288)" points="0 4,0 16" />
                                                </g>
                                              </g>
                                            </svg>
                                            <span class="rating__sr">3 stars—OK</span>
                                          </label>
                                          <label class="rating__label" for="rating-4">
                                            <svg class="rating__star" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
                                              <g transform="translate(16,16)">
                                                <circle class="rating__star-ring" fill="none" stroke="#000" stroke-width="16" r="8" transform="scale(0)" />
                                              </g>
                                              <g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <g transform="translate(16,16) rotate(180)">
                                                  <polygon class="rating__star-stroke" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="none" />
                                                  <polygon class="rating__star-fill" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="#000" />
                                                </g>
                                                <g transform="translate(16,16)" stroke-dasharray="12 12" stroke-dashoffset="12">
                                                  <polyline class="rating__star-line" transform="rotate(0)" points="0 4,0 16" />
                                                  <polyline class="rating__star-line" transform="rotate(72)" points="0 4,0 16" />
                                                  <polyline class="rating__star-line" transform="rotate(144)" points="0 4,0 16" />
                                                  <polyline class="rating__star-line" transform="rotate(216)" points="0 4,0 16" />
                                                  <polyline class="rating__star-line" transform="rotate(288)" points="0 4,0 16" />
                                                </g>
                                              </g>
                                            </svg>
                                            <span class="rating__sr">4 stars—Good</span>
                                          </label>
                                          <label class="rating__label" for="rating-5">
                                            <svg class="rating__star" width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
                                              <g transform="translate(16,16)">
                                                <circle class="rating__star-ring" fill="none" stroke="#000" stroke-width="16" r="8" transform="scale(0)" />
                                              </g>
                                              <g stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <g transform="translate(16,16) rotate(180)">
                                                  <polygon class="rating__star-stroke" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="none" />
                                                  <polygon class="rating__star-fill" points="0,15 4.41,6.07 14.27,4.64 7.13,-2.32 8.82,-12.14 0,-7.5 -8.82,-12.14 -7.13,-2.32 -14.27,4.64 -4.41,6.07" fill="#000" />
                                                </g>
                                                <g transform="translate(16,16)" stroke-dasharray="12 12" stroke-dashoffset="12">
                                                  <polyline class="rating__star-line" transform="rotate(0)" points="0 4,0 16" />
                                                  <polyline class="rating__star-line" transform="rotate(72)" points="0 4,0 16" />
                                                  <polyline class="rating__star-line" transform="rotate(144)" points="0 4,0 16" />
                                                  <polyline class="rating__star-line" transform="rotate(216)" points="0 4,0 16" />
                                                  <polyline class="rating__star-line" transform="rotate(288)" points="0 4,0 16" />
                                                </g>
                                              </g>
                                            </svg>
                                            <span class="rating__sr">5 stars—Excellent</span>
                                          </label>
                                          <p class="rating__display" data-rating="1" hidden>Terrible</p>
                                          <p class="rating__display" data-rating="2" hidden>Bad</p>
                                          <p class="rating__display" data-rating="3" hidden>OK</p>
                                          <p class="rating__display" data-rating="4" hidden>Good</p>
                                          <p class="rating__display" data-rating="5" hidden>Excellent</p>
                                        </div>
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
                    className="position-absolute btn btn-dark top-0 m-1">
                    <i class="bi bi-x-lg"></i>
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
                                    <h6><i>"{review.Comment}"</i></h6>
                                    <h6>{
                                      (() => {
                                          const rows = [];
                                          const stars = review.Rating;
                                          const emptyStars = 5 - stars;
                                          for(let i = 0; i < stars; i++){
                                              rows.push(<i class="bi bi-star-fill"></i>)
                                          }
                                          for (let i = 0; i < emptyStars; i++) {
                                              rows.push(<i class="bi bi-star"></i>)
                                          }
                                          return rows;
                                      })()

                                    }</h6>
                                    { <h6><> </>{review.Rating}</h6>}


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
