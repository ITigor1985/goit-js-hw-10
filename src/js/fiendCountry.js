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
    fetchCountries(e.target.value)
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
      console.log(country);
      country.forEach(element => {
        console.log(element.name.common);
        refs.countryList.insertAdjacentHTML(
          'beforeend',
          `<li>
          <p><img src = "${element.flags.png} "</p>
          <p>${element.name.common}</p>
        </li>`,
        );
      });
    })
    .join('');
  console.log(markup);
}
//console.log(fetchCountries('ukr'));
