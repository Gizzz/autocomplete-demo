import * as React from 'react';
import axios from 'axios';
import throttle from 'lodash.throttle';
import { Cancelable } from 'lodash';


interface IAppState {
  term: string;
}

class App extends React.Component<{}, IAppState> {
  logTerm: () => void;
  logTerm_throttled: (() => void) & Cancelable;

  state = {
    term: '',
  };

  constructor(props) {
    super(props);
    this.logTerm = (() => { console.log(this.state.term); });
    this.logTerm_throttled = throttle(this.logTerm, 500);
  }

  componentWillUnmount() {
    this.logTerm_throttled.cancel();
  }

  handleInputChange = (e) => {
    this.setState(
      { term: e.target.value },
      () => { this.logTerm_throttled(); },
    );
  }

  handleBtnClick = () => {
    const term = this.state.term;
    const url = `/proxy/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=50000&keyword=${term}`;

    axios.get(url)
      .then((result) => {
        console.log('results', result.data.results);
        console.log('status', result.data.status);
      })
      .catch(console.log);
  }

  render() {
    return (
      <div className="app">
        <h1>Autocomplete demo</h1>
        <input type="text" value={this.state.term} onChange={this.handleInputChange} />
        <button onClick={this.handleBtnClick}>Go!</button>
      </div>
    );
  }
}

export default App;
