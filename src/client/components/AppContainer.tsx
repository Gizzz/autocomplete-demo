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
      <>
        <SearchBarContainer onSearch={this.handleSearch} />
        <SearchResultsContainer term={this.state.confirmedTerm} />
      </>
    );
  }
}

export default AppContainer;
