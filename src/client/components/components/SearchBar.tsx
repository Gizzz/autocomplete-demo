import * as React from 'react';

interface ISearchBarProps {
  term: string;
  autocompleteResults: any[];
  onTermChange: (newTerm: string) => void;
  onSearch: () => void;
  onResetResults: () => void;
}

interface ISearchBarState {
  showCompletions: boolean;
}

class SearchBar extends React.Component<ISearchBarProps, ISearchBarState> {
  state = { showCompletions: true };

  handleInputChange = (e) => {
    this.props.onTermChange(e.target.value);
  }

  handleInputKeydown = (e) => {
    const isEnterPressed = e.nativeEvent.key.toLowerCase() === `enter`;
    const isEscapePressed = e.nativeEvent.key.toLowerCase() === `escape`;

    if (isEnterPressed) {
      this.performSearch();
    } else if (isEscapePressed) {
      this.props.onResetResults();
    } else {
      this.setState({ showCompletions: true });
    }
  }

  handleInputBlur = () => {
    // to prevent result loss in case when completion is clicked (input blur triggers before completion click)
    // delay is pretty big, lower delays not seem to be stable
    setTimeout(() => {
      this.props.onResetResults();
    }, 150);
  }

  handleCompletionClick = (completionValue) => {
    this.props.onTermChange(completionValue);

    // to ensure that search performed after term is changed
    setTimeout(() => {
      this.performSearch();
    }, 0);
  }

  handleSearchBtnClick = () => {
    this.performSearch();
  }

  performSearch = () => {
    this.setState({ showCompletions: false });
    this.props.onSearch();
  }

  render() {
    let autocompleteResultsJsx: JSX.Element[] | null = null;

    if (this.props.autocompleteResults.length !== 0) {
      autocompleteResultsJsx = this.props.autocompleteResults.map((result: any): JSX.Element => {
        return (
          <li
            key={result.description}
            // tslint:disable-next-line:jsx-no-lambda
            onClick={() => { this.handleCompletionClick(result.description); }}
          >
            {result.description}
          </li>
        );
      });
    }

    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter your query or place name"
          autoFocus={true}
          value={this.props.term}
          onChange={this.handleInputChange}
          onKeyDown={this.handleInputKeydown}
          onBlur={this.handleInputBlur}
        />
        <button onClick={this.handleSearchBtnClick}>Go!</button>
        <ul className="search-bar__completions">
          {this.state.showCompletions && autocompleteResultsJsx}
        </ul>
      </div>
    );
  }
}

export default SearchBar;
