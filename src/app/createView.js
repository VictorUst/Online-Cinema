import { clearNode } from '../helpers/clearContainer.js';
import { getDeclension } from '../helpers/getDeclension.js';

const movies = getDeclension('фильм', 'фильма', 'фильмов');

export const createView = () => {
  // Search list
  const filmBox = document.querySelector('.filmbox__card');
  const filmSubtitle = document.querySelector('.filmbox__subtitle');

  // Tags list
  const searchHistory = document.querySelector('.search__history');

  // Form
  const search = document.querySelector('.search');
  const searchInput = document.querySelector('.search__input');

  // Renderers
  const renderList = (results) => {
    const list = document.createDocumentFragment();

    results.forEach((movieData) => {
      const movie = document.createElement('movie-card');

      movie.poster = movieData.poster;
      movie.title = movieData.title;
      movie.year = movieData.year;
      movie.link = movieData.link;

      list.appendChild(movie);
    });

    clearNode(filmBox);
    filmBox.appendChild(list);
  };

  const renderSearchList = (terms) => {
    const list = document.createDocumentFragment();

    terms.forEach((movie) => {
      const searchItem = document.createElement('a');
      searchItem.classList.add('search__item');
      searchItem.href = `/?search=${movie}`;
      searchItem.textContent = movie;
      searchItem.dataset.movie = movie;

      list.appendChild(searchItem);
    });

    clearNode(searchHistory);
    searchHistory.appendChild(list);
  };

  const renderCount = (count) => {
    filmSubtitle.textContent = `Нашли ${count} ${movies(count)}`;
  };

  const renderError = (error) => {
    filmSubtitle.textContent = error;
  };

  // Events
  const onSearchSubmit = (_listener) => {
    const listener = (event) => {
      event.preventDefault();
      _listener(searchInput.value);
      searchInput.value = '';
    };

    search.addEventListener('submit', listener);

    return () => search.removeEventListener('submit', listener);
  };

  const onTagClick = (_listener) => {
    const listener = (event) => {
      event.preventDefault();

      if (event.target.classList.contains('search__item') && !event.altKey) {
        _listener(event.target.dataset.movie);
      }
    };

    searchHistory.addEventListener('click', listener);
    return () => searchHistory.removeEventListener('click', listener);
  };

  const onTagRemove = (_listener) => {
    const listener = (event) => {
      event.preventDefault();

      if (event.target.classList.contains('search__item') && event.altKey) {
        _listener(event.target.dataset.movie);
      }
    };

    searchHistory.addEventListener('click', listener);
    return () => searchHistory.removeEventListener('click', listener);
  };

  return {
    renderList,
    renderCount,
    renderError,
    renderSearchList,
    onSearchSubmit,
    onTagClick,
    onTagRemove,
  };
};
