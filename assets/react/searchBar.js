import React, { Component, PropTypes } from 'react';
import {Typeahead} from 'react-typeahead';

export default class SearchBar extends Component {
	render(){
		return (
			<div className={"typeahead-item" + (this.props.val ? " filled" : "")}>
				<div className="label">{this.props.title}</div>
				{this.props.names.length ? 
				<Typeahead
					className={"search-typeahead " + (this.props.className || "")}
					placeholder={this.props.placeholder}
					onKeyUp={this.props.onKeyUp}
					options={this.props.names}
					onOptionSelected={this.props.hadleSearchText}
					maxVisible={6}
					customClasses={{
						input: "topcoat-text-input",
						results: "topcoat-list-container",
						listItem: "topcoat-list-item",
						hover: "topcoat-active",
					}} /> : 
					<div className={"search-typeahead " + (this.props.className || "") + " dummy"}>
						<div className="topcoat-text-input">
							{this.props.placeholder}
						</div>
					</div>
				}
			</div>
		)
	}
}