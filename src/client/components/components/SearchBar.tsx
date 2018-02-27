import * as React from 'react';

interface ISearchBarProps {
  term: string;
  autocompleteResults: any[];
  onTermChange: (newTerm: string) => void;
  onSearch: () => void;
}

class SearchBar extends React.Component<ISearchBarProps, {}> {
  handleInputChange = (e) => {
    this.props.onTermChange(e.target.value);
  }

  handleInputKeydown = (e) => {
    const isEnterPressed = e.nativeEvent.key.toLowerCase() === `enter`;
    if (isEnterPressed) { this.props.onSearch(); }
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
      <div className="autocomplete__search-bar">
        <input
          type="text"
          placeholder="Enter your query or place name"
          autoFocus={true}
          value={this.props.term}
          onChange={this.handleInputChange}
          onKeyDown={this.handleInputKeydown}
        />
        <button onClick={this.handleSearchBtnClick}>Go!</button>

        <h2>Autocomplete results:</h2>
        <ul>
          {autocompleteResultsJsx}
        </ul>
      </div>
    );
  }
}

export default SearchBar;
