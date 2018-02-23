import * as React from 'react';
import axios from 'axios';

import debounce from 'lodash.debounce';
import { Cancelable } from 'lodash';

import SearchBar from './SearchBar';

interface ISearchBarContainerProps {
  onSearch: (confirmedTerm: string) => void;
}

interface ISearchBarContainerState {
  term: string;
  autocompleteResults: any[];
}

class SearchBarContainer extends React.Component<ISearchBarContainerProps, ISearchBarContainerState> {
  state = {
    term: ``,
    autocompleteResults: [],
  };

  searchCompletions_debounced: (() => void) & Cancelable;

  constructor(props) {
    super(props);

    const debounceTimeout = 500;
    this.searchCompletions_debounced = debounce(this.searchCompletions, debounceTimeout);
  }

  componentWillUnmount() {
    this.searchCompletions_debounced.cancel();
  }

  handleTermChange = (newTerm) => {
    this.setState(
      { term: newTerm },
      () => { this.searchCompletions_debounced(); },
    );
  }

  handleSearch = () => {
    this.props.onSearch(this.state.term);
  }

  searchCompletions = () => {
    const term = this.state.term;
    // tslint:disable-next-line:max-line-length
    const url = `/proxy/maps/api/place/queryautocomplete/json?location=-33.8670522,151.1957362&radius=50000&input=${term}`;

    if (term.trim() === ``) {
      this.setState({ autocompleteResults: [] });
      return;
    }

    axios.get(url)
      .then((result) => {
        this.setState({ autocompleteResults: result.data.predictions });
      })
      .catch(console.log);
  }

  render() {
    return (
      <SearchBar
        term={this.state.term}
        autocompleteResults={this.state.autocompleteResults}
        onTermChange={this.handleTermChange}
        onSearch={this.handleSearch}
      />
    );
  }
}

export default SearchBarContainer;
