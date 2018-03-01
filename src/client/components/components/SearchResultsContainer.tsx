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
  nextPageToken: string | null;
}

class SearchResultsContainer extends React.Component<ISearchResultsContainerProps, ISearchResultsContainerState> {
  state = this.getInitialState();

  componentDidMount() {
    this.processTermChange(this.props.term);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.term !== this.props.term) {
      this.processTermChange(nextProps.term);
    }
  }

  handleLoadMore = () => {
    this.setState({ isFetching: true, error: null });

    const nextPageUrl = `/proxy/maps/api/place/nearbysearch/json?pagetoken=${this.state.nextPageToken}`;
    this.fetchResultsToState(nextPageUrl);
  }

  processTermChange(newTerm: string) {
    this.setState({ ...this.getInitialState() });

    if (newTerm.trim() === ``) { return; }

    this.setState({ isFetching: true });
    // tslint:disable-next-line:max-line-length
    const firstPageUrl = `/proxy/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=50000&keyword=${newTerm}`;
    this.fetchResultsToState(firstPageUrl);
  }

  fetchResultsToState(url) {
    axios.get(url)
      .then((result) => {
        this.setState((prevState) => {
          return {
            searchResults: [ ...prevState.searchResults, ...result.data.results ],
            isFetching: false,
            nextPageToken: result.data.next_page_token ? result.data.next_page_token : null,
          };
        });
      })
      .catch((error) => {
        this.setState({ error, isFetching: false });
        console.log(error);
      });
  }

  getInitialState() {
    return {
      searchResults: [],
      isFetching: false,
      error: null,
      nextPageToken: null,
    };
  }

  render() {
    return (
      <SearchResults
        term={this.props.term}
        searchResults={this.state.searchResults}
        isFetching={this.state.isFetching}
        error={this.state.error}

        isMoreResultsAvailable={this.state.nextPageToken !== null}
        onLoadMore={this.handleLoadMore}
      />
    );
  }
}

export default SearchResultsContainer;
