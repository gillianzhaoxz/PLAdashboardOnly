/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
  center: [39.9525, -75.1639],
  zoom: 12,
  //preferCanvas: true
  renderer: L.canvas();
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 25,
  ext: 'png'
}).addTo(map);


var dataset = "data/dashboardData.geojson"
var expr = "default";

var vacantLotsLayer = L.canvasOverlay().addTo(map);

function loadData() {
  fetch(dataset)
    .then(resp => resp.json())
    .then(data => {
      
      all_d = data.features;
      var length = all_d.length;

      

      index_usbank = [];
      for (var i = 0; i < length; i++) {
        if (all_d[i].properties['delinquentType'] == 2) {
          index_usbank.push(i);
        }
      }    
      
      index_delinquent = [];
      for (var i = 0; i < length; i++) {
        if (all_d[i].properties['delinquentStatus'] == 1) {
          index_delinquent.push(i);
        }
      } 

      index_highInterest = [];
      for (var i = 0; i < length; i++) {
        if (all_d[i].properties['probs'] > 0.2) {
          index_highInterest.push(i);
        }
      } 
      index_lowInterest = [];
      for (var i = 0; i < length; i++) {
        if (all_d[i].properties['probs'] > 0.1 & all_d[i].properties['probs'] < 0.2) {
          index_lowInterest.push(i);
        }
      }
      index_noInterest = [];
      for (var i = 0; i < length; i++) {
        if (all_d[i].properties['probs'] < 0.1) {
          index_noInterest.push(i);
        }
      }



      index_sheriff = [];
      for (var i = 0; i < length; i++) {
        if (all_d[i].properties['allSheriffSales'] == 1) {
          index_sheriff.push(i);
        }
      } 

      d = all_d;
      

      

      function drawingOnCanvas(canvasOverlay, params) {
          var ctx = params.canvas.getContext('2d');
          ctx.clearRect(0, 0, params.canvas.width, params.canvas.height);
          var ctx2 = params.canvas.getContext('2d');
          ctx2.clearRect(0, 0, params.canvas.width, params.canvas.height);


          function drawPoints(ctx) {
            var lat = d[i].properties['lat'];
            var lon = d[i].properties['lon'];
            if (params.bounds.contains([parseFloat(lat), parseFloat(lon)])) {
                dot = canvasOverlay._map.latLngToContainerPoint([lat, lon]);
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, 3, 0, Math.PI * 2);
                ctx.fill();
                ctx.closePath();
            }
            
          }
          

          for (var i = 0; i < length; i++) {
            switch (expr) {
              case "default":
                ctx.fillStyle = "rgba(42, 163, 83, 0.5)";
                drawPoints(ctx); 
                break;
              case "delinquent":
                if (i in index_delinquent) {
                  ctx.fillStyle = "rgba(42, 163, 83, 0.5)";
                  drawPoints(ctx);                  
                };
                break;
              case "usbank":
                if (i in index_usbank) {
                  ctx.fillStyle = "rgba(150, 163, 83, 0.5)";
                  drawPoints(ctx); 
                };
                break;
              case "sheriff":
                if (i in index_sheriff) {
                  ctx.fillStyle = "rgba(188, 163, 83, 0.5)";
                  drawPoints(ctx); 
                };
                break;
              case "devInterest": //todo: doesn't work right
                if (i in index_lowInterest) {
                  ctx.fillStyle = "rgba(60, 180, 113, 0.3)";
                  drawPoints(ctx); 
                  if (i in index_highInterest) {
                    ctx2.fillStyle = "rgba(255, 163, 83, 0.5)";
                    drawPoints(ctx2); 
                  };  
                } 
                break;
            }


          }
      };

      vacantLotsLayer.drawing(drawingOnCanvas).redraw();


    });
}


//$(window).on('load', function() {
  $(document).ready(function() {
    function knowCase() {
      var delinquentCheck = $("input#check-delinquent").prop('checked');
      var usbankCheck = $("input#check-usbank").prop('checked');
      var sheriffCheck = $("input#check-sheriff").prop('checked');
      var devInterestCheck = $("input#check-devInterest").prop('checked');

      function getExpr() {
        if (delinquentCheck == true & usbankCheck == false & sheriffCheck == false & devInterestCheck == false) {
          expr = "delinquent"
        } else if (delinquentCheck == false & usbankCheck == true & sheriffCheck == false & devInterestCheck == false) {
          expr = "usbank"
        } else if (delinquentCheck == false & usbankCheck == false & sheriffCheck == true & devInterestCheck == false) {
          expr = "sheriff"
        } else if (delinquentCheck == false & usbankCheck == false & sheriffCheck == false & devInterestCheck == true) {
          expr = "devInterest"
        } else {
          expr = "default"
        }
        return expr;
      }

      getExpr();
    }

    loadData();
    $("input#check-delinquent").on("click", function(e) {
        knowCase();
        loadData();
    });
    $("input#check-usbank").on("click", function(e) {
        knowCase();
        loadData();
    });
    $("input#check-sheriff").on("click", function(e) {
        knowCase();
        loadData();
    });
    $("input#check-devInterest").on("click", function(e) {
          knowCase();
        loadData();
    });


/* =====================
      $("input#check-delinquent").on("click", function(e) {
        delinquentCheck = $("input#check-delinquent").prop('checked');
      });
      $("input#check-usbank").on("click", function(e) {
        usbankCheck = $(this).prop('checked');
        console.log("usbankCheck", usbankCheck);
      });
      $("input#check-sheriff").on("click", function(e) {
        sheriffCheck = $(this).prop('checked');
        console.log("sheriffCheck", sheriffCheck);
      });
      $("input#check-devInterest").on("click", function(e) {
        devInterestCheck = $(this).prop('checked');
        console.log("devInterestCheck", devInterestCheck);
      });
      console.log("delinquentCheck", delinquentCheck);
      console.log(num);
===================== */
    });
  //});












