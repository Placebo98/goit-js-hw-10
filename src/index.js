import axios from 'axios';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

axios.defaults.headers.common['x-api-key'] =
  'live_LZ9hFpekekWV65oPrHt0Vlcp8Q4RfJ3XrLPYKeEc6tTyoTiHZ6EWQ5Y2rrDDiUFF';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');

hideLoader();

fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.text = breed.name;
      breedSelect.appendChild(option);
    });
  })
  .then()
  .catch(error => Notiflix.Notify.failure(error));

breedSelect.addEventListener('change', makeCat);

function makeCat() {
  const breedId = breedSelect.value;

  showLoader();
  hideCatInfo();

  fetchCatByBreed(breedId)
    .then(data => {
      hideLoader();
      showCatInfo();
      const imgUrl = data[0].url;
      const catName = data[0].breeds[0].name;
      const catDescr = data[0].breeds[0].description;
      const catTemp = data[0].breeds[0].temperament;
      const catOrigin = data[0].breeds[0].origin;

      const markUp = `
    
    <img src="${imgUrl}" alt="${catName} width="250" height="250" class="cat-img" loading="lazy">
    
    <div class="cat-container">
    <h2 class="cat-name">${catName}</h2>
    <p class="cat-description">${catDescr}</p>
    <p class="cat-temperament">Temperament: ${catTemp}</p>
    <p class="cat-origin">Origin:${catOrigin}</p>
    </div> `;
      catInfo.innerHTML = markUp;
    })
    .catch(error => Notiflix.Notify.failure(error));
}

function hideLoader() {
  loader.style.display = 'none';
}

function showLoader() {
  loader.style.display = 'block';
}

function showCatInfo() {
  catInfo.style.display = 'flex';
}

function hideCatInfo() {
  catInfo.style.display = 'none';
}
