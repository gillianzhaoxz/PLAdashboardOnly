/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
  center: [39.9525, -75.1639],
  zoom: 12,
  preferCanvas: true,
  renderer: L.Canvas
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 25,
  ext: 'png'
}).addTo(map);



var dataset = "data/dashboardData.geojson"
var expr = {delinquent: 0, 
            usbank: 0, 
            sheriff: 0, 
            devInterest: 0};
var myMarkers;
var addrInput;
var myPoint;

var markerOptions = {
  radius: 5,
  fillColor: "#2aa353",
  fillOpacity: 0.2,
  color: "#2aa353",
  opacity: 0,
}; 

var myPointOptions = {
  radius: 10,
  fillColor: "#ff0000",
  fillOpacity: 0.3,
  color: "#ff0000",
  opacity: 0,
}

var devInterestCat = "unknown";
var delinquentCat = "unknown";
var usbankCat = "unknown";
var sheriffCat = "unknown";
var inputAddr = ""

var resetMap = function (){
  myMarkers.forEach(function(marker) {
    map.removeLayer(marker)
  })
}

var resetPoint = function (){
  myPoint.forEach(function(marker) {
    map.removeLayer(marker)
  })
}



function loadData() {
  fetch(dataset)
    .then(resp => resp.json())
    .then(data => {
      featureCollection = data.features;

      featureSelected = featureCollection.filter(f => 
        f.properties.delinquent > expr.delinquent 
        && f.properties.usbank > expr.usbank
        && f.properties.sheriff > expr.sheriff
        && (f.properties.devInterest > expr.devInterest))

      myMarkers = featureSelected.map(function(a) { 
        var risk = Number(a.properties.devInterest);
        switch (risk) {
          case 3:
            devInterestCat = "High risk";
            break;
          case 2:
            devInterestCat = "Low risk";
            break;
          case 1:
            devInterestCat = "No risk";
            break;
        }
        var delinquent = Number(a.properties.delinquent);
        switch (delinquent) {
          case 2:
            delinquentCat = "Delinquent";
            break;
          case 1:
            delinquentCat = "Not delinquent";
            break;
        }
        var usbank = Number(a.properties.usbank);
        switch (usbank) {
          case 2:
            usbankCat = "Yes";
            break;
          case 1:
            usbankCat = "No";
            break;
        }
        var sheriff = a.properties.sheriff;
        if (sheriff == 2) {
          if (a.properties.display_date != null) {
            sheriffCat = a.properties.display_date.slice(0, 10);
          } else {
            sheriffCat = "Unknown date";
          }
        } else {
          sheriffCat = "No"
        }




        return L.circleMarker([a.geometry.coordinates[1], a.geometry.coordinates[0]], markerOptions)
        .addTo(map)
        .bindPopup(
          a.properties.location + " <br>" +
          "<br>Development risk: " + devInterestCat + 
          "<br>Delinquency status: " + delinquentCat +
          "<br>US bank lien: " + usbankCat +
          "<br>Total due: $" + a.properties.total_due +
          "<br>Sheriff sale: " + sheriffCat +
          "<br>Current owner: " + a.properties.owner
          ) 
      });
    })
}

function highlightOne() {
  fetch(dataset)
    .then(resp => resp.json())
    .then(data => {
      featureCollection = data.features;

      featureSelected = featureCollection.filter(f => 
        f.properties.location == inputAddr)

      myPoint = featureSelected.map(function(a) { 
        return L.circleMarker([a.geometry.coordinates[1], a.geometry.coordinates[0]], myPointOptions)
        .addTo(map)
        .bindPopup(
          a.properties.location + " <br>" +
          "<br>Development risk: " + devInterestCat + 
          "<br>Delinquency status: " + delinquentCat +
          "<br>US bank lien: " + usbankCat +
          "<br>Total due: $" + a.properties.total_due +
          "<br>Sheriff sale: " + sheriffCat +
          "<br>Current owner: " + a.properties.owner
          ) 
      });
    })
}

$(document).ready(function() {
 
  function knowCase() {
    var delinquentCheck = $("input#check-delinquent").prop('checked');
    var usbankCheck = $("input#check-usbank").prop('checked');
    var sheriffCheck = $("input#check-sheriff").prop('checked');
    var devInterestCheck = $("input#check-devInterest").prop('checked');

    function getExpr() {
      if (delinquentCheck == true) {
        expr.delinquent = 1
      } else {
        expr.delinquent = 0
      }
      if (usbankCheck == true) {
        expr.usbank = 1
      } else {
        expr.usbank = 0
      }
      if (sheriffCheck == true) {
        expr.sheriff = 1
      } else {
        expr.sheriff = 0
      }
      if (devInterestCheck == true) {
        expr.devInterest = 1
      } else {
        expr.devInterest = 0
      }
      return expr;
    }

    getExpr();
  }

  loadData();
  highlightOne();
  var onStringFilterChange = function(e) {
    resetPoint();
    inputAddr = e.target.value.toUpperCase();
    console.log(inputAddr)
    highlightOne();
    
  };

  $('#addrInput').keyup(onStringFilterChange);

  $("input#check-delinquent").on("click", function(e) {
    knowCase();
    console.log(expr)
    resetMap();
    loadData();
  })
  $("input#check-usbank").on("click", function(e) {
    knowCase();
    console.log(expr)
    resetMap();
    loadData();
  })
  $("input#check-sheriff").on("click", function(e) {
    knowCase();
    console.log(expr)
    resetMap();
    loadData();
  })
  $("input#check-devInterest").on("click", function(e) {
    knowCase();
    console.log(expr)
    resetMap();
    loadData();
  })

})



