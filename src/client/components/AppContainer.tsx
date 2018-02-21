import * as React from 'react';
import axios from 'axios';

import debounce from 'lodash.debounce';
import { Cancelable } from 'lodash';

import App from './App';

interface IAppContainerState {
  term: string;
  autocompleteResults: any[];
  searchResults: any[];
}

class AppContainer extends React.Component<{}, IAppContainerState> {
  state = {
    term: '',
    autocompleteResults: [],
    searchResults: [],
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
    const term = this.state.term;
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
      <App
        term={this.state.term}
        autocompleteResults={this.state.autocompleteResults}
        searchResults={this.state.searchResults}
        onTermChange={this.handleTermChange}
        onSearch={this.handleSearch}
      />
    );
  }
}

export default AppContainer;
