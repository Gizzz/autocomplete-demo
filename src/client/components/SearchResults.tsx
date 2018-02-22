import * as React from 'react';

const SearchResults = ({ searchResults }) => {
  let searchResultsJsx: JSX.Element[] | null = null;

  if (searchResults.length !== 0) {
    searchResultsJsx = searchResults.map((result: any): JSX.Element => {
      return (
        <li key={result.id}>{result.name}</li>
      );
    });
  }

  // const isTermEmpty = this.props.term.trim() === '';

  return (
    <>
      <h2>Search results:</h2>
      {/* {
        searchResultsJsx
          ? <ul>{searchResultsJsx}</ul>
          : isTermEmpty
            ? null
            : <p>No results.</p>
      } */}
      <ul>
        {searchResultsJsx}
      </ul>
    </>
  );
};

export default SearchResults;
