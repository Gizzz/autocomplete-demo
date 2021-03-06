import * as React from 'react';

import ResultEntry from './ResultEntry';
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
    return <ResultEntry entry={result} key={result.id} />;
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
