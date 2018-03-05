import * as React from 'react';

interface ISearchBarProps {
  term: string;
  completionResults: any[];
  onTermChange: (newTerm: string) => void;
  onSearch: () => void;
  onResetCompletionResults: () => void;
}

interface ISearchBarState {
  selectedCompletionIndex: number | null;
}

class SearchBar extends React.Component<ISearchBarProps, ISearchBarState> {
  state = { selectedCompletionIndex: null };

  handleInputChange = (e) => {
    this.props.onTermChange(e.target.value);
  }

  handleInputKeydown = (e) => {
    const isEnterPressed = e.key === `Enter`;
    const isEscapePressed = e.key === `Escape`;
    const isArrowUpPressed = e.key === `ArrowUp`;
    const isArrowDownPressed = e.key === `ArrowDown`;

    if (isEnterPressed) {
      const selectedCompletionIndex = this.state.selectedCompletionIndex;

      if (selectedCompletionIndex === null) {
        this.performSearch();
        return;
      }

      const completionValue = this.props.completionResults[selectedCompletionIndex as any].description;
      this.props.onTermChange(completionValue);

      // to ensure that search is performed after term is changed
      setTimeout(() => {
        this.performSearch();
      }, 0);
    } else if (isEscapePressed) {
      this.setState({ selectedCompletionIndex: null });
      this.props.onResetCompletionResults();
    } else if (isArrowUpPressed || isArrowDownPressed) {
      this.processArrowUpOrDown(e);
    }
  }

  handleInputBlur = () => {
    this.setState({ selectedCompletionIndex: null });

    // to prevent result loss in case when completion is clicked (input blur triggers before completion click)
    // delay is pretty big, lower delays not seem to be stable
    setTimeout(() => {
      this.props.onResetCompletionResults();
    }, 150);
  }

  handleCompletionClick = (completionValue) => {
    this.props.onTermChange(completionValue);

    // to ensure that search is performed after term is changed
    setTimeout(() => {
      this.performSearch();
    }, 0);
  }

  handleCompletionMouseEnter = (selectedCompletionIndex) => {
    this.setState({ selectedCompletionIndex });
  }

  handleCompletionMouseLeave = () => {
    this.setState({ selectedCompletionIndex: null });
  }

  handleSearchBtnClick = () => {
    this.performSearch();
  }

  processArrowUpOrDown = (e) => {
    e.preventDefault();

    const isCompletionResultsEmpty = this.props.completionResults.length === 0;
    if (isCompletionResultsEmpty) { return; }

    let newSelectedCompletionIndex;
    const isArrowDownPressed = e.key === `ArrowDown`;

    if (isArrowDownPressed) {
      const isLastCompletionIndex = this.state.selectedCompletionIndex === this.props.completionResults.length - 1;

      newSelectedCompletionIndex = this.state.selectedCompletionIndex === null
        ? 0
        : isLastCompletionIndex
          ? this.state.selectedCompletionIndex
          : (this.state.selectedCompletionIndex as any) + 1;
    } else {
      newSelectedCompletionIndex = this.state.selectedCompletionIndex === null
        ? null
        : this.state.selectedCompletionIndex === 0
          ? this.state.selectedCompletionIndex
          : (this.state.selectedCompletionIndex as any) - 1;
    }

    this.setState({ selectedCompletionIndex: newSelectedCompletionIndex });
  }

  performSearch = () => {
    this.setState({ selectedCompletionIndex: null });

    this.props.onResetCompletionResults();
    this.props.onSearch();
  }

  render() {
    let completionResultsJsx: JSX.Element[] | null = null;

    if (this.props.completionResults.length !== 0) {
      completionResultsJsx = this.props.completionResults.map((result: any, index): JSX.Element => {
        return (
          <li
            className={index === this.state.selectedCompletionIndex ? `active` : ``}
            key={result.description}
            // tslint:disable-next-line:jsx-no-lambda
            onClick={() => { this.handleCompletionClick(result.description); }}
            // tslint:disable-next-line:jsx-no-lambda
            onMouseEnter={() => { this.handleCompletionMouseEnter(index); }}
            onMouseLeave={this.handleCompletionMouseLeave}
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
          {completionResultsJsx}
        </ul>
      </div>
    );
  }
}

export default SearchBar;
