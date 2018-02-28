import * as React from 'react';

interface ISearchResultsProps {
  term: string;
  searchResults: any[];
  isFetching: boolean;
  error: any;
}

const SearchResults = ({ term, searchResults, isFetching, error }: ISearchResultsProps) => {
  if (error) {
    const message = error.message ? error.message : `Something went wrong.`;

    return (
      <div className="search-results">
        <p>Error: {message}</p>
      </div>
    );
  }

  const searchResultsJsx: JSX.Element[] = searchResults.map((result: any): JSX.Element => {
    return (
      <li className="search-results__items__item" key={result.id}>
        <div className="search-results__items__item__image">
          <img src={result.icon} />
        </div>
        <div className="search-results__items__item__info">
          <h4>{result.name}</h4>
          <p>rating: {result.rating ? result.rating : `N/A`}</p>
        </div>
      </li>
    );
  });

  const hasResultsToShow = searchResultsJsx.length > 0;
  const isTermEmpty = term.trim() === ``;

  return (
    <div className="search-results">
      {
        isFetching
          ? <p>Loading data...</p>
          : hasResultsToShow
            ? <ul className="search-results__items">{searchResultsJsx}</ul>
            : isTermEmpty
              ? null
              : <p>No places found.</p>
      }
    </div>
  );
};

export default SearchResults;
