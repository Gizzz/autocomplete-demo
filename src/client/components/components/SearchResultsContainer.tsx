import * as React from 'react';
import axios from 'axios';

import SearchResults from './SearchResults';

interface ISearchResultsContainerProps {
  term: string;
}

interface ISearchResultsContainerState {
  searchResults: any[];
  isFetching: boolean;
  error: any;
}

class SearchResultsContainer extends React.Component<ISearchResultsContainerProps, ISearchResultsContainerState> {
  state = {
    searchResults: [],
    isFetching: false,
    error: null,
  };

  componentDidMount() {
    this.fetchResultsForTerm(this.props.term);
  }

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

    this.setState({ isFetching: true, error: null });

    axios.get(url)
      .then((result) => {
        this.setState({
          searchResults: result.data.results,
          isFetching: false,
        });
      })
      .catch((error) => {
        this.setState({ error, isFetching: false });
        console.log(error);
      });
  }

  render() {
    return (
      <SearchResults
        term={this.props.term}
        searchResults={this.state.searchResults}
        isFetching={this.state.isFetching}
        error={this.state.error}
      />
    );
  }
}

export default SearchResultsContainer;
