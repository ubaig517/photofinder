const API_KEY = "10150327-3e63ff662691ad227a4537a47";
const URL = `https://pixabay.com/api/?key=${API_KEY}&per_page=50&q=`;

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
      let imageData = res.data.hits;
      let output = '';
      $.each(imageData, (index, image) => {
        output += `
          <div class="col-md-3">
            <div class="card-body text-center">
              <img src="${image.largeImageURL}">
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
