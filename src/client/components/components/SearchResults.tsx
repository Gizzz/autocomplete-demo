import * as React from 'react';

import ReactStars from 'react-stars';
import Spinner from './Spinner';

interface ISearchResultsProps {
  term: string;
  searchResults: any[];
  isFetching: boolean;
  error: any;

  isMoreResultsAvailable: boolean;
  onLoadMore: () => void;
}

const SearchResults = ({
  term, searchResults, isFetching, error,
  isMoreResultsAvailable, onLoadMore,
}: ISearchResultsProps) => {
  const errorMessage = error && error.message
    ? error.message
    : `Something went wrong.`;

  const searchResultsJsx: JSX.Element[] = searchResults.map((result: any): JSX.Element => {
    return (
      <li className="search-results__items__item" key={result.id}>
        <div className="search-results__items__item__image">
          <img src={result.icon} />
        </div>
        <div className="search-results__items__item__info">
          <h4>{result.name}</h4>
          <div className="search-results__rating">
            {
              result.rating
                ? <ReactStars count={5} value={result.rating} size={24} edit={false} />
                : `Rating is not available.`
            }
          </div>
          {
            result.opening_hours && result.opening_hours.open_now
              ? <div className="search-results__badge">Open now!</div>
              : null
          }
        </div>
      </li>
    );
  });

  const hasResultsToShow = searchResultsJsx.length > 0;
  const isTermEmpty = term.trim() === ``;

  return (
    <div className="search-results">
      {
        hasResultsToShow
          ? <ul className="search-results__items">{searchResultsJsx}</ul>
          : isFetching || isTermEmpty || error
            ? null
            : <p>No places found.</p>
      }
      {
        error
          ? <p>Error: {errorMessage}</p>
          : null
      }
      {
        isFetching && !error
          ? <Spinner />
          : null
      }
      {
        isMoreResultsAvailable && hasResultsToShow && !isFetching
          ? (
            <button onClick={onLoadMore}>
              {error ? `Try again` : `Load more`}
            </button>
          )
          : null
      }
    </div>
  );
};

export default SearchResults;
