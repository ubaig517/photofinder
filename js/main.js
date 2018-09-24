const API_KEY = 'c85be81a5d91495b84d935e25305df9414c4a025e7930ae75e644ae7fa77d68d';
const URL = `https://api.unsplash.com/search/photos/?client_id=${API_KEY}&per_page=20&query=`;


if (document.querySelector('#search-form')){
  document.querySelector('#search-form').addEventListener('submit', (e) => {
    let searchTerm = document.querySelector('#search-term').value;

    findImage(searchTerm);
    e.preventDefault();
  });
}

const findImage = (searchTerm) => {
  axios.get(`${URL + searchTerm}`)
    .then((res) => {

      let imagesData = res.data.results;

      let output = '';

      imagesData.forEach((image) => {
        output += `
          <div class="col-md-3">
            <div class="card-body text-center">
              <a onclick="selectedImage('${image.id}')"><img src="${image.urls.small}"></a>
            </div>
          </div>
        `;
      });

      document.querySelector('#images').innerHTML = output;
    })
    .catch((error) => {
      console.log(error);
    });
}

function selectedImage(id) {
  sessionStorage.setItem('imageId', id);
  window.location = 'image-page.html';
  return false;
}

// LOGIC FOR THE EDITTING OF SELECTED IMAGE ---------------------------------------------------



const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let img = new Image();
const downloadBtn = document.getElementById('download-btn');
const resetBtn = document.getElementById('reset-btn');



// This function gets called once an image has been clicked.
function getStoredImage() {
  let storedImageId = sessionStorage.getItem('imageId');

  let storedImageUrl = `https://api.unsplash.com/photos/${storedImageId}/?client_id=${API_KEY}`;

  axios.get(`${storedImageUrl}`)
    .then((res) => {
      console.log(res);
      let imageData = res.data.urls;

      startImage = new Image();
      startImage.src = imageData.regular;
      startImage.onload = function() {
        canvas.width = startImage.width;
        canvas.height = startImage.height;
        ctx.drawImage(startImage, 0, 0, startImage.width, startImage.height);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

//Add Filters & Effects
document.addEventListener('click', (e) =>{
  if(e.target.classList.contains('filter-btn')) {
    //Brightness--------------
    if(e.target.classList.contains('brightness-add')) {
      Caman('#canvas', img, function(){
        this.brightness(5).render();
      });
    } else if(e.target.classList.contains('brightness-remove')) {
      Caman('#canvas', img, function(){
        this.brightness(-5).render();
      });
    //Contrast-----------------
    } else if(e.target.classList.contains('contrast-add')) {
      Caman('#canvas', img, function(){
        this.contrast(5).render();
      });
    } else if(e.target.classList.contains('contrast-remove')) {
      Caman('#canvas', img, function(){
        this.contrast(-5).render();
      });
    // Saturation------------------
    } else if(e.target.classList.contains('saturation-add')) {
      Caman('#canvas', img, function(){
        this.saturation(5).render();
      });
    } else if(e.target.classList.contains('saturation-remove')) {
      Caman('#canvas', img, function(){
        this.saturation(-5).render();
      });
    //Vibrance----------------------
    } else if(e.target.classList.contains('vibrance-add')) {
      Caman('#canvas', img, function(){
        this.vibrance(5).render();
      });
    } else if(e.target.classList.contains('vibrance-remove')) {
      Caman('#canvas', img, function(){
        this.vibrance(-5).render();
      });
  // EFFECTS------------------------------------------------
    //Vintage-------------------------
    } else if(e.target.classList.contains('vintage-add')) {
      Caman('#canvas', img, function(){
        this.vintage().render();
      });
    } else if(e.target.classList.contains('lomo-add')) {
      Caman('#canvas', img, function(){
        this.lomo().render();
      });
    } else if(e.target.classList.contains('clarity-add')) {
      Caman('#canvas', img, function(){
        this.clarity().render();
      });
    } else if(e.target.classList.contains('sincity-add')) {
      Caman('#canvas', img, function(){
        this.sinCity().render();
      });
    } else if(e.target.classList.contains('crossprocess-add')) {
      Caman('#canvas', img, function(){
        this.crossProcess().render();
      });
    } else if(e.target.classList.contains('pinhole-add')) {
      Caman('#canvas', img, function(){
        this.pinhole().render();
      });
    } else if(e.target.classList.contains('nostalgia-add')) {
      Caman('#canvas', img, function(){
        this.nostalgia().render();
      });
    } else if(e.target.classList.contains('hermajesty-add')) {
      Caman('#canvas', img, function(){
        this.herMajesty().render();
      }); ``
    }
  }
});

// Reset Filters & Effects
resetBtn.addEventListener('click', () => {
  Caman('#canvas', img, function() {
    this.revert();
  });
});

// Unsplash aki key = c85be81a5d91495b84d935e25305df9414c4a025e7930ae75e644ae7fa77d68d
// Unsplash query syntax
// https://api.unsplash.com/search/photos/?client_id=c85be81a5d91495b84d935e25305df9414c4a025e7930ae75e644ae7fa77d68d&query=party

// search with id = "https://api.unsplash.com/photos/DX56fYvJeis/?client_id=c85be81a5d91495b84d935e25305df9414c4a025e7930ae75e644ae7fa77d68d"
