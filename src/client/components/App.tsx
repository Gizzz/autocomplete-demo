import * as React from 'react';
import axios from 'axios';
import throttle from 'lodash.throttle';
import { Cancelable } from 'lodash';


interface IAppState {
  term: string;
  autocompleteResults: any[];
  searchResults: any[];
}

class App extends React.Component<{}, IAppState> {
  state = {
    term: '',
    autocompleteResults: [],
    searchResults: [],
  };

  searchCompletions: () => void;
  searchCompletions_throttled: (() => void) & Cancelable;

  constructor(props) {
    super(props);

    this.searchCompletions = () => {
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
    };

    this.searchCompletions_throttled = throttle(this.searchCompletions, 500, { leading: false });
  }

  componentWillUnmount() {
    this.searchCompletions_throttled.cancel();
  }

  handleInputChange = (e) => {
    this.setState(
      { term: e.target.value },
      () => { this.searchCompletions_throttled(); },
    );
  }

  handleBtnClick = () => {
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

  render() {
    let autocompleteResultsJsx: JSX.Element[] | null = null;
    let searchResultsJsx: JSX.Element[] | null = null;

    if (this.state.autocompleteResults.length !== 0) {
      autocompleteResultsJsx = this.state.autocompleteResults.map((result: any): JSX.Element => {
        return (
          <li key={result.id}>{result.description}</li>
        );
      });
    }

    if (this.state.searchResults.length !== 0) {
      searchResultsJsx = this.state.searchResults.map((result: any): JSX.Element => {
        return (
          <li key={result.id}>{result.name}</li>
        );
      });
    }

    return (
      <div className="app">
        <h1>Autocomplete demo</h1>
        <input type="text" value={this.state.term} onChange={this.handleInputChange} />
        <button onClick={this.handleBtnClick}>Go!</button>

        <h2>Autocomplete results:</h2>
        <ul>
          {autocompleteResultsJsx}
        </ul>

        <h2>Search results:</h2>
        <ul>
          {searchResultsJsx}
        </ul>
      </div>
    );
  }
}

export default App;
