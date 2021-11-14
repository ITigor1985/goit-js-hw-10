//fetchCountries(name);
const END_POINT = 'https://restcountries.com/v3.1/name/';
//const name = 'ukr';
const FILTER = '?fields=name,capital,population,flags,languages';

//console.log(fetchCountries(name));

export default function fetchCountries(name) {
  return fetch(`${END_POINT}${name}${FILTER}`).then(response => {
    if (!response.ok) {
      return Promise.reject('There is no country with that name. Try another');
    }
    return response.json();
  });
}
