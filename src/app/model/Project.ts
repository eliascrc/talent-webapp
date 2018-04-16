export class Project {
	name : string;
	startDate : Date;
	endDate : Date;
	projectCapabilities : Array<ProjectCapability>;
	projectManagerHistory : Array<ProjectManagerPosition>;
	
	// ProjectState has not been added to the test data file 
	//state : ProjectState;
	
	constructor(project : any) {
		this.name = project.name;
		this.startDate = project.startDate;
		this.endDate = project.endDate;
		
		this.projectCapabilities = Object.assign([], project.projectCapabilities);
		this.projectManagerHistory = Object.assign([], project.projectManagerHistory);
	}
}