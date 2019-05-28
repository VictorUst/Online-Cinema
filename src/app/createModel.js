import { createStore } from '../helpers/createStore.js';
import { mapMovie } from '../helpers/mapMovie.js';

export const createModel = () =>
  createStore(
    {
      count: 0,
      results: [],
      error: false,
      searches: [
        'Harry Potter',
        'Avengers',
        'Spider-man',
        'Batman',
        'Indiana Jones',
        'Home Alone',
        'Back to the Future',
      ],
    },
    (store) => ({
      search: async (currentState, searchTerm) => {
        store.setState({
          count: 0,
          results: [],
          error: false,
          searches: [searchTerm].concat(
            currentState.searches.filter((term) => term !== searchTerm)
          ),
        });

        try {
          const data = await fetch(
            `http://www.omdbapi.com/?type=movie&apikey=7ea4aa35&s=${searchTerm}`
          ).then((r) => r.json());

          return data.Response === 'True'
            ? {
              count: data.totalResults,
              results: data.Search.map(mapMovie),
            }
            : { error: data.Error };
        } catch (error) {
          return { error };
        }
      },
      removeTag: (currentState, searchTerm) => {
        return {
          searches: currentState.searches.filter((term) => term !== searchTerm),
        };
      },
    })
  );
