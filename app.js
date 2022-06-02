// hanoi = { lat: 21.0278, lng: 105.8342 }

const locations = [
  { lat: 21.0296837, lng: 105.7845082 },
  { lat: 21.0296837, lng: 105.7845082 },
  { lat: 21.0296837, lng: 105.7845082 },
  { lat: 21.028547, lng: 105.7839556 },
  { lat: 21.0290828, lng: 105.7854148 },
  { lat: 21.0283117, lng: 105.7862892 },
  { lat: 21.0268396, lng: 105.7872762 },
  { lat: 21.0266894, lng: 105.7876893 },
  { lat: 21.0249869, lng: 105.7893683 },
  { lat: 21.0249869, lng: 105.7893683 },
  { lat: 21.0238553, lng: 105.7885529 },
  { lat: 21.0228738, lng: 105.789143 },
  { lat: 21.0202198, lng: 105.7911529 },
];

// Initialize and add the map
function initMap() {
  const hanoi = { lat: 21.0278, lng: 105.8342 };
  const vietA = { lat: 21.0304946, lng: 105.7836572 };

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: hanoi,
  });

  //Add marker
  //   const marker = new google.maps.Marker({
  //     position: vietA,
  //     map: map,
  //     icon: "https://img.icons8.com/nolan/1x/marker.png",
  //   });

  //   //Info Window
  //   const infoWindow = new google.maps.InfoWindow({
  //     content: `<h2>Viet A: 200 shipping orders in progress</h2>`,
  //   });

  //   //Add multiple markers (Cluster markers)

  //   //click, mouseover...
  //   marker.addListener("click", () => {
  //     infoWindow.open({
  //       anchor: marker,
  //       map,
  //       shouldFocus: false,
  //     });
  //   });

  //Add marker
  function addMarker(props) {
    const marker = new google.maps.Marker({
      position: props.location,
      map: map,
      icon: props.imageIcon,
    });
    //check to custome icon
    if (props.imageIcon) {
      //set image icon
      marker.setIcon(props.imageIcon);
    }
  }

  addMarker({
    location: { lat: 21.0296837, lng: 105.7845082 },
    imageIcon: "https://img.icons8.com/nolan/1x/marker.png",
  });
  addMarker({ location: { lat: 21.0296837, lng: 105.7845082 } });
  addMarker({ location: { lat: 21.0296837, lng: 105.7845082 } });
  addMarker({ location: { lat: 21.028547, lng: 105.7839556 } });
  addMarker({ location: { lat: 21.0238553, lng: 105.7885529 } });
  addMarker({ location: { lat: 21.0202198, lng: 105.7911529 } });

  //DIRECTION
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);
  calcRoute(directionsService, directionsRenderer);

  document.getElementById("mode").addEventListener("change", () => {
    calcRoute(directionsService, directionsRenderer);
  });
}

function calcRoute(directionsService, directionsRenderer) {
  const selectedMode = document.getElementById("mode").value;
  const start = document.getElementById("from").value;
  const end = document.getElementById("to").value;

  directionsService
    .route({
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode[selectedMode],
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
    })
    .catch((e) => window.alert(" Direction request fail"));
}

window.initMap = initMap;
