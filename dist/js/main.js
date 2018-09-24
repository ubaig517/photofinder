const API_KEY = 'c85be81a5d91495b84d935e25305df9414c4a025e7930ae75e644ae7fa77d68d';
const URL = `https://api.unsplash.com/search/photos/?client_id=${API_KEY}&per_page=20&query=`;

document.querySelector('#search-form').addEventListener('submit', (e) => {
  let searchTerm = document.querySelector('#search-term').value;

  findImage(searchTerm);
  e.preventDefault();
});

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

function getStoredImage() {
  let storedImageId = sessionStorage.getItem('imageId');

  let storedImageUrl = `https://api.unsplash.com/photos/${storedImageId}/?client_id=${API_KEY}`;

  axios.get(`${storedImageUrl}`)
    .then((res) => {
      console.log(res);
      let image = res.data.urls;
      let output = `
          <div>
            <img src="${image.regular}" />
          </div>
        `;

      document.querySelector('#image-container').innerHTML = output;
    })
    .catch((error) => {
      console.log(error);
    });
}



// Unsplash aki key = c85be81a5d91495b84d935e25305df9414c4a025e7930ae75e644ae7fa77d68d
// Unsplash query syntax
// https://api.unsplash.com/search/photos/?client_id=c85be81a5d91495b84d935e25305df9414c4a025e7930ae75e644ae7fa77d68d&query=party

// search with id = "https://api.unsplash.com/photos/DX56fYvJeis/?client_id=c85be81a5d91495b84d935e25305df9414c4a025e7930ae75e644ae7fa77d68d"
