/*var lng = 0;
var lat = 0;
let map;
 
var initMap = function () {
    // get current location
    if (!navigator.geolocation) { // pedir permiso para acceder a la ubicacion actual
        alert("La Geolocalizacion no es compatible con este navegador...");
        return;
    }
 
    // lat, lng
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            //show map
            showMap(lat, lng);
        }
    );




}
 
//show map
function showMap(lat, lng) {
    // coordenadas
    const current_location = { lat: lat, lng: lng };
    // show map
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: current_location
    })
    //show marker
    new google.maps.Marker({
        position: current_location,
        map: map,
        title: "My Current Location",
        icon: {
            url: "laptop.png",
            scaledSize: new google.maps.Size(40, 40)
        }
    });
 
    //click on map
    map.addListener("click", (event) => {
        //place marker
        placeMarker(event.latLng);
    });



}*/

//*********************************************************************************************** */

/*
//draw marker
let placeMarker = function (location) {
    //console.log();
    //show location
    console.log(location.lat());

    let txtLat = document.querySelector("#txtLat");
    txtLat.value = location.lat();
    let txtLng = document.querySelector("#txtLng");
    txtLng.value = location.lng();
 
    //create new marker
    new google.maps.Marker({
        position: location,
        map: map,
        title: location.toString()
    })
}
 


//PRACTICA INSERTAR UNA LOCATION A PARTIR DE UN MARKER
const form = document.getElementById('locationForm');

form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    const formData = new FormData(form);

    myAction(formData);
 
});

const myAction = async (formData) => {
    const data = Object.fromEntries(formData);
    const response = await fetch('http://localhost:5000/locations', {
      method: 'POST', 
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(data),
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log("error to insert location" + error));
  };

const getAllLocations = async () => {
    const myPromise = new Promise((resolve, reject)=> {
        const response = fetch('http://localhost:5000/locations', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            resolve(data);
        })
        .catch((error) => console.log("error to get the locations", error));
    });
    return myPromise;
}

function createMarker(item){
    //destructuring
    const [address, description, id, lat, lng, name, photo, status, user] = Object.values(item);
    const contentString =
        `<div id="content" class="m-2"> 
            <div id="siteNotice">
            </div> 
            <h1 id="firstHeading" class="firstHeading">${name}</h1>
            <div id="bodyContent">
                <div class="card-body">
                    <p class="card-text">Description: ${description}</p>
                    <p class="card-text">Address: ${address}</p>
                    <p class="card-text">Location: (${lat},${lng})</p>
                    <p class="card-text">Added by: ${user.name} ${user.lastname}</p>
                </div>
                <button class="btn btn-primary mt-3 mx-0">Go to details</button>
            </div>
        </div>`;

    const infoWindow = new google.maps.InfoWindow({
        content: contentString
    });

    const marker = new google.maps.Marker({
        position: {lat: item.lat,lng: item.lng},
        map: map,
        title: item.description,
        label: item.name,
    })

    let isOpen = false;
    marker.addListener("click", () => {
        if(isOpen){
            infoWindow.close();
            isOpen = false;
        }else{
            infoWindow.open({
                anchor: marker,
                map,
            });
            isOpen = true;
        }
    });

}

//iterate every location and call 'createMarker'
const displayLocations = async () => {
    const locations = await getAllLocations();
        locations.data.forEach((item)=>{
            createMarker(item)
        })
    console.log(locations);
}

let btnDisplayLocations = document.querySelector("#btnDisplayLocations");
btnDisplayLocations.addEventListener("click", () => {
    displayLocations()
})
*/