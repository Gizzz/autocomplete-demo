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
      <>
        <h2>Search results:</h2>
        <p>Error: {message}</p>
      </>
    );
  }

  const searchResultsJsx: JSX.Element[] = searchResults.map((result: any): JSX.Element => {
    return (
      <li key={result.id}>{result.name}</li>
    );
  });

  const hasResultsToShow = searchResultsJsx.length > 0;
  const isTermEmpty = term.trim() === ``;

  return (
    <>
      <h2>Search results:</h2>
      {
        isFetching
          ? <p>Loading data...</p>
          : hasResultsToShow
            ? <ul>{searchResultsJsx}</ul>
            : isTermEmpty
              ? null
              : <p>No results.</p>
      }
    </>
  );
};

export default SearchResults;
