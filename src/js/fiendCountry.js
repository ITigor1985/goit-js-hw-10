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
  fetchCountries(e.target.value).then;
}
function clearMarkup() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

//console.log(fetchCountries('ukr'));
