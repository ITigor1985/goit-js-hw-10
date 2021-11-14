import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import fetchCountries from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
function onSearch(e) {
  if (e.target.value.trim() === '') {
    clearMarkup();
    return;
  }
  clearMarkup();
  if (e.target.value.length < 2) {
    Notify.info('Few letters, enter more');
  } else {
    fetchCountries(e.target.value.trim())
      .then(countries => renderUserList(countries))
      .catch(Notify.failure);
  }
}
function clearMarkup() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
function renderUserList(...countries) {
  const markup = countries
    .map(country => {
      if (country.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
        return;
      }
      if (country.length > 1) {
        console.log(country);
        country.forEach(element => {
          refs.countryList.insertAdjacentHTML(
            'beforeend',
            `<li>
          <p><img class="flagList" src = "${element.flags.png} "</p>
          <p class="nameCoutryList">${element.name.common}</p>
        </li>`,
          );
        });
      } else {
        country.forEach(element => {
          refs.countryInfo.insertAdjacentHTML(
            'beforeend',
            `<p class="nameCoutry">${element.name.common}</p>
            <img class="flag" src = "${element.flags.png} ">
             
             <p><span class="description">Capital: </span>${element.capital}</p>
             <p><span class="description">Population: </span>${element.population}</p>
             <p><span class="description">Languages: </span>${Object.values(
               element.languages,
             )}</p>`,
          );
        });
      }
    })
    .join('');
  console.log(markup);
}
