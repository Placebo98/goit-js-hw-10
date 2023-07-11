import axios from 'axios';
import Notiflix from 'notiflix';

// function fetchBreeds() {
//     return axios.get('https://api.thecatapi.com/v1/breeds')
// }

export const fetchBreeds = () =>
  fetch('https://api.thecatapi.com/v1/breeds', { method: 'GET' }).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    }
  );

// export const fetchCatByBreed = breedId =>
//   fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`, {
//     method: 'GET',
//   }).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }

//     return response.data;
//   });

  export function fetchCatByBreed(breedId) {
    return axios
      .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
      .then(response => response.data)
      .catch(error => {
        Notiflix.Notify.failure(`Failed to fetch breed: ${error}`);
      });
  }

fetchBreeds().then(console.log);