/* ===
var featureGroup;
var vaccine = "https://raw.githubusercontent.com/gxzhao1/OSGIS-week9/master/assignment/vaccination_by_zip.json"
var vaccineData;
var pop =
  "https://raw.githubusercontent.com/gxzhao1/OSGIS-week9/master/assignment/pop_by_zip.json";
var popData;
var newData;

/* =====================
var showResults = function() {
  
  This function uses some jQuery methods that may be new. $(element).hide()
  will add the CSS "display: none" to the element, effectively removing it
  from the page. $(element).show() removes "display: none" from an element,
  returning it to the page. You don't need to change this part.
  
  // => <div id="intro" css="display: none">
  $('#intro').hide();
  // => <div id="results">
  $('#results').show();
};
===================== */

var eachFeatureFunction = function(layer) {
  layer.on('click', function (event) {
    //console.log(layer.feature.properties.CODE)
    var zip = layer.feature.properties.CODE;
    var fullvacstat = vaccineData[zip].fully_vaccinated;
    //console.log(fullvacstat)
    var partvacstat = vaccineData[zip].partially_vaccinated;

    // bar chart
    ctxBar = $("#barChart");
    barChart = new Chart(ctxBar, {
      type: "bar",
      data: {
        labels: ["Partially Vaccinated", "Fully Vaccinated"],
        datasets: [
          {data: [
              partvacstat,
              fullvacstat,
            ],
            backgroundColor: [
              "rgba(250, 225, 221, 1)",
              "rgba(250, 225, 221, 1)",
            ],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    }); 
    // pie chart prep -> lookup pop by zip
    zipPop = _.filter(popData, function (i) {
      return i["ZIP"] == zip;
    })[0].POP;

    // pie chart prep -> calculate %
    fullyvacperc = Math.round((fullvacstat / zipPop) * 100);
    partvacperc =  Math.round((partvacstat / zipPop) * 100);
    unvacperc = 100 - fullyvacperc - partvacperc;

    // pie chart
    ctxPie = $("#pieChart");
    pieChart = new Chart(ctxPie, {
      type: "doughnut",
      data: {
        labels: [
          "Unvaccinated %",
          "Partially Vaccinated %",
          "Fully Vaccinated %",
        ],
        datasets: [
          {
            label: "Vaccination Progress",
            data: [unvacperc, partvacperc, fullyvacperc],
            backgroundColor: [
              "rgba(216, 226, 220, 1)",
              "rgba(250, 225, 221, 0.5)",
              "rgba(250, 225, 221, 1)",
            ],

          },
        ],
      },
    });
/*     switch (layer.feature.properties.COLLDAY) {
      case 'MON':   
        day = "Monday";
        break;
      case 'TUE':   
        day = "Tuesday";
        break;
      case 'WED':   
        day = "Wednesday";
        break;
      case 'THU':   
        day = "Thursday";
        break;
      case 'FRI':   day = "Friday";
        break;
    } */
    // $('.day-of-week').text(day)

    layer.feature.properties["fullyperc"] = fullyvacperc;
    //showResults();
    map.fitBounds( event.target.getBounds())
  });
};

var myStyle = function(feature) {
  var found = newData.find(x => x.ZIP == Number(feature.properties.CODE));
  //console.log(found)
  if (found != undefined) {
    val = found.zfullyperc;
  } else {
    val = 0
  }
  //console.log(val)

  function getColor(d, min = 0, mean = 20, max = 100, startColor = '#D8E2DC', medColor = '#FAE1DD', endColor="#f28482") {
    const scale = chroma.scale([startColor, medColor, endColor]).domain([min, mean, max]);
  return scale(d).hex();
  }

  //console.log(String(getColor(Number(val))))

  return {fillOpacity: 0.9,
          color: String(getColor(Number(val))),
          fillColor: String(getColor(Number(val)))}
};






$(document).ready(function() {
  $.ajax(dataset).done(function(json) {
    var parsedData = JSON.parse(json);
    var data = parsedData.features;
    

    $.ajax(vaccine).done(function(json){
      var parsedData = JSON.parse(json);
      vaccineData = parsedData;
      //console.log(vaccineData)
      $.ajax(pop).done(function(json){
        var parsedData = JSON.parse(json);
        popData = parsedData;
        //console.log("pop", popData)

        // create new dataset
        newData = [];
        popData.map(a => {
          var z = a.ZIP;
          var zpop = a.POP;
          if (_.contains(Object.keys(vaccineData), String(z))) {
            var zfullvac = vaccineData[z].fully_vaccinated;
            var zpartvac = vaccineData[z].partially_vaccinated;
            var zfullyvacperc = Math.round((zfullvac / zpop) * 100);
            var zpartvacperc =  Math.round((zpartvac / zpop) * 100);
            var zunvacperc = 100 - zfullyvacperc - zpartvacperc;
            a["zfullyperc"] = zfullyvacperc;
            newData.push(a)
          } else {
            newData = newData;
          }
        })

        featureGroup = L.geoJson(data, {
          style: myStyle,
          //filter: myFilter
        }).addTo(map);
        //legend.addTo(map);
        // quite similar to _.each
        featureGroup.eachLayer(eachFeatureFunction);

      })
    })
  });
});
