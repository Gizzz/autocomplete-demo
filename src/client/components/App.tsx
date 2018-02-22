import * as React from 'react';

interface IAppProps {
  term: string;
  autocompleteResults: any[];
  onTermChange: (newTerm: string) => void;
  onSearch: () => void;
}

class App extends React.Component<IAppProps, {}> {
  handleInputChange = (e) => {
    this.props.onTermChange(e.target.value);
  }

  handleSearchBtnClick = () => {
    this.props.onSearch();
  }

  render() {
    let autocompleteResultsJsx: JSX.Element[] | null = null;

    if (this.props.autocompleteResults.length !== 0) {
      autocompleteResultsJsx = this.props.autocompleteResults.map((result: any): JSX.Element => {
        return (
          <li key={result.description}>{result.description}</li>
        );
      });
    }

    return (
      <div className="app">
        <h1>Autocomplete demo</h1>
        <input type="text" value={this.props.term} onChange={this.handleInputChange} />
        <button onClick={this.handleSearchBtnClick}>Search!</button>

        <h2>Autocomplete results:</h2>
        <ul>
          {autocompleteResultsJsx}
        </ul>
      </div>
    );
  }
}

export default App;
