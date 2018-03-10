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
  completionResults: any[];
  lastRequestTimestamp: number;
}

class SearchBarContainer extends React.Component<ISearchBarContainerProps, ISearchBarContainerState> {
  state = {
    term: ``,
    completionResults: [],
    lastRequestTimestamp: 0,
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
    this.searchCompletions_debounced.cancel();
    this.resetCompletionResults();

    this.props.onSearch(this.state.term);
  }

  resetCompletionResults = () => {
    this.setState({
      completionResults: [],
      lastRequestTimestamp: Date.now(),
    });
  }

  searchCompletions = () => {
    const term = this.state.term;
    // tslint:disable-next-line:max-line-length
    const url = `/proxy/maps/api/place/queryautocomplete/json?location=-33.8670522,151.1957362&radius=10000&input=${term}`;

    const currentRequestTimestamp = Date.now();
    this.setState({ lastRequestTimestamp: currentRequestTimestamp });

    // empty check is placed after the timestapm to prevent pending request to overwrite its result
    if (term.trim() === ``) {
      this.setState({ completionResults: [] });
      return;
    }

    axios.get(url)
      .then((result) => {
        if (this.state.lastRequestTimestamp !== currentRequestTimestamp) { return; }

        this.setState({ completionResults: result.data.predictions });
      })
      .catch(console.log);
  }

  render() {
    return (
      <SearchBar
        term={this.state.term}
        completionResults={this.state.completionResults}
        onTermChange={this.handleTermChange}
        onSearch={this.handleSearch}
        onResetCompletionResults={this.resetCompletionResults}
      />
    );
  }
}

export default SearchBarContainer;
