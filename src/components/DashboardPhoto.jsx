import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeMap from '../components/HomeMap';

import { useNavigate } from "react-router-dom";
import '../components/HomeMap.css';
import '../components/Rating.css';
import '../utils/Rating';
import '../utils/Rating-update';
import { useState, useEffect } from "react";

function DashboardPhoto({ photo, onDelete }) {
  const navigate = useNavigate();
  //useStates for creating review
  const [selectedPhotoReview, setSelectedPhotoReview] = useState(null);
  const [comment, setComment] = useState(null);//this will be for logged user
  const [rating, setRating] = useState(5);//this will be for logged user
  const [reviewID, setReviewID] = useState(null);//this will be for logged user
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const handleEditReview = async () => {
    console.log("edit");
    const body = {
      comment: comment,
      rating: rating
    };
    try {
      fetch(`https://photomap-backend-azure-hhhhfabcdyesb6e0.westus3-01.azurewebsites.net/reviews/${reviewID}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log(data);
        if (data.status === 0) {

          setReviews(prev => prev.map(r => r.id === reviewID ? { ...r, Comment: comment, Rating: rating } : r));

          Swal.fire({
            icon: "success",
            title: "Comment updated!",
            showConfirmButton: false,
            timer: 1000
          });
        } else if (data.status === 1) {
          Swal.fire({
            icon: "error",
            title: "Update error!",
            showConfirmButton: false,
            timer: 2000
          });
        }
      });
    } catch (error) {

    }
  }
  const handleDeleteReview = async () => {
    try {
      fetch(`https://photomap-backend-azure-hhhhfabcdyesb6e0.westus3-01.azurewebsites.net/reviews/${reviewID}`, {
        method: "DELETE",
        credentials: "include",
      }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log(data);
        if (data.status === 0) {

          setReviews(prev => prev.filter(r => r.id !== reviewID));

          Swal.fire({
            icon: "success",
            title: "Comment deleted!",
            showConfirmButton: false,
            timer: 1000
          });
        } else if (data.status === 1) {
          Swal.fire({
            icon: "error",
            title: "delete error!",
            showConfirmButton: false,
            timer: 2000
          });
        }
      });
    } catch (error) {

    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      comment: comment,
      locationID: photo.locationID,
      rating: rating,
      userID: currentUser.id
    };
    console.log([comment, photo.locationID, rating, currentUser.id]);

    try {
      fetch("https://photomap-backend-azure-hhhhfabcdyesb6e0.westus3-01.azurewebsites.net/reviews", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      }).then(async (response) => {
        const data = await response.json();
        if (data.status === 0) {
          Swal.fire({
            icon: "success",
            title: "Comment added!",
            showConfirmButton: false,
            timer: 1000
          });
        } else if (data.status === 1) {
          Swal.fire({
            icon: "error",
            title: "You already reviewed this image!",
            showConfirmButton: false,
            timer: 2000
          });
        }
      });
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
              <button type="button" className="btn btn-dark m-1" data-bs-toggle="modal" data-bs-target={"#modal-" + photo.id}>
                Add comment
              </button>
              {/*Create review modal */}
              <div class="modal fade" id={"modal-" + photo.id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">New Comment</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <div className="row d-flex justify-content-center">
                        <div className="col-12 col-lg-9 my-2 mb-3">
                          {/*comment input */}
                          <input className="form-control form-control-lg my-1" type="text" placeholder="be kind:)" name="comment" onChange={(e) => setComment(e.target.value)} required />
                          {/*stars input */}
                          <div id={`form-rating-${photo.id}`} className="rating">
                            <div className="rating__stars d-flex justify-content-center">
                              <input id={`rating-1-${photo.id}`} className="rating__input rating__input-1" type="radio" name={`rating-${photo.id}`} value="1" onClick={() => setRating(1)} />
                              <input id={`rating-2-${photo.id}`} className="rating__input rating__input-2" type="radio" name={`rating-${photo.id}`} value="2" onClick={() => setRating(2)} />
                              <input id={`rating-3-${photo.id}`} className="rating__input rating__input-3" type="radio" name={`rating-${photo.id}`} value="3" onClick={() => setRating(3)} />
                              <input id={`rating-4-${photo.id}`} className="rating__input rating__input-4" type="radio" name={`rating-${photo.id}`} value="4" onClick={() => setRating(4)} />
                              <input id={`rating-5-${photo.id}`} className="rating__input rating__input-5" type="radio" name={`rating-${photo.id}`} value="5" onClick={() => setRating(5)} />
                              <label className="rating__label" htmlFor={`rating-1-${photo.id}`}>
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
                              <label className="rating__label" htmlFor={`rating-2-${photo.id}`}>
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
                              <label className="rating__label" htmlFor={`rating-3-${photo.id}`}>
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
                              <label className="rating__label" htmlFor={`rating-4-${photo.id}`}>
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
                              <label className="rating__label" htmlFor={`rating-5-${photo.id}`}>
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
                              <p className="rating__display" data-rating="1" hidden>Terrible</p>
                              <p className="rating__display" data-rating="2" hidden>Bad</p>
                              <p className="rating__display" data-rating="3" hidden>OK</p>
                              <p className="rating__display" data-rating="4" hidden>Good</p>
                              <p className="rating__display" data-rating="5" hidden>Excellent</p>
                            </div>
                          </div>

                          <br></br>
                          <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal" >Close</button>
                          <button type="submit" className="btn btn-primary">Save changes</button>
                        </div>
                      </div>
                    </form>

                  </div>
                </div>
              </div>


              {/*Update review modal */}
              <div class="modal fade" id={"modal-" + photo.id + "-update"} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">Update Comment</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <form onSubmit={handleEditReview}>
                      <div className="row d-flex justify-content-center">
                        <div className="col-12 col-lg-9 my-2 mb-3">
                          {/*comment input */}
                          <input className="form-control form-control-lg my-1" type="text" placeholder="be kind:)" name="comment" value={comment == null ? "es null xd" : comment} onChange={(e) => setComment(e.target.value)} required />
                          {/*stars input */}
                          <div id={`form-rating-${photo.id}-update`} className="rating">
                            <div className="rating__stars d-flex justify-content-center">
                              <input id={`rating-1-${photo.id}-update`} className="rating__input rating__input-1" type="radio" name={`rating-${photo.id}-update`} value="1" onClick={() => setRating(1)} />
                              <input id={`rating-2-${photo.id}-update`} className="rating__input rating__input-2" type="radio" name={`rating-${photo.id}-update`} value="2" onClick={() => setRating(2)} />
                              <input id={`rating-3-${photo.id}-update`} className="rating__input rating__input-3" type="radio" name={`rating-${photo.id}-update`} value="3" onClick={() => setRating(3)} />
                              <input id={`rating-4-${photo.id}-update`} className="rating__input rating__input-4" type="radio" name={`rating-${photo.id}-update`} value="4" onClick={() => setRating(4)} />
                              <input id={`rating-5-${photo.id}-update`} className="rating__input rating__input-5" type="radio" name={`rating-${photo.id}-update`} value="5" onClick={() => setRating(5)} />
                              <label className="rating__label" htmlFor={`rating-1-${photo.id}-update`}>
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
                              <label className="rating__label" htmlFor={`rating-2-${photo.id}-update`}>
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
                              <label className="rating__label" htmlFor={`rating-3-${photo.id}-update`}>
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
                              <label className="rating__label" htmlFor={`rating-4-${photo.id}-update`}>
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
                              <label className="rating__label" htmlFor={`rating-5-${photo.id}-update`}>
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
                              <p className="rating__display" data-rating="1" hidden>Terrible</p>
                              <p className="rating__display" data-rating="2" hidden>Bad</p>
                              <p className="rating__display" data-rating="3" hidden>OK</p>
                              <p className="rating__display" data-rating="4" hidden>Good</p>
                              <p className="rating__display" data-rating="5" hidden>Excellent</p>
                            </div>
                          </div>

                          <br></br>
                          <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal" >Close</button>
                          <button type="submit" className="btn btn-primary">Save changes</button>
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

      {/*review accordion component */}
      <div >
        <div class="accordion accordion-flush" id="accordionFlushExample">

          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#" + photo.id + "collapse"} aria-expanded="false" aria-controls="flush-collapseOne">
                <h6>Reviews</h6>
              </button>
            </h2>
            <div id={photo.id + "collapse"} class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">

              <div class="accordion-body">
                <ul class="list-group list-group-flush">
                  {
                    //console.log(photo.reviews)
                    photo.reviews.map((review) => {

                      return (<li class="list-group-item d-flex flex-column align-items-start">
                        <h6><i>"{review.Comment}"</i></h6>
                        <h6>{
                          (() => {
                            const rows = [];
                            const stars = review.Rating;
                            const emptyStars = 5 - stars;
                            for (let i = 0; i < stars; i++) {
                              rows.push(<i class="bi bi-star-fill"></i>)
                            }
                            for (let i = 0; i < emptyStars; i++) {
                              rows.push(<i class="bi bi-star"></i>)
                            }
                            return rows;
                          })()
                        } {review.Rating}</h6>
                        <h6><i>by {review.user.Username} at {new Date(review.CreatedAt).toLocaleString()}</i></h6>
                        {photo.userID === review.user.id && (
                          <div className="d-flex">
                            <button data-bs-toggle="modal" data-bs-target={"#modal-" + photo.id + "-update"} className='mx-2' onClick={async () => { await setComment(review.Comment); await setRating(review.Rating); await setReviewID(review.id); await handleEditReview() }}>Edit</button>
                            <button onClick={async () => { await setReviewID(review.id); await handleDeleteReview() }}>Delete</button>
                          </div>
                        )}
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
