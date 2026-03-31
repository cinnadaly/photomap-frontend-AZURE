import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeMap from '../components/HomeMap';
import {useState, useEffect} from 'react';
import '../components/HomeMap.css';

function Home(){
    return (
      <div className='home-component'>
          <HomeMap/>
      </div>

    );
  }

export default Home
/*

<form id="locationForm">
          <fieldset >
            <legend>Login</legend>
            <div className="mb-3">
              <label className="form-label">name</label>
                  <input type="text" name="name" className="form-control" placeholder="name"/>
                </div>
                <div className="mb-3">
                  <label className="form-label">description</label>
                  <input type="text" name="description" className="form-control" placeholder="description"/>
                </div>
                <div className="mb-3">
                  <label className="form-label">address</label>
                  <input type="text" name="address" className="form-control" placeholder="address"/>
                </div>
                <div className="mb-3">
                  <label className="form-label">lat</label>
                  <input type="text" name="lat" id="txtLat" className="form-control" placeholder="lat"/>
                </div>
                <div className="mb-3">
                  <label className="form-label">lng</label>
                  <input type="text" name="lng" id="txtLng" className="form-control" placeholder="lng"/>
                </div>
                <div className="mb-3">
                  <label className="form-label">photo</label>
                  <input type="text" name="photo" className="form-control" value="test.jpg"/>
                </div>
                <div className="mb-3">
                  <label className="form-label">userID</label>
                  <input type="text" name="userID" className="form-control" value="1" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <input type="text" name="status" className="form-control" value="0" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
              </fieldset>
        </form>



            <script async defer
                src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBbHpVIghN8MOdVePby7tndqsKpZXZ6FIs&loading=async&callback=initMap">

            </script>

            <script src="./utils/map.js"></script>

*/