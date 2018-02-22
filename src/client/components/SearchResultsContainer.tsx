import * as React from 'react';
import axios from 'axios';

import SearchResults from './SearchResults';

interface ISearchResultsContainerProps {
  term: string;
}

interface ISearchResultsContainerState {
  searchResults: any[];
}

class SearchResultsContainer extends React.Component<ISearchResultsContainerProps, ISearchResultsContainerState> {
  state = {
    searchResults: [],
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.term !== this.props.term) {
      this.fetchResultsForTerm(nextProps.term);
    }
  }

  fetchResultsForTerm(term: string) {
    const url = `/proxy/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=50000&keyword=${term}`;

    if (term.trim() === ``) {
      this.setState({ searchResults: [] });
      return;
    }

    axios.get(url)
      .then((result) => {
        this.setState({ searchResults: result.data.results });
      })
      .catch(console.log);
  }

  render() {
    return (
      <SearchResults searchResults={this.state.searchResults} />
    );
  }
}

export default SearchResultsContainer;
