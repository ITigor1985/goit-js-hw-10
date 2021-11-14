const END_POINT = 'https://restcountries.com/v3.1/name/';
const FILTER = '?fields=name,capital,population,flags,languages';

export default function fetchCountries(name) {
  return fetch(`${END_POINT}${name}${FILTER}`).then(response => {
    if (!response.ok) {
      return Promise.reject('Oops, there is no country with that name');
    }
    return response.json();
  });
}
