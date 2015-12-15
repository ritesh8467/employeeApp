import React, { Component, PropTypes } from 'react';
import SearchBar from './searchBar';

export default class Main extends Component {
	constructor(props) {
		super(props);
		var employees = this.props.data.reduce( (prev, next) =>{
			prev[next.team] = next.employees
			return prev;
		}, {})
		this.state = {
			employees,
			selectedTeam: null,
			selectedEmployee: null,
			teams: Object.keys(employees),
			success: false,
			showForm: false,
			errorTeam: false,
			errorEmployee: false
		}
	}
	handleTeamSelection(val){
		this.setState({selectedTeam: val});
	}
	watchTeam(event){
		this.setState({selectedTeam: event.target.value});
	}
	watchEmployee(event){
		this.setState({selectedEmployee: event.target.value});
	}
	cancelForm(){
		this.setState({success : false, showForm : false});
	}
	submitForm(event){
		if(this.state.selectedEmployee && this.state.selectedTeam){
			this.setState({success : true, errorEmployee: false, errorTeam: false});
		}
		else{
			var obj = {}
			obj["errorEmployee"] = !this.state.selectedEmployee
			obj["errorTeam"] = !this.state.selectedTeam
			this.setState(obj);
		}
	}
	retryForm(){
		this.setState({success : false});
	}
	fillForm(){
		this.setState({showForm : true});
	}
	render(){
		var employees = (this.state.selectedTeam && !this.state.success) ? this.state.employees[this.state.selectedTeam] : []
		var teams = this.state.success ? [] : this.state.teams
		var className = "main-elem"
		if(this.state.success){
			className += " success";
		}else if(this.state.showForm){
			className += " show-form";
		}
		return (
			<div className={className}>
				<div className="close" onClick={this.cancelForm.bind(this)}>x</div>
				<div className="pre-elem">
					<div className="message">
						Employee Form
					</div>
					<div className="form-button start" onClick={this.fillForm.bind(this)}> Start </div>
				</div>
				<div className="form-elem">
					<h1 className="header">Select an Employee </h1>
					<div className="email-alert">
						<input className="email-check" type="checkbox" />
						<span>Send welcome email to employee</span>
					</div>
					<SearchBar val={this.state.selectedTeam} placeholder="Select Team..." title="Select a Team in the Organization" className={"layer-1" + (this.state.errorTeam ? " error" : "")} names={teams} onKeyUp={this.watchTeam.bind(this)} hadleSearchText={this.handleTeamSelection.bind(this)} />
					<SearchBar val={this.state.selectedEmployee} placeholder="Select Employee..." title="Select an Employee" names={employees} onKeyUp={this.watchEmployee.bind(this)} className={(this.state.errorEmployee ? " error" : "")}/>
					<div className="form-button ok" onClick={this.submitForm.bind(this)}>OK</div>
					<div className="form-button cancel" onClick={this.cancelForm.bind(this)}>Cancel</div>
				</div>
				<div className="success-elem">
					<div className="message">
						Thanks for submitting form
					</div>
					<div className="form-button retry" onClick={this.retryForm.bind(this)}> Reset </div>
				</div>
			</div>
		)
	}
}