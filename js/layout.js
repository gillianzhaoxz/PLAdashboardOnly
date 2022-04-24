/* globals showdown */

// Set map to center in Philadelphia
let map = L.map('map').setView([39.9525, -75.1639], 12);
// Set geometry layer to operate on
const geometryLayer = L.layerGroup().addTo(map);
// Set empty data collector
let dataCollection = { features: [] };

// Load maps tiles
L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
  foo: 'bar', attribution: '"Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."'
}).addTo(map);

// select all slide elements in html document
const slidesDivs =  document.querySelector('.slides');

// 1. ADD TEXT TO SLIDES
/* takes the text content from slides.js and inserts it into the HTML slide
elements*/
function initSlides() {
  const converter = new showdown.Converter({ smartIndentationFix: true });

  slidesDivs.innerHTML = '';
  for (const [index, slide] of slides.entries()) {
    const newSlideDiv = htmlToElement(`
      <div class="slide" id="slide-${index}">
        <h4>${slide.title}</h4>
        ${converter.makeHtml(slide.content)}
      </div>
    `);
    slidesDivs.appendChild(newSlideDiv);
  }
}

// 2. ADD MAP GEOMETRY PER SLIDE
/* selects geometry for each slide from dataCollection by checkin if phase of
the slide corresponds with phase of the feature */
function geometryCollection(phase) {
  return {
    type: 'FeatureCollection',
    features: dataCollection.features.filter(f => f.properties.phase === phase),
  };
}

// updates map with the right geometry for the current slide
/* the collected geometry from the geometryCollection function is passed and a
geoJSON Layer is returned */
function updateMap(collection) {
  geometryLayer.clearLayers(); // removes the geometry from the previous slide
  const geoJsonLayer = L.geoJSON(collection, { pointToLayer: (p, latlng) => L.marker(latlng) })
    .bindTooltip(l => l.feature.properties.label)
    .addTo(geometryLayer);
  return geoJsonLayer;
}


/* takes a slide object and returns the geometry for that slide using the
geometry collection function, then updates the map with that geometry using the
updateMap function*/
function syncMapToSlide(slide) {
  const collection = slide.phase ? geometryCollection(slide.phase) : dataCollection;
  const layer = updateMap(collection);

  function handleFlyEnd() {
    if (slide.showpopups) {
      layer.eachLayer(l => {
        l.bindTooltip(l.feature.properties.label, { permanent: true });
        l.openTooltip();
      });
    }
    map.removeEventListener('moveend', handleFlyEnd);
  }

  map.addEventListener('moveend', handleFlyEnd);
  if (slide.bounds) {
    map.flyToBounds(slide.bounds);
  } else if (slide.phase) {
    map.flyToBounds(layer.getBounds());
  }
}



// Update map to current slide using the syncMapToSlide function
function syncMapToCurrentSlide() {
  const currentSlide = slides[slideIndex];
  syncMapToSlide(currentSlide);
}


const slideCompleteDivs =  document.querySelector('.slide-complete');

// Get position of second section
const titleSectionPosition = slideCompleteDivs.children[0].offsetTop


/* get the index of the slide currently on the window by comparing the scroll
position to the slides fixed position */
function compareScrollSlide() {
  const scrollPosition = window.scrollY + window.innerHeight;

  if (window.scrollY > window.innerHeight + titleSectionPosition) {
    document.querySelector('.header').classList.remove('hidden')
  } else {
    document.querySelector('.header').classList.add('hidden')
  }


  let i;
  for (i = 0; i < slidesDivs.children.length; i++) {
    const slidePosition = slidesDivs.children[i].offsetTop;
    if (scrollPosition < slidePosition) {
      break;
    }
  }

  if (i === 0) {
    slideIndex = 0;
  } else if (slideIndex != i - 1) {
    slideIndex = i - 1;
    syncMapToCurrentSlide();
  }
  console.log(i)

}



// 3. ACTUALLY LOAD THE DATA
/* loads the complete data from all slides and uses the syncMapToCurrentSlide to
update the slides consecutively*/
 function loadData() {
   fetch('data/places.json')
     .then(resp => resp.json())
     .then(data => {
       dataCollection = data;
       syncMapToCurrentSlide();
     });
 }


// 5. PROGRAM
let slideIndex = 0;
// get current slide with scrolling event
document.addEventListener('scroll', compareScrollSlide);


