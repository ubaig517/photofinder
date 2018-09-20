// const API_KEY = "10150327-3e63ff662691ad227a4537a47";
// const URL = `https://pixabay.com/api/?key=${API_KEY}&per_page=100&q=`;

const API_KEY = 'c85be81a5d91495b84d935e25305df9414c4a025e7930ae75e644ae7fa77d68d';
const URL = `https://api.unsplash.com/search/photos/?client_id=${API_KEY}&per_page=20&query=`;

$(document).ready(() => {
  $('#search-form').on('submit', (e) => {
    let searchTerm = $('#search-term').val();

    findImage(searchTerm);

    e.preventDefault();
  });
});

const findImage = (searchTerm) => {
  axios.get(`${URL + searchTerm}`)
    .then((res) => {
      let imagesData = res.data.results;
      let output = '';
      $.each(imagesData, (index, image) => {
        output += `
          <div class="col-md-3">
            <div class="card-body text-center">
              <a onclick="selectedImage('${image.id}')"><img src="${image.urls.small}"></a>
            </div>
          </div>
        `;
      });

      $('#images').html(output);
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

      $('#image-container').html(output);
    })
    .catch((error) => {
      console.log(error);
    });
}



// Unsplash aki key = c85be81a5d91495b84d935e25305df9414c4a025e7930ae75e644ae7fa77d68d
// Unsplash query syntax
// https://api.unsplash.com/search/photos/?client_id=c85be81a5d91495b84d935e25305df9414c4a025e7930ae75e644ae7fa77d68d&query=party

// search with id = "https://api.unsplash.com/photos/DX56fYvJeis/?client_id=c85be81a5d91495b84d935e25305df9414c4a025e7930ae75e644ae7fa77d68d"
