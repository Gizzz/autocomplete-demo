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
  completionIsHovered: boolean;
}

class SearchBar extends React.Component<ISearchBarProps, ISearchBarState> {
  state = {
    selectedCompletionIndex: null,
    completionIsHovered: false,
  };

  handleInputChange = (e) => {
    this.props.onTermChange(e.target.value);
  }

  handleInputKeydown = (e) => {
    switch (e.key) {
      case `Enter`:
        this.processInputEnter();
        break;
      case `ArrowUp`:
      case `ArrowDown`:
        this.processInputArrowUpOrDown(e);
        break;
      case `Escape`:
        this.clearCompletionSelection();
        this.props.onResetCompletionResults();
        break;
      default:
        break;
    }
  }

  handleInputBlur = () => {
    const selectedCompletionIndex = this.state.selectedCompletionIndex;
    const isCompletionClicked = this.state.selectedCompletionIndex !== null && this.state.completionIsHovered;

    if (isCompletionClicked) {
      const completionValue = this.props.completionResults[selectedCompletionIndex as any].description;
      this.processCompletionClick(completionValue);
    } else {
      this.clearCompletionSelection();
      this.props.onResetCompletionResults();
    }
  }

  handleCompletionMouseEnter = (selectedCompletionIndex) => {
    this.setState({
      selectedCompletionIndex,
      completionIsHovered: true,
    });
  }

  handleCompletionMouseLeave = () => {
    this.clearCompletionSelection();
  }

  handleSearchBtnClick = () => {
    this.performSearch();
  }

  processInputEnter() {
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
  }

  processInputArrowUpOrDown(e) {
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
      // else ArrorUp is pressed

      newSelectedCompletionIndex = this.state.selectedCompletionIndex === null
        ? null
        : this.state.selectedCompletionIndex === 0
          ? this.state.selectedCompletionIndex
          : (this.state.selectedCompletionIndex as any) - 1;
    }

    this.setState({ selectedCompletionIndex: newSelectedCompletionIndex });
  }

  processCompletionClick(completionValue) {
    this.props.onTermChange(completionValue);

    // to ensure that search is performed after term is changed
    setTimeout(() => {
      this.performSearch();
    }, 0);
  }

  performSearch() {
    this.clearCompletionSelection();
    this.props.onResetCompletionResults();
    this.props.onSearch();
  }

  clearCompletionSelection() {
    this.setState({
      selectedCompletionIndex: null,
      completionIsHovered: false,
    });
  }

  render() {
    const completionResultsJsx = this.props.completionResults.map((result, index) => {
      return (
        <li
          className={index === this.state.selectedCompletionIndex ? `active` : ``}
          key={result.description}
          // tslint:disable-next-line:jsx-no-lambda
          onMouseEnter={() => { this.handleCompletionMouseEnter(index); }}
          onMouseLeave={this.handleCompletionMouseLeave}
        >
          {result.description}
        </li>
      );
    });

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
