import * as React from 'react';

interface IAppState {
  term: string;
}

class App extends React.Component<{}, IAppState> {
  state = {
    term: '',
  };

  handleInputChange = (e) => {
    this.setState({ term: e.target.value });
  }

  handleBtnClick = () => {
    console.log(`term is ${this.state.term}`);
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
