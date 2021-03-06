import * as React from 'react';

import Header from './components/Header';
import SearchBarContainer from './components/SearchBarContainer';
import SearchResultsContainer from './components/SearchResults/SearchResultsContainer';

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
        <Header />
        <SearchBarContainer onSearch={this.handleSearch} />
        <SearchResultsContainer term={this.state.confirmedTerm} />
      </div>
    );
  }
}

export default AppContainer;
