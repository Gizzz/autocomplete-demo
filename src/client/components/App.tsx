import * as React from 'react';

import SearchBarContainer from './components/SearchBarContainer';
import SearchResultsContainer from './components/SearchResultsContainer';

interface IAppContainerState {
  confirmedTerm: string;
}

class AppContainer extends React.Component<{}, IAppContainerState> {
  state = {
    confirmedTerm: '',
  };

  handleSearch = (confirmedTerm) => {
    this.setState({ confirmedTerm });
  }

  render() {
    return (
      <div className="app">
        <h1>Doodle 4 Places</h1>
        <div className="autocomplete">
          <SearchBarContainer onSearch={this.handleSearch} />
          <SearchResultsContainer term={this.state.confirmedTerm} />
        </div>
      </div>
    );
  }
}

export default AppContainer;
